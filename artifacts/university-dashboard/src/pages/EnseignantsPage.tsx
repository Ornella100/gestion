import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Users, BookOpen, Award, ChevronDown } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Enseignant {
  matricule: string; nom: string; prenom: string; email: string;
  telephone: string; specialite: string; grade: string;
  statut: string; nb_ue: number; nb_heures: number; filieres: string[];
}

const avatarColors = ["bg-blue-500","bg-violet-500","bg-rose-500","bg-amber-500","bg-teal-500","bg-sky-500","bg-emerald-500","bg-pink-500"];

function GradeBadge({ g }: { g: string }) {
  const map: Record<string, string> = {
    "Professeur":        "bg-purple-100 text-purple-700 border-purple-200",
    "Maître-assistant":  "bg-blue-100 text-blue-700 border-blue-200",
    "Assistant":         "bg-sky-100 text-sky-700 border-sky-200",
  };
  return <Badge className={`text-xs font-medium ${map[g] ?? ""}`}>{g}</Badge>;
}

function StatutBadge({ s }: { s: string }) {
  return s === "Permanent"
    ? <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs font-medium">{s}</Badge>
    : <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs font-medium">{s}</Badge>;
}

export default function EnseignantsPage() {
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");

  const { data: enseignants = [], isLoading } = useQuery<Enseignant[]>({
    queryKey: ["enseignants"],
    queryFn: () => fetchApi<Enseignant[]>("/modules/enseignants"),
  });

  const filtered = useMemo(() => enseignants.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${e.nom} ${e.prenom} ${e.matricule} ${e.specialite}`.toLowerCase().includes(q);
    const matchGrade  = filterGrade === "all"  || e.grade === filterGrade;
    const matchStatut = filterStatut === "all" || e.statut === filterStatut;
    return matchSearch && matchGrade && matchStatut;
  }), [enseignants, search, filterGrade, filterStatut]);

  const stats = useMemo(() => ({
    total:      enseignants.length,
    permanents: enseignants.filter(e => e.statut === "Permanent").length,
    vacataires: enseignants.filter(e => e.statut === "Vacataire").length,
    heures:     enseignants.reduce((s, e) => s + e.nb_heures, 0),
  }), [enseignants]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Gestion des enseignants</h1>
          <p className="text-sm text-muted-foreground">{isLoading ? "Chargement…" : `${stats.total} enseignants enregistrés`}</p>
        </div>
        <Button className="gap-2 h-9"><Plus size={15} aria-hidden="true" />Nouvel enseignant</Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Total", value: stats.total, icon: Users, color:"text-blue-700", bg:"bg-blue-500" },
            { label:"Permanents", value: stats.permanents, icon: Award, color:"text-emerald-700", bg:"bg-emerald-500" },
            { label:"Vacataires", value: stats.vacataires, icon: Users, color:"text-orange-700", bg:"bg-orange-500" },
            { label:"Heures dispensées", value: stats.heures.toLocaleString("fr-FR"), icon: BookOpen, color:"text-violet-700", bg:"bg-violet-500" },
          ].map(s => (
            <Card key={s.label} className="border border-card-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon size={18} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <div className={`text-2xl font-bold leading-tight mt-0.5 ${s.color}`}>{isLoading ? <Skeleton className="h-7 w-12" /> : s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input placeholder="Rechercher un enseignant…" className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} aria-label="Rechercher un enseignant" />
          </div>
          <Select value={filterGrade} onValueChange={setFilterGrade}>
            <SelectTrigger className="h-9 w-44 text-sm" aria-label="Filtrer par grade"><SelectValue placeholder="Grade" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les grades</SelectItem>
              {["Assistant","Maître-assistant","Professeur"].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatut} onValueChange={setFilterStatut}>
            <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filtrer par statut"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="Permanent">Permanent</SelectItem>
              <SelectItem value="Vacataire">Vacataire</SelectItem>
            </SelectContent>
          </Select>
          {(search || filterGrade !== "all" || filterStatut !== "all") && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={() => { setSearch(""); setFilterGrade("all"); setFilterStatut("all"); }}>
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Table */}
        <Card className="border border-card-border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Enseignant</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Matricule</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Spécialité</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Grade</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Statut</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell text-right">UE / Heures</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden xl:table-cell">Filières</TableHead>
                <TableHead className="sr-only">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>{Array.from({ length: 8 }).map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}</TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Aucun enseignant trouvé.</TableCell></TableRow>
              ) : (
                filtered.map((e, i) => (
                  <TableRow key={e.matricule} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className={`text-white text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                            {e.prenom[0]}{e.nom.split(" ").pop()?.[0] ?? ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{e.nom}</p>
                          <p className="text-xs text-muted-foreground">{e.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell"><span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{e.matricule}</span></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm max-w-[200px] truncate">{e.specialite}</TableCell>
                    <TableCell><GradeBadge g={e.grade} /></TableCell>
                    <TableCell className="hidden sm:table-cell"><StatutBadge s={e.statut} /></TableCell>
                    <TableCell className="hidden md:table-cell text-right">
                      <p className="text-sm font-semibold">{e.nb_ue} UE</p>
                      <p className="text-xs text-muted-foreground">{e.nb_heures}h</p>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {e.filieres.map(f => <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-xs" aria-label={`Actions pour ${e.nom}`}>
                        Actions <ChevronDown size={12} className="ml-1" aria-hidden="true" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && (
            <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground flex justify-between">
              <span>{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</span>
              <span>{enseignants.length} au total</span>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
