import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, GraduationCap, Users, Clock, Ban, ChevronDown } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Etudiant {
  matricule: string; nom: string; prenom: string; email: string;
  telephone: string; genre: string; filiere: string; filiereCode: string;
  classe: string; niveau: string; annee_entree: number;
  statut: string; date_inscription: string;
}

const avatarColors = ["bg-blue-500","bg-violet-500","bg-rose-500","bg-amber-500","bg-teal-500","bg-sky-500","bg-emerald-500","bg-pink-500","bg-indigo-500","bg-orange-500"];

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    Actif:       "bg-emerald-100 text-emerald-700 border-emerald-200",
    "En attente":"bg-amber-100 text-amber-700 border-amber-200",
    Suspendu:    "bg-red-100 text-red-700 border-red-200",
    Inactif:     "bg-gray-100 text-gray-600 border-gray-200",
  };
  return <Badge className={`font-medium text-xs ${map[s] ?? ""}`}>{s}</Badge>;
}

export default function EtudiantsPage() {
  const [search, setSearch] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [filterNiveau, setFilterNiveau] = useState("all");

  const { data: etudiants = [], isLoading } = useQuery<Etudiant[]>({
    queryKey: ["etudiants"],
    queryFn: () => fetchApi<Etudiant[]>("/modules/etudiants"),
  });

  const filtered = useMemo(() => {
    return etudiants.filter((e) => {
      const q = search.toLowerCase();
      const matchSearch = !q || `${e.nom} ${e.prenom} ${e.matricule} ${e.email}`.toLowerCase().includes(q);
      const matchFiliere = filterFiliere === "all" || e.filiereCode === filterFiliere;
      const matchStatut  = filterStatut === "all"  || e.statut === filterStatut;
      const matchNiveau  = filterNiveau === "all"  || e.niveau === filterNiveau;
      return matchSearch && matchFiliere && matchStatut && matchNiveau;
    });
  }, [etudiants, search, filterFiliere, filterStatut, filterNiveau]);

  const stats = useMemo(() => ({
    total:      etudiants.length,
    actifs:     etudiants.filter(e => e.statut === "Actif").length,
    attente:    etudiants.filter(e => e.statut === "En attente").length,
    inactifs:   etudiants.filter(e => e.statut === "Inactif" || e.statut === "Suspendu").length,
  }), [etudiants]);

  const filieres = useMemo(() => [...new Set(etudiants.map(e => e.filiereCode))], [etudiants]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Gestion des étudiants</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Chargement…" : `${stats.total} étudiants enregistrés`}
          </p>
        </div>
        <Button className="gap-2 h-9">
          <Plus size={15} aria-hidden="true" />
          Nouvel étudiant
        </Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Total étudiants", value: stats.total, icon: Users, color:"text-blue-700", bg:"bg-blue-500" },
            { label:"Actifs", value: stats.actifs, icon: GraduationCap, color:"text-emerald-700", bg:"bg-emerald-500" },
            { label:"En attente", value: stats.attente, icon: Clock, color:"text-amber-700", bg:"bg-amber-500" },
            { label:"Inactifs / Suspendu", value: stats.inactifs, icon: Ban, color:"text-red-700", bg:"bg-red-500" },
          ].map(s => (
            <Card key={s.label} className="border border-card-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon size={18} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <div className={`text-2xl font-bold leading-tight mt-0.5 ${s.color}`}>
                    {isLoading ? <Skeleton className="h-7 w-12" /> : s.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input placeholder="Rechercher un étudiant…" className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} aria-label="Rechercher un étudiant" />
          </div>
          <Select value={filterFiliere} onValueChange={setFilterFiliere}>
            <SelectTrigger className="h-9 w-40 text-sm" aria-label="Filtrer par filière"><SelectValue placeholder="Filière" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les filières</SelectItem>
              {filieres.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterNiveau} onValueChange={setFilterNiveau}>
            <SelectTrigger className="h-9 w-32 text-sm" aria-label="Filtrer par niveau"><SelectValue placeholder="Niveau" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tout niveau</SelectItem>
              {["L1","L2","L3","M1","M2"].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatut} onValueChange={setFilterStatut}>
            <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filtrer par statut"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {["Actif","En attente","Suspendu","Inactif"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {(search || filterFiliere !== "all" || filterStatut !== "all" || filterNiveau !== "all") && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={() => { setSearch(""); setFilterFiliere("all"); setFilterStatut("all"); setFilterNiveau("all"); }}>
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Table */}
        <Card className="border border-card-border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Étudiant</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Matricule</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Filière / Classe</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden xl:table-cell">Contact</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Niveau</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Statut</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Inscription</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide sr-only">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    Aucun étudiant ne correspond aux critères sélectionnés.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((e, i) => (
                  <TableRow key={e.matricule} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className={`text-white text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                            {e.prenom[0]}{e.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{e.prenom} {e.nom}</p>
                          <p className="text-xs text-muted-foreground">{e.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell"><span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{e.matricule}</span></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm font-medium">{e.filiere}</p>
                      <p className="text-xs text-muted-foreground">{e.classe}</p>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <p className="text-xs">{e.telephone}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs font-semibold">{e.niveau}</Badge>
                    </TableCell>
                    <TableCell><StatusBadge s={e.statut} /></TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{e.date_inscription}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-xs" aria-label={`Actions pour ${e.prenom} ${e.nom}`}>
                        Actions <ChevronDown size={12} className="ml-1" aria-hidden="true" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && (
            <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
              <span>{filtered.length} résultat{filtered.length !== 1 ? "s" : ""} affiché{filtered.length !== 1 ? "s" : ""}</span>
              <span>{etudiants.length} au total</span>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
