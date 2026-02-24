type KPICardProps = {
  label: string;
  value: string | number;
  change: number;
};

export default function KPICard({ label, value, change }: KPICardProps) {
  const isPositive = change >= 0;
  return (
    <div className="card">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-blue-deep">
        {value}
      </p>
      <p className={`mt-2 text-sm font-semibold ${isPositive ? "text-green-safe" : "text-red-alert"}`}>
        {isPositive ? "+" : ""}
        {change}% so với kỳ trước
      </p>
    </div>
  );
}
