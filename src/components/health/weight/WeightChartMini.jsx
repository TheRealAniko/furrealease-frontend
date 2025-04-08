import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const WeightChartMini = ({ weightHistory }) => {
    if (!weightHistory || weightHistory.length === 0) return null;

    const chartDataSorted = [...weightHistory].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    const data = chartDataSorted
        .slice(-7) // nur die letzten 7 Werte
        .map((entry) => ({
            date: new Date(entry.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
            }),
            weight: entry.weight,
        }));

    return (
        <ResponsiveContainer width="100%" height={100}>
            <BarChart data={data}>
                <XAxis dataKey="date" />
                <Tooltip />
                <Bar
                    dataKey="weight"
                    fill="#D8995A"
                    radius={[9999, 9999, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default WeightChartMini;
