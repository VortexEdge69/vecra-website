
// src/app/admin/referrals/components/ReferralTable.tsx
interface ReferralTableProps<T> {
  title: string;
  data: T[];
  columns: string[];
}

export default function ReferralTable<T extends { id: number; [key: string]: string | number | null; }>({ title, data, columns }: ReferralTableProps<T>) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-6 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="bg-gray-800 border-b border-gray-700">
                {columns.map((col) => (
                      <td key={col} className="px-6 py-4">
                        {row[col.toLowerCase()]}
                      </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
