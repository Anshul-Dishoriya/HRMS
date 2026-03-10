import { useEffect, useState, useRef } from "react";
import { IconCalendar, IconCheckCircle, IconXCircle } from "../icons";
import { formatDisplayDate } from "../../utils/dateUtils";
import ModalShell from "../ui/ModalShell";
import ModalHeader from "../ui/ModalHeader";

const MarkAttendanceModal = ({ open, setOpen, employee, onConfirm }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  // Ref + showPicker() trick: the native <input type="date"> is visually hidden,
  // but clicking the styled pill programmatically opens it.
  const datePickerRef = useRef(null);

  const [form, setForm] = useState({
    employee_id: "",
    date: getTodayDate(),
    Attendance_status: "",
  });

  useEffect(() => {
    if (employee) {
      setForm((prev) => ({ ...prev, employee_id: employee.employee_id }));
    }
  }, [employee]);

  if (!employee) return null;

  const avatarLetter = employee?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <ModalShell open={open} onClose={() => setOpen(false)}>
      <ModalHeader
        title={employee?.name}
        subtitle={
          <div>
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Mark Attendance</p>
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
        onClose={() => setOpen(false)}
      />

      <div className="px-7 py-6 space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
            Date
          </label>
          <div
            onClick={() => datePickerRef.current?.showPicker()}
            className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-400 hover:bg-white transition-all group"
          >
            <span className="text-indigo-400 group-hover:text-indigo-500 transition-colors">
              <IconCalendar size={16} />
            </span>
            <span className="text-sm font-semibold text-gray-700 flex-1">
              {formatDisplayDate(form.date)}
            </span>
            <input
              ref={datePickerRef}
              type="date"
              value={form.date}
              max={getTodayDate()}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
            Attendance Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, Attendance_status: "Present" })}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${form.Attendance_status === "Present"
                ? "bg-green-50 border-green-500 text-green-700 shadow-sm shadow-green-100"
                : "border-gray-200 text-gray-400 hover:border-green-200 hover:bg-green-50/50 hover:text-green-600"
                }`}
            >
              <IconCheckCircle size={18} />
              Present
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, Attendance_status: "Absent" })}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${form.Attendance_status === "Absent"
                ? "bg-red-50 border-red-500 text-red-600 shadow-sm shadow-red-100"
                : "border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50/50 hover:text-red-500"
                }`}
            >
              <IconXCircle size={18} />
              Absent
            </button>
          </div>
        </div>
      </div>

      <div className="px-7 pb-6 flex gap-3">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm transition-all"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!form.Attendance_status}
          onClick={() => onConfirm && onConfirm(form)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white py-3 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-indigo-200 hover:shadow-md"
        >
          Confirm
        </button>
      </div>
    </ModalShell>
  );
};

export default MarkAttendanceModal;