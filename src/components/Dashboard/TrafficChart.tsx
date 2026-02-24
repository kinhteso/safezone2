"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TrafficPoint = {
  date: string;
  visits: number;
  chats: number;
};

export default function TrafficChart({ data }: { data: TrafficPoint[] }) {
  return (
    <div className="card h-[320px]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-blue-deep">Lượt truy cập & phiên chat</h3>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#1B6CA8" name="Lượt truy cập" />
          <Bar dataKey="chats" fill="#3B9FE8" name="Phiên chat" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
