import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CalendarEvent } from "@/lib/api";

interface EventCalendarProps {
  events: CalendarEvent[];
}

const typeConfig: Record<string, { color: string; dot: string }> = {
  Académique:    { color: "bg-blue-50 text-blue-700 border-blue-200",    dot: "bg-blue-500" },
  Examen:        { color: "bg-red-50 text-red-700 border-red-200",       dot: "bg-red-500" },
  Administratif: { color: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  Événement:     { color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  Inscription:   { color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

function getDaysUntil(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return "Passé";
  if (diff === 0) return "Aujourd'hui";
  if (diff === 1) return "Demain";
  return `Dans ${diff} j`;
}

export function EventCalendar({ events }: EventCalendarProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card className="border border-card-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Calendrier des événements</CardTitle>
            <CardDescription className="text-xs mt-0.5">Prochains événements universitaires</CardDescription>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">
            Voir tout
          </button>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <span key={type} className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {type}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {sorted.map((ev) => {
            const cfg = typeConfig[ev.type] ?? { color: "bg-muted text-muted-foreground border-muted", dot: "bg-gray-400" };
            const daysUntil = getDaysUntil(ev.date);
            const isPast = daysUntil === "Passé";
            return (
              <div
                key={ev.id}
                className={`flex gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/30 ${isPast ? "opacity-50" : ""}`}
              >
                {/* Date badge */}
                <div className="flex-shrink-0 w-11 text-center">
                  <p className="text-lg font-bold text-foreground leading-none">
                    {new Date(ev.date).getDate()}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(new Date(ev.date))}
                  </p>
                </div>
                <div className="w-px bg-border flex-shrink-0" />
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-tight truncate">{ev.titre}</p>
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded border whitespace-nowrap flex-shrink-0 ${
                        daysUntil === "Aujourd'hui"
                          ? "bg-blue-600 text-white border-blue-600"
                          : daysUntil === "Demain"
                          ? "bg-amber-500 text-white border-amber-500"
                          : isPast
                          ? "bg-muted text-muted-foreground border-border"
                          : "bg-card text-muted-foreground border-border"
                      }`}
                    >
                      {daysUntil}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{ev.description}</p>
                  <Badge className={`mt-1.5 text-xs font-medium ${cfg.color}`}>{ev.type}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
