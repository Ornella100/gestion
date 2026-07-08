import { GraduationCap, Users, BookOpen, Building2, FileText, CreditCard, TrendingUp, TrendingDown, Banknote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Stats } from "@/lib/api";
import { formatAmount } from "@/lib/api";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
}

function StatCard({ title, value, icon: Icon, color, iconBg, trend, trendLabel, subtitle }: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;
  return (
    <Card className="border border-card-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">
              {title}
            </p>
            <p className={cn("text-2xl font-bold mt-1.5 leading-none", color)}>
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {isPositive ? (
                  <TrendingUp size={12} className="text-emerald-500 flex-shrink-0" />
                ) : (
                  <TrendingDown size={12} className="text-red-500 flex-shrink-0" />
                )}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    isPositive ? "text-emerald-600" : "text-red-500"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {trend}%
                </span>
                {trendLabel && (
                  <span className="text-xs text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3", iconBg)}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCardsProps {
  stats: Stats;
}

export function StatCards({ stats }: StatCardsProps) {
  const cards: StatCardProps[] = [
    {
      title: "Étudiants",
      value: stats.students.toLocaleString("fr-FR"),
      icon: GraduationCap,
      color: "text-blue-700",
      iconBg: "bg-blue-500",
      trend: stats.studentsTrend,
      trendLabel: "vs. année préc.",
    },
    {
      title: "Enseignants",
      value: stats.teachers.toLocaleString("fr-FR"),
      icon: Users,
      color: "text-violet-700",
      iconBg: "bg-violet-500",
      trend: stats.teachersTrend,
      trendLabel: "vs. année préc.",
    },
    {
      title: "Filières",
      value: stats.filieres,
      icon: BookOpen,
      color: "text-amber-700",
      iconBg: "bg-amber-500",
    },
    {
      title: "Classes",
      value: stats.classes,
      icon: Building2,
      color: "text-teal-700",
      iconBg: "bg-teal-500",
    },
    {
      title: "Inscriptions",
      value: stats.inscriptions.toLocaleString("fr-FR"),
      icon: FileText,
      color: "text-rose-700",
      iconBg: "bg-rose-500",
      trend: stats.inscriptionsTrend,
      trendLabel: "ce mois",
    },
    {
      title: "Paiements du jour",
      value: stats.paiementsJour,
      icon: CreditCard,
      color: "text-sky-700",
      iconBg: "bg-sky-500",
      subtitle: "transactions validées",
    },
    {
      title: "Montant encaissé",
      value: formatAmount(stats.montantEncaisse),
      icon: Banknote,
      color: "text-emerald-700",
      iconBg: "bg-emerald-500",
      trend: stats.montantTrend,
      trendLabel: "ce mois",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
