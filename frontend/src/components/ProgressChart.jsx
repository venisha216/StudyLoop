import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ff6b6b", "#f7b267", "#4ecdc4"];

const ProgressChart = ({ topics }) => {
  const counts = {
    high: 0,
    medium: 0,
    low: 0,
  };

  topics.forEach((t) => {
    if (t.confidenceLevel === "low") counts.high++;
    else if (t.confidenceLevel === "medium") counts.medium++;
    else counts.low++;
  });

  const data = [
    { name: "High Risk", value: counts.high },
    { name: "Medium", value: counts.medium },
    { name: "Strong", value: counts.low },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;