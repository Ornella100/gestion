import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Users, ChevronDown } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface Classe {
  code: string; intitule: string; filiere: string; filiereCode: string;
  niveau: string; effectif: number; capacite: number;
  enseignant_principal: string; salle: string; horaire: string;
}

function NiveauBadge({ n }: { n: string }) {
  const map: Record<string, string> = { L1:"bg-sky-100 text-sky-700", L2:"bg-blue-100 text-blue-700", L3:"bg-violet-100 text-violet-700", M1:"bg-amber-100 text-amber-700", M2:"bg-orange-100 text-orange-700" };
  return <Badge className={`text-xs font-semibold border-0 ${map[n] ?? "bg-gray-100 text-gray-600"}`}>{n}</Badge>;
}

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("all");
  const [filterNiveau, setFilterNiveau] = useState("all");

  const { data: classes = [], isLoading } = useQuery<Classe[]>({
    queryKey: ["classes"],
    queryFn: () => fetchApi<Classe[]>("/modules/classes"),
  });

  const filieres = useMemo(() => [...new Set(classes.map(c => c.filiereCode))], [classes]);

  const filtered = useMemo(() => classes.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${c.code} ${c.intitule} ${c.filiere} ${c.enseignant_principal}`.toLowerCase().includes(q);
    const matchFiliere = filterFiliere === "all" || c.filiereCode === filterFiliere;
    const matchNiveau  = filterNiveau === "all"  || c.niveau === filterNiveau;
    return matchSearch && matchFiliere && matchNiveau;
  }), [classes, search, filterFiliere, filterNiveau]);

  const totalEffectif = useMemo(() => classes.reduce((s, c) => s + c.effectif, 0), [classes]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Classes & groupes</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Chargement…" : `${classes.length} classes · ${totalEffectif.toLocaleString("fr-FR")} étudiants`}
          </p>
        </div>
        <Button className="gap-2 h-9"><Plus size={15} aria-hidden="true" />Nouvelle classe</Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input placeholder="Rechercher une classe…" className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} aria-label="Rechercher une classe" />
          </div>
          <Select value={filterFiliere} onValueChange={setFilterFiliere}>
            <SelectTrigger className="h-9 w-40 text-sm" aria-label="Filtrer par filière"><SelectValue placeholder="Filière" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {filieres.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterNiveau} onValueChange={setFilterNiveau}>
            <SelectTrigger className="h-9 w-32 text-sm" aria-label="Filtrer par niveau"><SelectValue placeholder="Niveau" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {["L1","L2","L3","M1","M2"].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          {(search || filterFiliere !== "all" || filterNiveau !== "all") && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={() => { setSearch(""); setFilterFiliere("all"); setFilterNiveau("all"); }}>
              Réinitialiser
            </Button>
          )}
        </div>

        <Card className="border border-card-border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Code</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Intitulé</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Filière</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Niveau</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Effectif / Capacité</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Enseignant principal</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden xl:table-cell">Salle</TableHead>
                <TableHead className="sr-only">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>{Array.from({ length: 8 }).map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}</TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Aucune classe trouvée.</TableCell></TableRow>
              ) : (
                filtered.map(c => {
                  const pct = Math.round((c.effectif / c.capacite) * 100);
                  const isPlein = pct >= 100;
                  return (
                    <TableRow key={c.code} className="hover:bg-muted/30">
                      <TableCell><span className="text-sm font-bold font-mono">{c.code}</span></TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{c.intitule}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">{c.filiereCode}</Badge>
                      </TableCell>
                      <TableCell><NiveauBadge n={c.niveau} /></TableCell>
                      <TableCell className="hidden md:table-cell min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <Users size={13} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className={`font-semibold ${isPlein ? "text-red-600" : ""}`}>{c.effectif}</span>
                              <span className="text-muted-foreground">/{c.capacite}</span>
                            </div>
                            <Progress value={pct} className={`h-1.5 ${isPlein ? "[&>div]:bg-red-500" : ""}`} aria-label={`${pct}% rempli`} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{c.enseignant_principal}</TableCell>
                      <TableCell className="hidden xl:table-cell text-sm">{c.salle}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" aria-label={`Actions pour ${c.code}`}>
                          Actions <ChevronDown size={12} className="ml-1" aria-hidden="true" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
          {!isLoading && (
            <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground flex justify-between">
              <span>{filtered.length} classe{filtered.length !== 1 ? "s" : ""} affichée{filtered.length !== 1 ? "s" : ""}</span>
              <span>{classes.length} au total</span>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
