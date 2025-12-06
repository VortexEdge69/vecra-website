
// src/app/admin/referrals/components/RefBarChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceData {
  ref: string;
  clicks: number;
  conversions: number;
}

interface RefBarChartProps {
  title: string;
  data: PerformanceData[];
}

export default function RefBarChart({ title, data }: RefBarChartProps) {
  const chartData = {
    labels: data.map((d) => d.ref),
    datasets: [
      {
        label: 'Clicks',
        data: data.map((d) => d.clicks),
        backgroundColor: '#4F46E5',
      },
      {
        label: 'Conversions',
        data: data.map((d) => d.conversions),
        backgroundColor: '#A78BFA',
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <Bar data={chartData} />
    </div>
  );
}
