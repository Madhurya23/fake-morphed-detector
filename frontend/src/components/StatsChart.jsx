import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StatsChart({ data }) {
  const COLORS = ["#4ade80", "#f87171", "#60a5fa"];
  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
        {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
