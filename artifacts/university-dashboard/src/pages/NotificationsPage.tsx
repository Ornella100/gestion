import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, CreditCard, FileText, BookOpen, Settings, CheckCheck, Check } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Notification {
  id: number; titre: string; message: string;
  categorie: string; date: string; lu: boolean;
}

const catConfig: Record<string, { icon: React.ElementType; color: string; dot: string }> = {
  Paiements:   { icon: CreditCard, color:"text-emerald-600", dot:"bg-emerald-500" },
  Inscriptions:{ icon: FileText,   color:"text-blue-600",    dot:"bg-blue-500" },
  Académique:  { icon: BookOpen,   color:"text-violet-600",  dot:"bg-violet-500" },
  Système:     { icon: Settings,   color:"text-gray-500",    dot:"bg-gray-400" },
};

export default function NotificationsPage() {
  const [tab, setTab] = useState("Tout");
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const [allRead, setAllRead] = useState(false);

  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => fetchApi<Notification[]>("/modules/notifications"),
  });

  const data = useMemo(() =>
    notifications.map(n => ({
      ...n,
      lu: allRead || readIds.has(n.id) || n.lu,
    })),
    [notifications, readIds, allRead]
  );

  const filtered = useMemo(() =>
    tab === "Tout" ? data : data.filter(n => n.categorie === tab),
    [data, tab]
  );

  const unreadCount = data.filter(n => !n.lu).length;

  const markRead = (id: number) => setReadIds(p => new Set([...p, id]));
  const markAllRead = () => setAllRead(true);

  const categories = ["Tout", "Paiements", "Inscriptions", "Académique", "Système"];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-700 border-red-200 font-semibold">
              {unreadCount} non lue{unreadCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={markAllRead} aria-label="Marquer toutes les notifications comme lues">
            <CheckCheck size={14} aria-hidden="true" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-5 h-9">
            {categories.map(cat => {
              const count = cat === "Tout"
                ? data.filter(n => !n.lu).length
                : data.filter(n => n.categorie === cat && !n.lu).length;
              return (
                <TabsTrigger key={cat} value={cat} className="text-sm gap-2">
                  {cat}
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold bg-red-500 text-white rounded-full">
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-0">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 border border-border rounded-xl">
                      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Bell size={36} className="mb-3 opacity-40" aria-hidden="true" />
                  <p className="font-medium">Aucune notification</p>
                  <p className="text-sm mt-1">Vous êtes à jour pour cette catégorie.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map(n => {
                    const cfg = catConfig[n.categorie] ?? { icon: Bell, color: "text-gray-500", dot: "bg-gray-400" };
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={n.id}
                        className={cn(
                          "flex gap-4 p-4 border rounded-xl transition-colors",
                          n.lu
                            ? "border-border bg-card opacity-70"
                            : "border-primary/20 bg-primary/5"
                        )}
                      >
                        {/* Icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          n.lu ? "bg-muted" : "bg-primary/10"
                        )}>
                          <Icon size={18} className={n.lu ? "text-muted-foreground" : cfg.color} aria-hidden="true" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className={cn("text-sm leading-tight", n.lu ? "font-medium text-foreground" : "font-semibold text-foreground")}>
                                {!n.lu && <span className={`inline-block w-2 h-2 rounded-full mr-1.5 align-middle ${cfg.dot}`} aria-label="Non lue" />}
                                {n.titre}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                            </div>
                            {!n.lu && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 flex-shrink-0"
                                onClick={() => markRead(n.id)}
                                aria-label={`Marquer "${n.titre}" comme lu`}
                              >
                                <Check size={13} aria-hidden="true" />
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="secondary" className="text-xs">{n.categorie}</Badge>
                            <span className="text-xs text-muted-foreground">{n.date}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
