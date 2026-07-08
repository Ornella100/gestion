import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { StatCards } from "@/components/dashboard/StatCards";
import { EnrollmentChart } from "@/components/dashboard/EnrollmentChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentStudents } from "@/components/dashboard/RecentStudents";
import { RecentPayments } from "@/components/dashboard/RecentPayments";
import { EventCalendar } from "@/components/dashboard/EventCalendar";
import { fetchApi } from "@/lib/api";
import type {
  Stats,
  EnrollmentPoint,
  RevenuePoint,
  Student,
  Payment,
  CalendarEvent,
  AcademicYear,
} from "@/lib/api";

function CardSkeleton({ h = "h-32" }: { h?: string }) {
  return <Skeleton className={`w-full rounded-xl ${h}`} />;
}

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  const yearParam = { annee: selectedYear };

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["stats", selectedYear],
    queryFn: () => fetchApi<Stats>("/dashboard/stats", yearParam),
  });

  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ["enrollments", selectedYear],
    queryFn: () => fetchApi<EnrollmentPoint[]>("/dashboard/enrollments/chart", yearParam),
  });

  const { data: revenue, isLoading: loadingRevenue } = useQuery({
    queryKey: ["revenue", selectedYear],
    queryFn: () => fetchApi<RevenuePoint[]>("/dashboard/revenue/chart", yearParam),
  });

  const { data: students, isLoading: loadingStudents } = useQuery({
    queryKey: ["students-recent", selectedYear],
    queryFn: () => fetchApi<Student[]>("/dashboard/students/recent", yearParam),
  });

  const { data: payments, isLoading: loadingPayments } = useQuery({
    queryKey: ["payments-recent", selectedYear],
    queryFn: () => fetchApi<Payment[]>("/dashboard/payments/recent", yearParam),
  });

  const { data: events, isLoading: loadingEvents } = useQuery({
    queryKey: ["events", selectedYear],
    queryFn: () => fetchApi<CalendarEvent[]>("/dashboard/events", yearParam),
  });

  const { data: academicYears } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => fetchApi<AcademicYear[]>("/dashboard/academic-years"),
    initialData: [{ value: "2024-2025", label: "2024-2025 (En cours)" }],
  });

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    alert("Export Excel — fonctionnalité à connecter au backend.");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <TopBar
        academicYears={academicYears ?? []}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Vue globale de l'université — Année {selectedYear}
          </p>
        </div>

        {/* Stat cards */}
        {loadingStats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <CardSkeleton key={i} h="h-28" />
            ))}
          </div>
        ) : stats ? (
          <StatCards stats={stats} />
        ) : null}

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loadingEnrollments ? (
            <CardSkeleton h="h-72" />
          ) : enrollments ? (
            <EnrollmentChart data={enrollments} />
          ) : null}

          {loadingRevenue ? (
            <CardSkeleton h="h-72" />
          ) : revenue ? (
            <RevenueChart data={revenue} />
          ) : null}
        </div>

        {/* Tables + calendar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent students — spans 2 cols */}
          <div className="xl:col-span-2">
            {loadingStudents ? (
              <CardSkeleton h="h-80" />
            ) : students ? (
              <RecentStudents students={students} />
            ) : null}
          </div>

          {/* Event calendar */}
          {loadingEvents ? (
            <CardSkeleton h="h-80" />
          ) : events ? (
            <EventCalendar events={events} />
          ) : null}
        </div>

        {/* Recent payments — full width */}
        {loadingPayments ? (
          <CardSkeleton h="h-80" />
        ) : payments ? (
          <RecentPayments payments={payments} />
        ) : null}
      </main>
    </div>
  );
}
