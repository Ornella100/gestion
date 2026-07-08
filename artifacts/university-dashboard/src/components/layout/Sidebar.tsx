import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  CreditCard,
  BarChart3,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Tableau de bord", icon: LayoutDashboard, href: "/" },
  { label: "Étudiants",       icon: GraduationCap,   href: "/etudiants" },
  { label: "Enseignants",     icon: Users,            href: "/enseignants" },
  { label: "Filières",        icon: BookOpen,         href: "/filieres" },
  { label: "Classes",         icon: Building2,        href: "/classes" },
  { label: "Inscriptions",    icon: FileText,         href: "/inscriptions", badge: 12 },
  { label: "Paiements",       icon: CreditCard,       href: "/paiements" },
  { label: "Rapports",        icon: BarChart3,        href: "/rapports" },
  { label: "Calendrier",      icon: Calendar,         href: "/calendrier" },
  { label: "Notifications",   icon: Bell,             href: "/notifications", badge: 3 },
  { label: "Paramètres",      icon: Settings,         href: "/parametres" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out relative",
        collapsed ? "w-16" : "w-64"
      )}
      aria-label="Navigation principale"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center shadow-md">
          <GraduationCap size={20} className="text-white" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white leading-tight truncate">UniGest Pro</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Gestion Universitaire</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden" aria-label="Menu principal">
        {!collapsed && (
          <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
            Navigation
          </p>
        )}
        <ul className="space-y-0.5 px-2" role="list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={collapsed ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer relative",
                    isActive
                      ? "bg-sidebar-primary text-white shadow-sm"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon size={18} className="flex-shrink-0" aria-hidden="true" />
                  {!collapsed && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.badge !== undefined && (
                    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full" aria-label={`${item.badge} éléments`}>
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge !== undefined && (
                    <span
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                      aria-label={`${item.badge} éléments en attente`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Year info */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-lg bg-sidebar-accent/60 border border-sidebar-border">
          <p className="text-xs font-medium text-sidebar-foreground/60 mb-0.5">Année universitaire</p>
          <p className="text-sm font-bold text-white">2024 – 2025</p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-primary text-white flex items-center justify-center shadow-md border border-sidebar-border/50 z-10 hover:bg-sidebar-primary/90 transition-colors"
        aria-label={collapsed ? "Ouvrir la barre latérale" : "Réduire la barre latérale"}
        aria-expanded={!collapsed}
      >
        {collapsed
          ? <ChevronRight size={12} aria-hidden="true" />
          : <ChevronLeft size={12} aria-hidden="true" />
        }
      </button>
    </aside>
  );
}
