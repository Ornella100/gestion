import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, getDay,
  isSameDay, isSameMonth, isToday, addMonths, subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Evenement {
  id: number; titre: string; date: string; type: string; description: string;
}

const typeConfig: Record<string, { badge: string; dot: string }> = {
  Académique:    { badge: "bg-blue-100 text-blue-700 border-blue-200",    dot: "bg-blue-500" },
  Examen:        { badge: "bg-red-100 text-red-700 border-red-200",       dot: "bg-red-500" },
  Administratif: { badge: "bg-violet-100 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  Événement:     { badge: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  Inscription:   { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

const WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function CalendrierPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(today);

  const { data: evenements = [], isLoading } = useQuery<Evenement[]>({
    queryKey: ["evenements"],
    queryFn: () => fetchApi<Evenement[]>("/modules/evenements"),
  });

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end   = endOfMonth(currentMonth);
    const allDays = eachDayOfInterval({ start, end });
    const startPad = getDay(start); // 0=Sun
    return { allDays, startPad };
  }, [currentMonth]);

  const getEventsForDay = (day: Date) =>
    evenements.filter(e => isSameDay(new Date(e.date), day));

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const monthEvents = useMemo(() =>
    evenements.filter(e => isSameMonth(new Date(e.date), currentMonth))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [evenements, currentMonth]
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Calendrier académique</h1>
          <p className="text-sm text-muted-foreground">{monthEvents.length} événement{monthEvents.length !== 1 ? "s" : ""} ce mois</p>
        </div>
        <Button className="gap-2 h-9"><Plus size={15} aria-hidden="true" />Ajouter événement</Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          {/* Calendar grid */}
          <div className="xl:col-span-2 space-y-4">
            {/* Month nav */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: fr })}
              </h2>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(p => subMonths(p, 1))} aria-label="Mois précédent">
                  <ChevronLeft size={15} aria-hidden="true" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs px-3" onClick={() => { const t = new Date(); setCurrentMonth(new Date(t.getFullYear(), t.getMonth(), 1)); setSelectedDay(t); }}>
                  Aujourd'hui
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(p => addMonths(p, 1))} aria-label="Mois suivant">
                  <ChevronRight size={15} aria-hidden="true" />
                </Button>
              </div>
            </div>

            <Card className="border border-card-border shadow-sm">
              <CardContent className="p-4">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 mb-2">
                  {WEEKDAYS.map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">{d}</div>
                  ))}
                </div>
                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Padding for first day */}
                  {Array.from({ length: days.startPad }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}
                  {days.allDays.map(day => {
                    const events = getEventsForDay(day);
                    const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
                    const todayDay = isToday(day);
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDay(day)}
                        aria-label={format(day, "d MMMM yyyy", { locale: fr })}
                        aria-pressed={isSelected}
                        className={cn(
                          "relative flex flex-col items-center rounded-lg p-1.5 min-h-[52px] transition-colors text-sm font-medium",
                          isSelected
                            ? "bg-primary text-white"
                            : todayDay
                            ? "bg-primary/10 text-primary font-bold"
                            : "hover:bg-muted/50 text-foreground"
                        )}
                      >
                        <span>{format(day, "d")}</span>
                        {events.length > 0 && (
                          <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                            {events.slice(0, 3).map(e => {
                              const cfg = typeConfig[e.type] ?? { dot: "bg-gray-400" };
                              return (
                                <span
                                  key={e.id}
                                  className={cn("w-1.5 h-1.5 rounded-full", isSelected ? "bg-white" : cfg.dot)}
                                  aria-hidden="true"
                                />
                              );
                            })}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {Object.entries(typeConfig).map(([type, cfg]) => (
                <span key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar: selected day or month events */}
          <div className="space-y-4">
            {/* Selected day events */}
            {selectedDay && (
              <div>
                <h3 className="text-sm font-semibold mb-3 capitalize text-foreground">
                  {format(selectedDay, "EEEE d MMMM", { locale: fr })}
                </h3>
                {selectedEvents.length === 0 ? (
                  <Card className="border border-card-border">
                    <CardContent className="p-6 text-center">
                      <CalendarDays size={28} className="mx-auto text-muted-foreground mb-2" aria-hidden="true" />
                      <p className="text-sm text-muted-foreground">Aucun événement ce jour</p>
                    </CardContent>
                  </Card>
                ) : selectedEvents.map(e => {
                  const cfg = typeConfig[e.type] ?? { badge: "bg-muted text-muted-foreground border-border", dot: "bg-gray-400" };
                  return (
                    <Card key={e.id} className={`border border-card-border mb-2 border-l-4`} style={{ borderLeftColor: `var(--color-${e.type === "Académique" ? "blue" : e.type === "Examen" ? "red" : "violet"}-500, hsl(221 83% 53%))` }}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold">{e.titre}</p>
                          <Badge className={`text-xs flex-shrink-0 ${cfg.badge}`}>{e.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{e.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* All events this month */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Événements — {format(currentMonth, "MMMM", { locale: fr })}
              </h3>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-muted rounded-lg mb-2 animate-pulse" />)
              ) : monthEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun événement ce mois.</p>
              ) : (
                <div className="space-y-2">
                  {monthEvents.map(e => {
                    const cfg = typeConfig[e.type] ?? { badge: "bg-muted text-muted-foreground", dot: "bg-gray-400" };
                    const d   = new Date(e.date);
                    const isPast = d < new Date();
                    return (
                      <button
                        key={e.id}
                        onClick={() => setSelectedDay(d)}
                        className={cn(
                          "w-full flex gap-3 p-3 rounded-lg border border-border text-left transition-colors hover:bg-muted/40",
                          isPast && "opacity-50"
                        )}
                        aria-label={`Voir l'événement : ${e.titre}`}
                      >
                        <div className="w-9 text-center flex-shrink-0">
                          <p className="text-base font-bold leading-none">{format(d, "d")}</p>
                          <p className="text-xs text-muted-foreground capitalize">{format(d, "MMM", { locale: fr })}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{e.titre}</p>
                          <Badge className={`mt-1 text-xs ${cfg.badge}`}>{e.type}</Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
