import React, { useState, useEffect, useRef } from "react";
import ActionMenu from "../components/ActionMenu";
import AddEmployeeModal from "../components/AddEmployee";
import DailyAttendanceModal from "../components/modals/DailyAttendanceModal";
import Loader from "../components/Loader";
import { getEmployees, createEmployeeApi, deleteEmployeeApi } from "../api/employeeApi";
import { markAttendanceApi } from "../api/attendenceApi";
import { getAttendanceSummary } from "../api/analyticsApi";
import { useApi } from "../hooks/useApi";
import { IconUsers, IconCheckCircle, IconXCircle, IconCalendar, IconBarChart, IconArrow } from "../components/icons";
import { formatDisplayDate } from "../utils/dateUtils";
import StatCard from "../components/ui/StatCard";
import SectionHeader from "../components/ui/SectionHeader";

const DashboardOverview = () => {
    const today = new Date().toISOString().split("T")[0];
    const [employees, setEmployees] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [summaryData, setSummaryData] = useState(null);

    // Ref + showPicker() trick: the native <input type="date"> is visually hidden,
    // but clicking the styled pill programmatically opens it.
    const datePickerRef = useRef(null);

    const [addEmpModalOpen, setAddEmpModalOpen] = useState(false);
    const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);

    const { execute: fetchEmployees, loading: empLoading } = useApi(getEmployees);
    const { execute: createEmployee } = useApi(createEmployeeApi);
    const { execute: deleteEmployee } = useApi(deleteEmployeeApi);
    const { execute: markAttendance } = useApi(markAttendanceApi);
    const { execute: fetchSummary, loading: summaryLoading } = useApi(getAttendanceSummary);

    const loadData = async () => {
        const [empList, summary] = await Promise.all([
            fetchEmployees(),
            fetchSummary(selectedDate),
        ]);
        if (empList) setEmployees(empList);
        if (summary) setSummaryData(summary);
    };

    useEffect(() => {
        loadData();
    }, [selectedDate]);

    const handleAddEmployee = async (form) => {
        await createEmployee(form);
        loadData();
    };

    const handleDeleteEmployee = async (id) => {
        await deleteEmployee(id);
        loadData();
    };

    const handleMarkAttendance = async (data) => {
        await markAttendance(data);
        loadData();
    };

    const stats = [
        {
            label: "Attendance Marked",
            value: summaryData?.counts?.total_marked || 0,
            icon: <IconUsers />,
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600",
            stripe: "bg-indigo-500",
        },
        {
            label: "Total Present",
            value: summaryData?.counts?.present || 0,
            icon: <IconCheckCircle size={20} />,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
            stripe: "bg-green-500",
        },
        {
            label: "Total Absent",
            value: summaryData?.counts?.absent || 0,
            icon: <IconXCircle size={20} />,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            stripe: "bg-red-500",
        },
    ];

    return (
        <div className="space-y-8">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h2>
                    <p className="text-gray-500 mt-1 text-sm">Lightweight HRMS &amp; Attendance Management</p>
                </div>

                <div
                    onClick={() => datePickerRef.current?.showPicker()}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all group"
                >
                    <span className="text-indigo-500 group-hover:text-indigo-600 transition-colors">
                        <IconCalendar size={16} />
                    </span>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5">
                            Viewing Date
                        </span>
                        <span className="text-sm font-semibold text-gray-700">
                            {formatDisplayDate(selectedDate)}
                        </span>
                    </div>
                    <input
                        ref={datePickerRef}
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} loading={summaryLoading} />
                ))}
            </div>

            <div className="relative bg-indigo-600 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
                <div className="absolute right-16 -bottom-12 w-32 h-32 bg-white/[0.03] rounded-full pointer-events-none" />

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <IconBarChart />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-base leading-tight">Attendance Analytics</h3>
                        <p className="text-indigo-200 text-sm mt-0.5">
                            Detailed breakdown for{" "}
                            <span className="text-white font-semibold">{formatDisplayDate(selectedDate)}</span>
                            {" "}— present/absent ratios &amp; department split
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setAnalyticsModalOpen(true)}
                    className="relative z-10 flex-shrink-0 bg-white text-indigo-600 font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-50 active:scale-95 transition-all shadow-sm"
                >
                    View Analytics
                    <IconArrow />
                </button>
            </div>

            <div className="space-y-6">
                <SectionHeader
                    title="Employee Management"
                    subtitle={`Total registered staff: ${employees.length}`}
                    action={{
                        label: <><span>+</span> Add Employee</>,
                        onClick: () => setAddEmpModalOpen(true),
                    }}
                />

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-visible">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-black tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-4">ID</th>
                                <th className="px-8 py-4">Full Name</th>
                                <th className="px-8 py-4">Email</th>
                                <th className="px-8 py-4">Department</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {empLoading ? (
                                <tr><td colSpan="5" className="py-20"><Loader /></td></tr>
                            ) : employees.length === 0 ? (
                                <tr><td colSpan="5" className="py-20 text-center text-gray-400">No employees found in the system.</td></tr>
                            ) : (
                                employees.map((emp) => (
                                    <tr key={emp.employee_id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-8 py-5 font-bold text-gray-700">{emp.employee_id}</td>
                                        <td className="px-8 py-5 text-gray-600 font-medium">{emp.name}</td>
                                        <td className="px-8 py-5 text-gray-400">{emp.email}</td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase tracking-tighter">
                                                {emp.department}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <ActionMenu
                                                emp={emp}
                                                isOpen={openMenuId === emp.employee_id}
                                                setOpenMenuId={setOpenMenuId}
                                                openMenuId={openMenuId}
                                                handleDelete={handleDeleteEmployee}
                                                markAttendance={handleMarkAttendance}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddEmployeeModal
                open={addEmpModalOpen}
                setOpen={setAddEmpModalOpen}
                onSubmit={handleAddEmployee}
            />
            <DailyAttendanceModal
                open={analyticsModalOpen}
                setOpen={setAnalyticsModalOpen}
                date={selectedDate}
                records={summaryData?.attendance_list || []}
                loading={summaryLoading}
            />
        </div>
    );
};

export default DashboardOverview;