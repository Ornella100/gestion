import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { AcademicYear } from "@/lib/api";

interface TopBarProps {
  academicYears: AcademicYear[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

export function TopBar({
  academicYears,
  selectedYear,
  onYearChange,
  onExportPDF,
  onExportExcel,
}: TopBarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="h-16 border-b border-border bg-card flex items-center gap-4 px-6 flex-shrink-0">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Recherche rapide..."
          className="pl-9 h-9 bg-muted/50 border-muted text-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Recherche rapide"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Academic year filter */}
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="h-9 w-48 text-sm" aria-label="Filtrer par année universitaire">
            <SelectValue placeholder="Année universitaire" />
          </SelectTrigger>
          <SelectContent>
            {academicYears.map((y) => (
              <SelectItem key={y.value} value={y.value}>
                {y.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Export */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1.5" aria-label="Exporter les données">
              <Download size={14} aria-hidden="true" />
              Exporter
              <ChevronDown size={12} className="text-muted-foreground" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onExportPDF} className="gap-2 cursor-pointer">
              <FileText size={14} className="text-red-500" aria-hidden="true" />
              Exporter en PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportExcel} className="gap-2 cursor-pointer">
              <FileSpreadsheet size={14} className="text-green-600" aria-hidden="true" />
              Exporter en Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 relative"
              aria-label="Notifications (3 nouvelles)"
            >
              <Bell size={17} aria-hidden="true" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">3 nouvelles</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: "Paiement en attente de validation", time: "Il y a 5 min", color: "bg-yellow-500" },
              { title: "12 nouvelles inscriptions reçues", time: "Il y a 2h", color: "bg-blue-500" },
              { title: "Réunion pédagogique demain 09h00", time: "Il y a 3h", color: "bg-green-500" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex gap-3 py-3 cursor-pointer">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.color}`} aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium leading-tight">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2" aria-label="Menu du compte administrateur">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-white text-xs font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold leading-tight">Administrateur</p>
                <p className="text-xs text-muted-foreground leading-tight">admin@univ.ci</p>
              </div>
              <ChevronDown size={12} className="text-muted-foreground" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
