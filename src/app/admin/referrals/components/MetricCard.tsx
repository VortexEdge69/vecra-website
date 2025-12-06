
// src/app/admin/referrals/components/MetricCard.tsx
interface MetricCardProps {
  title: string;
  value: string | number;
}

export default function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
