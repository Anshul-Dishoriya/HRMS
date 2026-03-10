import { IconCheckCircle, IconXCircle, IconCalendar } from "../icons";
import { formatDisplayDate } from "../../utils/dateUtils";
import ModalShell from "../ui/ModalShell";
import ModalHeader from "../ui/ModalHeader";
import StatusBadge from "../ui/StatusBadge";
import EmptyState from "../ui/EmptyState";
import Loader from "../Loader";

const DailyAttendanceModal = ({ open, setOpen, date, records, loading }) => {
    const presentCount = records.filter(r => r.status === "Present").length;
    const absentCount = records.filter(r => r.status !== "Present").length;

    return (
        <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-2xl" scrollable>
            <ModalHeader
                title="Attendance Details"
                subtitle={
                    <span className="flex items-center gap-1.5">
                        <IconCalendar />
                        <span>{formatDisplayDate(date)}</span>
                    </span>
                }
                onClose={() => setOpen(false)}
            >
                {!loading && records.length > 0 && (
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-xl px-3 py-1.5">
                            <span className="text-green-300"><IconCheckCircle /></span>
                            <span className="text-green-100 text-xs font-bold">{presentCount} Present</span>
                        </div>
                        <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-xl px-3 py-1.5">
                            <span className="text-red-300"><IconXCircle /></span>
                            <span className="text-red-100 text-xs font-bold">{absentCount} Absent</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5">
                            <span className="text-indigo-100 text-xs font-bold">{records.length} Total</span>
                        </div>
                    </div>
                )}
            </ModalHeader>

            <div className="flex-1 overflow-auto">
                {loading ? (
                    <div className="py-24 flex justify-center">
                        <Loader />
                    </div>
                ) : records.length === 0 ? (
                    <EmptyState
                        message="No attendance records found"
                        subMessage="No data was recorded for this date."
                    />
                ) : (
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100">
                            <tr>
                                <th className="px-7 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Employee ID</th>
                                <th className="px-7 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Name</th>
                                <th className="px-7 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {records.map((record) => (
                                <tr key={record.employee_id} className="hover:bg-gray-50/60 transition">
                                    <td className="px-7 py-4 font-bold text-gray-700 font-mono text-xs">
                                        {record.employee_id}
                                    </td>
                                    <td className="px-7 py-4 text-gray-700 font-medium">
                                        {record.name}
                                    </td>
                                    <td className="px-7 py-4">
                                        <StatusBadge status={record.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="px-7 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
                <button
                    onClick={() => setOpen(false)}
                    className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                    Close
                </button>
            </div>
        </ModalShell>
    );
};

export default DailyAttendanceModal;