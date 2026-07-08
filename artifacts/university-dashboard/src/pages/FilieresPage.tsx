import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Users, Building2, User } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface Filiere {
  code: string; intitule: string; departement: string; responsable: string;
  duree: number; niveaux: string[]; nb_etudiants: number;
  nb_classes: number; capacite_max: number; description: string;
}

const deptColors: Record<string, { badge: string; accent: string }> = {
  "Sciences & Technologies":        { badge: "bg-blue-100 text-blue-700 border-blue-200",    accent: "border-l-blue-500" },
  "Sciences Économiques & Gestion": { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", accent: "border-l-emerald-500" },
  "Sciences Juridiques":            { badge: "bg-violet-100 text-violet-700 border-violet-200",  accent: "border-l-violet-500" },
  "Sciences de la Santé":           { badge: "bg-rose-100 text-rose-700 border-rose-200",     accent: "border-l-rose-500" },
  "Lettres & Sciences Humaines":    { badge: "bg-amber-100 text-amber-700 border-amber-200",  accent: "border-l-amber-500" },
};

export default function FilieresPage() {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const { data: filieres = [], isLoading } = useQuery<Filiere[]>({
    queryKey: ["filieres"],
    queryFn: () => fetchApi<Filiere[]>("/modules/filieres"),
  });

  const depts = useMemo(() => [...new Set(filieres.map(f => f.departement))], [filieres]);

  const filtered = useMemo(() => filieres.filter(f => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${f.intitule} ${f.code} ${f.departement}`.toLowerCase().includes(q);
    const matchDept   = filterDept === "all" || f.departement === filterDept;
    return matchSearch && matchDept;
  }), [filieres, search, filterDept]);

  const totalEtudiants = useMemo(() => filieres.reduce((s, f) => s + f.nb_etudiants, 0), [filieres]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Filières & programmes</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Chargement…" : `${filieres.length} filières · ${totalEtudiants.toLocaleString("fr-FR")} étudiants`}
          </p>
        </div>
        <Button className="gap-2 h-9"><Plus size={15} aria-hidden="true" />Nouvelle filière</Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input placeholder="Rechercher une filière…" className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} aria-label="Rechercher une filière" />
          </div>
          <Select value={filterDept} onValueChange={setFilterDept}>
            <SelectTrigger className="h-9 w-56 text-sm" aria-label="Filtrer par département"><SelectValue placeholder="Département" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les départements</SelectItem>
              {depts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          {(search || filterDept !== "all") && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={() => { setSearch(""); setFilterDept("all"); }}>
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="font-medium">Aucune filière trouvée</p>
            <p className="text-sm mt-1">Modifiez vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(f => {
              const cfg = deptColors[f.departement] ?? { badge:"bg-gray-100 text-gray-600 border-gray-200", accent:"border-l-gray-400" };
              const pct = Math.round((f.nb_etudiants / f.capacite_max) * 100);
              return (
                <Card key={f.code} className={`border border-card-border shadow-sm border-l-4 ${cfg.accent} hover:shadow-md transition-shadow`}>
                  <CardHeader className="pb-3 pt-4 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold font-mono text-primary">{f.code}</span>
                          <Badge variant="outline" className="text-xs">{f.duree} ans</Badge>
                        </div>
                        <p className="text-sm font-semibold leading-tight">{f.intitule}</p>
                      </div>
                      <Badge className={`text-xs flex-shrink-0 ${cfg.badge}`}>{f.departement.split(" ")[0]}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.description}</p>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                    {/* Niveaux */}
                    <div className="flex gap-1">
                      {f.niveaux.map(n => <Badge key={n} variant="secondary" className="text-xs">{n}</Badge>)}
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-xs text-muted-foreground">Étudiants</p>
                          <p className="text-sm font-bold">{f.nb_etudiants.toLocaleString("fr-FR")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-xs text-muted-foreground">Classes</p>
                          <p className="text-sm font-bold">{f.nb_classes}</p>
                        </div>
                      </div>
                    </div>
                    {/* Capacity bar */}
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Taux de remplissage</span>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5" aria-label={`Taux de remplissage ${pct}%`} />
                    </div>
                    {/* Responsable */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border">
                      <User size={12} aria-hidden="true" />
                      <span className="truncate">{f.responsable}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">Voir détails</Button>
                      <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">Modifier</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
