import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { type NameType, type ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { EnrollmentPoint } from "@/lib/api";

interface EnrollmentChartProps {
  data: EnrollmentPoint[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        <p className="text-sm font-bold text-primary">
          {Number(payload[0].value).toLocaleString("fr-FR")} inscriptions
        </p>
      </div>
    );
  }
  return null;
};

export function EnrollmentChart({ data }: EnrollmentChartProps) {
  return (
    <Card className="border border-card-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Évolution des inscriptions</CardTitle>
            <CardDescription className="text-xs mt-0.5">12 derniers mois</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            <span className="text-xs text-muted-foreground">Inscriptions</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
            <XAxis
              dataKey="mois"
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "hsl(221, 83%, 53%)", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="inscriptions"
              stroke="hsl(221, 83%, 53%)"
              strokeWidth={2.5}
              fill="url(#enrollGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "hsl(221, 83%, 53%)", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
