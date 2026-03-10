import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getAttendance } from "../../api/attendenceApi";
import { IconCheckCircle, IconXCircle } from "../icons";
import ModalShell from "../ui/ModalShell";
import ModalHeader from "../ui/ModalHeader";
import StatusBadge from "../ui/StatusBadge";
import DatePickerPill from "../ui/DatePickerPill";
import EmptyState from "../ui/EmptyState";
import { formatShortDate } from "../../utils/dateUtils";
import Loader from "../Loader";

const ViewAttendanceModal = ({ open, employee, setViewAttendanceOpen }) => {
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { execute, loading } = useApi(getAttendance);

  useEffect(() => {
    if (open && employee?.employee_id) fetchAttendance();
    setStartDate("");
    setEndDate("");
  }, [open, employee]);

  const fetchAttendance = async () => {
    const data = await execute(employee.employee_id);
    if (data && data.attendance_list) {
      setAttendance(data.attendance_list);
      setStats({
        total: data.total_attendance_count,
        present: data.present_count,
        absent: data.absent_count,
      });
    }
  };

  if (!open) return null;

  const filtered = attendance.filter((item) => {
    const d = new Date(item.date);
    if (startDate && d < new Date(startDate)) return false;
    if (endDate && d > new Date(endDate)) return false;
    return true;
  });

  const hasFilter = startDate || endDate;
  const avatarLetter = employee?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <ModalShell open={open} onClose={() => setViewAttendanceOpen(false)} maxWidth="max-w-2xl" scrollable>
      <ModalHeader
        title={employee?.name}
        subtitle={
          <div>
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Attendance Record</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="bg-white/10 text-indigo-100 text-xs font-bold px-2.5 py-0.5 rounded-lg font-mono">
                {employee?.employee_id}
              </span>
              {employee?.department && (
                <span className="bg-white/10 text-indigo-100 text-xs font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wide">
                  {employee?.department}
                </span>
              )}
            </div>
          </div>
        }
        avatarLetter={avatarLetter}
        onClose={() => setViewAttendanceOpen(false)}
      >
        {!loading && stats.total > 0 && (
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5">
              <span className="text-indigo-100 text-xs font-bold">{stats.total} Total</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-xl px-3 py-1.5">
              <span className="text-green-300"><IconCheckCircle size={13} /></span>
              <span className="text-green-100 text-xs font-bold">{stats.present} Present</span>
            </div>
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-xl px-3 py-1.5">
              <span className="text-red-300"><IconXCircle size={13} /></span>
              <span className="text-red-100 text-xs font-bold">{stats.absent} Absent</span>
            </div>
          </div>
        )}
      </ModalHeader>

      {!loading && attendance.length > 0 && (
        <div className="px-7 pt-5 pb-1 flex items-end gap-3 flex-wrap flex-shrink-0">
          <DatePickerPill
            label="From"
            value={startDate}
            max={endDate || undefined}
            onChange={setStartDate}
            formatFn={formatShortDate}
          />
          <DatePickerPill
            label="To"
            value={endDate}
            min={startDate || undefined}
            onChange={setEndDate}
            formatFn={formatShortDate}
          />
          {hasFilter && (
            <button
              onClick={() => { setStartDate(""); setEndDate(""); }}
              className="text-xs font-bold text-indigo-500 hover:text-indigo-700 pb-1 transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="py-24 flex justify-center"><Loader /></div>
        ) : filtered.length === 0 ? (
          <EmptyState
            message={hasFilter ? "No records in this date range" : "No attendance records found"}
            subMessage={hasFilter ? "Try adjusting or clearing the filter" : "Attendance will appear here once marked"}
          />
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100">
              <tr>
                <th className="px-7 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">#</th>
                <th className="px-7 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                <th className="px-7 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item, idx) => (
                <tr key={item.date} className="hover:bg-gray-50/60 transition">
                  <td className="px-7 py-4 text-gray-300 text-xs font-bold">{idx + 1}</td>
                  <td className="px-7 py-4 font-semibold text-gray-700">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      weekday: "short", month: "short", day: "numeric", year: "numeric"
                    })}
                  </td>
                  <td className="px-7 py-4">
                    <StatusBadge status={item.Attendance_status} iconSize={13} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-7 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
        <button
          onClick={() => setViewAttendanceOpen(false)}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
};

export default ViewAttendanceModal;