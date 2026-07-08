import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Student } from "@/lib/api";

interface RecentStudentsProps {
  students: Student[];
}

function getInitials(nom: string) {
  return nom
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

const avatarColors = [
  "bg-blue-500", "bg-violet-500", "bg-rose-500", "bg-amber-500",
  "bg-teal-500", "bg-sky-500", "bg-emerald-500", "bg-pink-500",
];

function StatusBadge({ statut }: { statut: string }) {
  if (statut === "Actif") return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-medium text-xs">{statut}</Badge>;
  if (statut === "En attente") return <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-medium text-xs">{statut}</Badge>;
  return <Badge variant="secondary" className="font-medium text-xs">{statut}</Badge>;
}

export function RecentStudents({ students }: RecentStudentsProps) {
  return (
    <Card className="border border-card-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Récemment inscrits</CardTitle>
            <CardDescription className="text-xs mt-0.5">Dernières inscriptions étudiantes</CardDescription>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">
            Voir tout
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 px-2 pb-1 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Étudiant</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:block">Filière / Classe</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:block">Date</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Statut</span>
          </div>
          {students.map((s, i) => (
            <div
              key={s.id}
              className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center px-2 py-2.5 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback className={`text-white text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                    {getInitials(s.nom)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{s.nom}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.id}</p>
                </div>
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="text-xs font-medium truncate">{s.filiere}</p>
                <p className="text-xs text-muted-foreground truncate">{s.classe}</p>
              </div>
              <span className="text-xs text-muted-foreground hidden md:block whitespace-nowrap">{s.date}</span>
              <StatusBadge statut={s.statut} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
