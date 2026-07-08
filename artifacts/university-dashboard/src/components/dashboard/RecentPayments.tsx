import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/lib/api";
import { formatAmount } from "@/lib/api";

interface RecentPaymentsProps {
  payments: Payment[];
}

function StatusBadge({ statut }: { statut: string }) {
  if (statut === "Validé")
    return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-medium text-xs">{statut}</Badge>;
  if (statut === "En attente")
    return <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-medium text-xs">{statut}</Badge>;
  if (statut === "Rejeté")
    return <Badge className="bg-red-100 text-red-700 border-red-200 font-medium text-xs">{statut}</Badge>;
  return <Badge variant="secondary" className="text-xs">{statut}</Badge>;
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    "Scolarité": "bg-blue-50 text-blue-700 border-blue-200",
    "Frais divers": "bg-violet-50 text-violet-700 border-violet-200",
    "Inscription": "bg-sky-50 text-sky-700 border-sky-200",
  };
  return (
    <Badge className={`font-medium text-xs ${colors[type] ?? "bg-muted text-muted-foreground"}`}>
      {type}
    </Badge>
  );
}

export function RecentPayments({ payments }: RecentPaymentsProps) {
  const total = payments.filter((p) => p.statut === "Validé").reduce((s, p) => s + p.montant, 0);

  return (
    <Card className="border border-card-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Paiements récents</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Total validé aujourd'hui :{" "}
              <span className="font-semibold text-emerald-600">{formatAmount(total)}</span>
            </CardDescription>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">
            Voir tout
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-2 pb-1 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Étudiant / Réf.</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:block">Type</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Montant</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Statut</span>
          </div>
          {payments.map((p) => (
            <div
              key={p.ref}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center px-2 py-2.5 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{p.etudiant}</p>
                <p className="text-xs text-muted-foreground truncate">{p.ref}</p>
              </div>
              <div className="hidden sm:block">
                <TypeBadge type={p.type} />
              </div>
              <p className="text-sm font-semibold text-right whitespace-nowrap">
                {new Intl.NumberFormat("fr-FR").format(p.montant)}
              </p>
              <StatusBadge statut={p.statut} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
