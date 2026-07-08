import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, CheckCircle, XCircle, Clock, FileText, Check, X } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Inscription {
  ref: string; etudiant: string; matricule: string;
  filiere: string; classe: string; date_depot: string;
  documents: boolean; statut: string; agent: string;
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    Validé:       "bg-emerald-100 text-emerald-700 border-emerald-200",
    "En attente": "bg-amber-100 text-amber-700 border-amber-200",
    Rejeté:       "bg-red-100 text-red-700 border-red-200",
  };
  return <Badge className={`font-medium text-xs ${map[s] ?? ""}`}>{s}</Badge>;
}

export default function InscriptionsPage() {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("all");
  const [filterFiliere, setFilterFiliere] = useState("all");
  const [localStatuts, setLocalStatuts] = useState<Record<string, string>>({});

  const { data: inscriptions = [], isLoading } = useQuery<Inscription[]>({
    queryKey: ["inscriptions"],
    queryFn: () => fetchApi<Inscription[]>("/modules/inscriptions"),
  });

  const filieres = useMemo(() => [...new Set(inscriptions.map(i => i.filiere))], [inscriptions]);

  const data = useMemo(() =>
    inscriptions.map(i => ({ ...i, statut: localStatuts[i.ref] ?? i.statut })),
    [inscriptions, localStatuts]
  );

  const filtered = useMemo(() => data.filter(i => {
    const q = search.toLowerCase();
    const matchSearch  = !q || `${i.etudiant} ${i.ref} ${i.matricule}`.toLowerCase().includes(q);
    const matchStatut  = filterStatut === "all"  || i.statut === filterStatut;
    const matchFiliere = filterFiliere === "all" || i.filiere === filterFiliere;
    return matchSearch && matchStatut && matchFiliere;
  }), [data, search, filterStatut, filterFiliere]);

  const stats = useMemo(() => ({
    total:    data.length,
    attente:  data.filter(i => i.statut === "En attente").length,
    valide:   data.filter(i => i.statut === "Validé").length,
    rejete:   data.filter(i => i.statut === "Rejeté").length,
  }), [data]);

  const valider = (ref: string) => setLocalStatuts(p => ({ ...p, [ref]: "Validé" }));
  const rejeter = (ref: string) => setLocalStatuts(p => ({ ...p, [ref]: "Rejeté" }));

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Inscriptions administratives</h1>
          <p className="text-sm text-muted-foreground">{isLoading ? "Chargement…" : `${stats.total} dossiers · ${stats.attente} en attente`}</p>
        </div>
        <Button className="gap-2 h-9"><Plus size={15} aria-hidden="true" />Nouvelle inscription</Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Total dossiers",   value: stats.total,   icon: FileText,      color:"text-blue-700",    bg:"bg-blue-500" },
            { label:"En attente",       value: stats.attente, icon: Clock,         color:"text-amber-700",   bg:"bg-amber-500" },
            { label:"Validés",          value: stats.valide,  icon: CheckCircle,   color:"text-emerald-700", bg:"bg-emerald-500" },
            { label:"Rejetés",          value: stats.rejete,  icon: XCircle,       color:"text-red-700",     bg:"bg-red-500" },
          ].map(s => (
            <Card key={s.label} className="border border-card-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon size={18} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <div className={`text-2xl font-bold leading-tight mt-0.5 ${s.color}`}>{isLoading ? <Skeleton className="h-7 w-10" /> : s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input placeholder="Rechercher…" className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} aria-label="Rechercher une inscription" />
          </div>
          <Select value={filterStatut} onValueChange={setFilterStatut}>
            <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filtrer par statut"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Validé">Validé</SelectItem>
              <SelectItem value="Rejeté">Rejeté</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterFiliere} onValueChange={setFilterFiliere}>
            <SelectTrigger className="h-9 w-44 text-sm" aria-label="Filtrer par filière"><SelectValue placeholder="Filière" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les filières</SelectItem>
              {filieres.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
          {(search || filterStatut !== "all" || filterFiliere !== "all") && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={() => { setSearch(""); setFilterStatut("all"); setFilterFiliere("all"); }}>
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Table */}
        <Card className="border border-card-border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Réf.</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Étudiant</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Filière / Classe</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Dépôt</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden lg:table-cell text-center">Documents</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Statut</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>{Array.from({ length: 7 }).map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}</TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Aucun dossier trouvé.</TableCell></TableRow>
              ) : (
                filtered.map(i => (
                  <TableRow key={i.ref} className="hover:bg-muted/30">
                    <TableCell><span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{i.ref}</span></TableCell>
                    <TableCell>
                      <p className="text-sm font-semibold">{i.etudiant}</p>
                      <p className="text-xs text-muted-foreground">{i.matricule}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm font-medium">{i.filiere}</p>
                      <p className="text-xs text-muted-foreground">{i.classe}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{i.date_depot}</TableCell>
                    <TableCell className="hidden lg:table-cell text-center">
                      {i.documents
                        ? <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Complet</Badge>
                        : <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Incomplet</Badge>
                      }
                    </TableCell>
                    <TableCell><StatusBadge s={i.statut} /></TableCell>
                    <TableCell>
                      {i.statut === "En attente" ? (
                        <div className="flex gap-1.5">
                          <Button size="sm" className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => valider(i.ref)} aria-label={`Valider l'inscription ${i.ref}`}>
                            <Check size={11} aria-hidden="true" />Valider
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={() => rejeter(i.ref)} aria-label={`Rejeter l'inscription ${i.ref}`}>
                            <X size={11} aria-hidden="true" />Rejeter
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-7 text-xs" aria-label={`Voir le dossier ${i.ref}`}>Dossier</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && (
            <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground flex justify-between">
              <span>{filtered.length} dossier{filtered.length !== 1 ? "s" : ""}</span>
              <span>{inscriptions.length} au total</span>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
