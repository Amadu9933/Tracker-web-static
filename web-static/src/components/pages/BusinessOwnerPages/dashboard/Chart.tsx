import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

const dummyData = {
    today: [
        { time: "8 AM", orders: 50 },
        { time: "10 AM", orders: 75 },
        { time: "12 PM", orders: 100 },
        { time: "2 PM", orders: 85 },
        { time: "4 PM", orders: 120 },
    ],
    yesterday: [
        { time: "8 AM", orders: 40 },
        { time: "10 AM", orders: 70 },
        { time: "12 PM", orders: 95 },
        { time: "2 PM", orders: 80 },
        { time: "4 PM", orders: 110 },
    ],
    last7Days: [
        { day: "Mon", orders: 400 },
        { day: "Tue", orders: 450 },
        { day: "Wed", orders: 420 },
        { day: "Thu", orders: 480 },
        { day: "Fri", orders: 500 },
        { day: "Sat", orders: 520 },
        { day: "Sun", orders: 600 },
    ],
};

const ParcelChart: React.FC = () => {
    const [filter, setFilter] = useState<"today" | "yesterday" | "last7Days">("today");

    const handleFilterChange = (event: SelectChangeEvent<"today" | "yesterday" | "last7Days">) => {
        setFilter(event.target.value as "today" | "yesterday" | "last7Days");
    };

    const chartData =
        filter === "last7Days" ? dummyData.last7Days : filter === "today" ? dummyData.today : dummyData.yesterday;

    return (
        <div className="h-full bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Activity Chart</h2>
                <FormControl variant="outlined" size="small" className="w-40">
                    <InputLabel>Filter</InputLabel>
                    <Select value={filter} onChange={handleFilterChange} label="Filter">
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="yesterday">Yesterday</MenuItem>
                        <MenuItem value="last7Days">Last 7 Days</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={chartData}>
                    <XAxis dataKey={filter === "last7Days" ? "day" : "time"} />
                    <Tooltip />
                    <Area
                        type="linear"
                        dataKey="orders"
                        stroke="#1e90ff"
                        fill="#00FF00"
                        fillOpacity={0.2}
                        strokeWidth={2}
                    />
                    <Line
                        type="linear"
                        dataKey="orders"
                        stroke="#1e90ff"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ParcelChart;
