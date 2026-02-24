"use client";

import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from "recharts";

type DonutItem = { name: string; value: number; color: string };

export default function ReportDonut({ data }: { data: DonutItem[] }) {
  return (
    <div className="card h-[320px]">
      <h3 className="font-semibold text-blue-deep">Phân loại tố giác</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
