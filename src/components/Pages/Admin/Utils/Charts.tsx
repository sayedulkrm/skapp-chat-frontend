import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
import moment from "moment";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    Tooltip,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    ArcElement,
    PointElement
);

const getLastSevenDays = () => {
    // const today = new Date();
    // const lastSevenDays = [];
    // for (let i = 6; i >= 0; i--) {
    //     const day = new Date(today);
    //     day.setDate(day.getDate() - i);
    //     lastSevenDays.push(day.toLocaleDateString());
    // }
    // return lastSevenDays;

    const currentDate = moment();

    const last7days = [] as any[];

    for (let i = 0; i < 7; i++) {
        // last7days.unshift(currentDate.format("MMM D"));
        // currentDate.subtract(1, "days"); // Subtract 1 day from the current date and set it as the new current date.

        const dayDate = currentDate.clone().subtract(i, "days");

        const dayName = dayDate.format("dddd");

        last7days.unshift(dayName);
    }

    return last7days;
};

const LineChart = ({ value = [] }: any) => {
    // const data = {};

    const labels = getLastSevenDays();

    return (
        <div className="w-full h-full">
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: "My First Dataset",
                            data: value,
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false,
                            },
                        },

                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

const DoughnutChart = ({ value = [], labels = [] }: any) => {
    return (
        <div className="w-full h-full">
            <Doughnut
                data={{
                    labels,
                    datasets: [
                        {
                            data: value,

                            borderColor: ["black", "red"],
                            backgroundColor: ["violet", "pink"],
                            offset: 40,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                    },
                    cutout: 110,
                }}
            />
        </div>
    );
};

export { LineChart, DoughnutChart };
