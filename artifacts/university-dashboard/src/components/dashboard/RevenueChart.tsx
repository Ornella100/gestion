import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { type NameType, type ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { RevenuePoint } from "@/lib/api";

interface RevenueChartProps {
  data: RevenuePoint[];
}

const fmt = (v: number) =>
  new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(v);

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((s, p) => s + Number(p.value ?? 0), 0);
    return (
      <div className="bg-card border border-card-border rounded-lg shadow-lg px-3 py-2 min-w-[160px]">
        <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex justify-between gap-4 text-xs mb-1">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: p.fill }}
              />
              <span className="text-muted-foreground">
                {p.name === "scolarite" ? "Scolarité" : "Autres"}
              </span>
            </span>
            <span className="font-semibold">
              {new Intl.NumberFormat("fr-FR").format(Number(p.value ?? 0))}
            </span>
          </div>
        ))}
        <div className="border-t border-border mt-1.5 pt-1.5 flex justify-between text-xs">
          <span className="text-muted-foreground font-medium">Total</span>
          <span className="font-bold text-foreground">
            {new Intl.NumberFormat("fr-FR").format(total)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex items-center gap-4 justify-end mt-2">
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="w-3 h-3 rounded-sm inline-block bg-blue-500" />
      Scolarité
    </span>
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="w-3 h-3 rounded-sm inline-block bg-emerald-500" />
      Autres frais
    </span>
  </div>
);

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="border border-card-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Revenus encaissés</CardTitle>
            <CardDescription className="text-xs mt-0.5">12 derniers mois — en FCFA</CardDescription>
          </div>
          <CustomLegend />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
            <XAxis
              dataKey="mois"
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "hsl(214, 32%, 91%)", opacity: 0.5 }}
            />
            <Bar dataKey="scolarite" fill="hsl(221, 83%, 53%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="autres" fill="hsl(142, 71%, 45%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
