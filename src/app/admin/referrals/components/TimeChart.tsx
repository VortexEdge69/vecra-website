
// src/app/admin/referrals/components/TimeChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeData {
  date: string;
  clicks?: number;
  conversions?: number;
}

interface TimeChartProps {
  title: string;
  data: TimeData[];
  label: 'clicks' | 'conversions';
}

export default function TimeChart({ title, data, label }: TimeChartProps) {
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label,
        data: data.map((d) => (label === 'clicks' ? d.clicks : d.conversions)),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <Line data={chartData} />
    </div>
  );
}
