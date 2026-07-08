import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Banknote, CreditCard, Clock, XCircle } from "lucide-react";
import { fetchApi, formatAmount } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface Paiement {
  ref: string; etudiant: string; matricule: string;
  type: string; montant: number; mode: string;
  date: string; statut: string;
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    Validé:       "bg-emerald-100 text-emerald-700 border-emerald-200",
    "En attente": "bg-amber-100 text-amber-700 border-amber-200",
    Rejeté:       "bg-red-100 text-red-700 border-red-200",
  };
  return <Badge className={`font-medium text-xs ${map[s] ?? ""}`}>{s}</Badge>;
}

function TypeBadge({ t }: { t: string }) {
  const map: Record<string, string> = {
    "Scolarité":   "bg-blue-50 text-blue-700 border-blue-200",
    "Inscription": "bg-sky-50 text-sky-700 border-sky-200",
    "Frais divers":"bg-violet-50 text-violet-700 border-violet-200",
    "Examen":      "bg-amber-50 text-amber-700 border-amber-200",
  };
  return <Badge className={`text-xs font-medium ${map[t] ?? "bg-muted text-muted-foreground"}`}>{t}</Badge>;
}

export default function PaiementsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [filterMode, setFilterMode] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: paiements = [], isLoading } = useQuery<Paiement[]>({
    queryKey: ["paiements"],
    queryFn: () => fetchApi<Paiement[]>("/modules/paiements"),
  });

  const filtered = useMemo(() => paiements.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${p.etudiant} ${p.ref} ${p.matricule}`.toLowerCase().includes(q);
    const matchType   = filterType   === "all" || p.type === filterType;
    const matchStatut = filterStatut === "all" || p.statut === filterStatut;
    const matchMode   = filterMode   === "all" || p.mode === filterMode;
    return matchSearch && matchType && matchStatut && matchMode;
  }), [paiements, search, filterType, filterStatut, filterMode]);

  const stats = useMemo(() => ({
    encaisse: paiements.filter(p => p.statut === "Validé").reduce((s, p) => s + p.montant, 0),
    attente:  paiements.filter(p => p.statut === "En attente").reduce((s, p) => s + p.montant, 0),
    rejete:   paiements.filter(p => p.statut === "Rejeté").reduce((s, p) => s + p.montant, 0),
    nb:       paiements.length,
  }), [paiements]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Module financier — Paiements</h1>
          <p className="text-sm text-muted-foreground">{isLoading ? "Chargement…" : `${stats.nb} transactions enregistrées`}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-9"><Plus size={15} aria-hidden="true" />Enregistrer paiement</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enregistrer un paiement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="pay-etudiant">Étudiant (matricule)</Label>
                <Input id="pay-etudiant" placeholder="ETU-2024-001" className="h-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="pay-type">Type</Label>
                  <Select>
                    <SelectTrigger id="pay-type" className="h-9"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      {["Scolarité","Inscription","Frais divers","Examen"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pay-mode">Mode</Label>
                  <Select>
                    <SelectTrigger id="pay-mode" className="h-9"><SelectValue placeholder="Mode" /></SelectTrigger>
                    <SelectContent>
                      {["Espèces","Virement","Chèque","Mobile Money"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pay-montant">Montant (FCFA)</Label>
                <Input id="pay-montant" type="number" placeholder="450 000" className="h-9" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
              <Button onClick={() => setDialogOpen(false)}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Encaissé",      value: formatAmount(stats.encaisse), icon: Banknote,   color:"text-emerald-700", bg:"bg-emerald-500" },
            { label:"En attente",    value: formatAmount(stats.attente),  icon: Clock,      color:"text-amber-700",   bg:"bg-amber-500" },
            { label:"Rejeté",        value: formatAmount(stats.rejete),   icon: XCircle,    color:"text-red-700",     bg:"bg-red-500" },
            { label:"Transactions",  value: stats.nb,                     icon: CreditCard, color:"text-blue-700",    bg:"bg-blue-500" },
          ].map(s => (
            <Card key={s.label} className="border border-card-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon size={18} className="text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <div className={`text-lg font-bold leading-tight truncate mt-0.5 ${s.color}`}>{isLoading ? <Skeleton className="h-6 w-20" /> : s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input placeholder="Rechercher…" className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} aria-label="Rechercher un paiement" />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filtrer par type"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {["Scolarité","Inscription","Frais divers","Examen"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterMode} onValueChange={setFilterMode}>
            <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filtrer par mode"><SelectValue placeholder="Mode" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les modes</SelectItem>
              {["Espèces","Virement","Chèque","Mobile Money"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatut} onValueChange={setFilterStatut}>
            <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filtrer par statut"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {["Validé","En attente","Rejeté"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {(search || filterType !== "all" || filterStatut !== "all" || filterMode !== "all") && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={() => { setSearch(""); setFilterType("all"); setFilterStatut("all"); setFilterMode("all"); }}>
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
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Type</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Mode</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">Montant</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Statut</TableHead>
                <TableHead className="sr-only">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>{Array.from({ length: 8 }).map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}</TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Aucun paiement trouvé.</TableCell></TableRow>
              ) : (
                filtered.map(p => (
                  <TableRow key={p.ref} className="hover:bg-muted/30">
                    <TableCell><span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{p.ref}</span></TableCell>
                    <TableCell>
                      <p className="text-sm font-semibold">{p.etudiant}</p>
                      <p className="text-xs text-muted-foreground">{p.matricule}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell"><TypeBadge t={p.type} /></TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.mode}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{new Intl.NumberFormat("fr-FR").format(p.montant)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{p.date}</TableCell>
                    <TableCell><StatusBadge s={p.statut} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-xs" aria-label={`Voir le reçu ${p.ref}`}>Reçu</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && (
            <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground flex justify-between">
              <span>{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</span>
              <span>Total filtré : <strong className="text-foreground">{formatAmount(filtered.filter(p => p.statut === "Validé").reduce((s,p)=>s+p.montant,0))}</strong></span>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
