import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, TrendingUp, Users, GraduationCap, Award } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
  type TooltipProps,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface TauxReussite { filiere: string; taux: number; admis: number; total: number; }
interface GenreData   { name: string; value: number; fill: string; }
interface EvolutionPt { annee: string; etudiants: number; enseignants: number; }

const ChartTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-card-border rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold mb-1 text-foreground">{label}</p>
      {payload.map(p => (
        <div key={String(p.name)} className="flex justify-between gap-3">
          <span className="text-muted-foreground">{p.name === "taux" ? "Taux réussite" : p.name === "etudiants" ? "Étudiants" : String(p.name)}</span>
          <span className="font-bold">{p.name === "taux" ? `${p.value}%` : Number(p.value).toLocaleString("fr-FR")}</span>
        </div>
      ))}
    </div>
  );
};

export default function RapportsPage() {
  const [annee, setAnnee] = useState("2024-2025");

  const { data: taux = [],      isLoading: l1 } = useQuery<TauxReussite[]>({ queryKey: ["rapports-taux"],      queryFn: () => fetchApi("/modules/rapports/taux-reussite") });
  const { data: genre = [],     isLoading: l2 } = useQuery<GenreData[]>   ({ queryKey: ["rapports-genre"],     queryFn: () => fetchApi("/modules/rapports/genre") });
  const { data: evolution = [], isLoading: l3 } = useQuery<EvolutionPt[]> ({ queryKey: ["rapports-evolution"], queryFn: () => fetchApi("/modules/rapports/evolution") });

  const totalEtudiants   = taux.reduce((s, t) => s + t.total, 0);
  const totalAdmis       = taux.reduce((s, t) => s + t.admis, 0);
  const tauxMoyen        = taux.length ? Math.round(totalAdmis / totalEtudiants * 100) : 0;
  const meilleureFiliere = taux.reduce((best, t) => (t.taux > (best?.taux ?? 0) ? t : best), taux[0]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Rapports & statistiques</h1>
          <p className="text-sm text-muted-foreground">Synthèse analytique de l'université</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={annee} onValueChange={setAnnee}>
            <SelectTrigger className="h-9 w-44 text-sm" aria-label="Année universitaire"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["2024-2025","2023-2024","2022-2023"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5" aria-label="Exporter le rapport">
            <Download size={14} aria-hidden="true" />Exporter
          </Button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Étudiants inscrits", value: totalEtudiants.toLocaleString("fr-FR"), icon: GraduationCap, color:"text-blue-700", bg:"bg-blue-500", loading: l1 },
            { label:"Admis (toutes filières)", value: totalAdmis.toLocaleString("fr-FR"), icon: Award, color:"text-emerald-700", bg:"bg-emerald-500", loading: l1 },
            { label:"Taux de réussite moyen", value: `${tauxMoyen}%`, icon: TrendingUp, color:"text-violet-700", bg:"bg-violet-500", loading: l1 },
            { label:"Meilleure filière", value: meilleureFiliere?.filiere.split(" ")[0] ?? "—", icon: Users, color:"text-amber-700", bg:"bg-amber-500", loading: l1 },
          ].map(k => (
            <Card key={k.label} className="border border-card-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${k.bg} flex items-center justify-center flex-shrink-0`}>
                  <k.icon size={18} className="text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium truncate">{k.label}</p>
                  <div className={`text-xl font-bold leading-tight mt-0.5 ${k.color}`}>
                    {k.loading ? <Skeleton className="h-6 w-16" /> : k.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Taux réussite bar — spans 3 */}
          <Card className="lg:col-span-3 border border-card-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Taux de réussite par filière</CardTitle>
              <CardDescription className="text-xs">Pourcentage d'étudiants admis par filière</CardDescription>
            </CardHeader>
            <CardContent>
              {l1 ? <Skeleton className="h-52 w-full" /> : (
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={taux} layout="vertical" margin={{ left: 80, right: 20, top: 4, bottom: 4 }} barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(214,32%,91%)" />
                    <XAxis type="number" domain={[0,100]} tickFormatter={v=>`${v}%`} tick={{ fontSize:11, fill:"hsl(215,16%,47%)" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="filiere" tick={{ fontSize:10, fill:"hsl(215,16%,47%)" }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill:"hsl(214,32%,91%)", opacity:0.5 }} />
                    <Bar dataKey="taux" radius={[0,3,3,0]}>
                      {taux.map((t, i) => <Cell key={i} fill={t.taux >= 80 ? "hsl(142,71%,45%)" : t.taux >= 70 ? "hsl(221,83%,53%)" : "hsl(38,92%,50%)"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Genre donut — spans 2 */}
          <Card className="lg:col-span-2 border border-card-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Répartition par genre</CardTitle>
              <CardDescription className="text-xs">Distribution des effectifs étudiants</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {l2 ? <Skeleton className="h-52 w-full" /> : (
                <>
                  <ResponsiveContainer width="100%" height={170}>
                    <PieChart>
                      <Pie data={genre} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" aria-label="Répartition par genre">
                        {genre.map((g, i) => <Cell key={i} fill={g.fill} />)}
                      </Pie>
                      <Tooltip formatter={(v: ValueType) => [Number(v).toLocaleString("fr-FR"), ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-6 mt-2">
                    {genre.map(g => (
                      <div key={g.name} className="text-center">
                        <div className="flex items-center gap-1.5 justify-center mb-0.5">
                          <span className="w-3 h-3 rounded-full" style={{ background: g.fill }} aria-hidden="true" />
                          <span className="text-xs text-muted-foreground">{g.name}</span>
                        </div>
                        <p className="text-lg font-bold">{g.value.toLocaleString("fr-FR")}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round(g.value / genre.reduce((s,x)=>s+x.value,0)*100)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Évolution des effectifs */}
        <Card className="border border-card-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Évolution des effectifs</CardTitle>
                <CardDescription className="text-xs">Étudiants et enseignants sur 6 ans</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-1 rounded bg-primary inline-block" />Étudiants</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-1 rounded bg-emerald-500 inline-block" />Enseignants</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {l3 ? <Skeleton className="h-48 w-full" /> : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={evolution} margin={{ top:4, right:4, left:-10, bottom:0 }}>
                  <defs>
                    <linearGradient id="gradEtu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradEns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" vertical={false}/>
                  <XAxis dataKey="annee" tick={{ fontSize:11, fill:"hsl(215,16%,47%)" }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize:11, fill:"hsl(215,16%,47%)" }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<ChartTooltip />}/>
                  <Area type="monotone" dataKey="etudiants" stroke="hsl(221,83%,53%)" strokeWidth={2.5} fill="url(#gradEtu)" dot={false} activeDot={{ r:4 }}/>
                  <Area type="monotone" dataKey="enseignants" stroke="hsl(142,71%,45%)" strokeWidth={2.5} fill="url(#gradEns)" dot={false} activeDot={{ r:4 }}/>
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
