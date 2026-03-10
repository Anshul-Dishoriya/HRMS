import React, { useState, useEffect } from "react";
import { getAttendanceSummary } from "../api/analyticsApi";
import { useApi } from "../hooks/useApi";
import DailyAttendanceModal from "../components/modals/DailyAttendanceModal";
import Loader from "../components/Loader";

const Dashboard = () => {
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { execute, loading } = useApi(getAttendanceSummary);

    const fetchSummary = async (date) => {
        const result = await execute(date);
        if (result) {
            setData(result);
        }
    };

    useEffect(() => {
        fetchSummary(selectedDate);
    }, [selectedDate]);

    const cards = [
        {
            title: "Attendance Marked",
            value: data?.counts?.total_marked || 0,
            icon: "📋",
            color: "bg-indigo-50 text-indigo-700 border-indigo-100",
        },
        {
            title: "Total Present",
            value: data?.counts?.present || 0,
            icon: "✅",
            color: "bg-green-50 text-green-700 border-green-100",
        },
        {
            title: "Total Absent",
            value: data?.counts?.absent || 0,
            icon: "❌",
            color: "bg-red-50 text-red-700 border-red-100",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Company Dashboard</h2>
                    <p className="text-gray-500 mt-1">Real-time attendance insights</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <label className="text-sm font-semibold text-gray-600 px-2">View Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border-none bg-gray-50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl border ${card.color} shadow-sm transition-all hover:shadow-md flex justify-between items-center`}
                    >
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">
                                {card.title}
                            </p>
                            <h3 className="text-4xl font-extrabold">{loading ? "..." : card.value}</h3>
                        </div>
                        <span className="text-4xl filter grayscale-[0.5]">{card.icon}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl text-indigo-600">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Detailed Attendance Breakup</h3>
                <p className="text-gray-500 max-w-md mb-8">
                    Review the complete list of employees and their attendance status for{" "}
                    <span className="font-bold text-indigo-600">{selectedDate}</span>.
                </p>

                <button
                    onClick={() => setModalOpen(true)}
                    disabled={loading || !data}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                    View Today's Attendance
                </button>
            </div>

            <DailyAttendanceModal
                open={modalOpen}
                setOpen={setModalOpen}
                date={selectedDate}
                records={data?.attendance_list || []}
                loading={loading}
            />
        </div>
    );
};

export default Dashboard;
