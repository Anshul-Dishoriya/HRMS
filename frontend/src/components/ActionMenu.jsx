import { useState } from "react";
import { MoreVertical } from "lucide-react";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import MarkAttendanceModal from "./modals/MarkAttendanceModal";
import ViewAttendanceModal from "./modals/ViewAttendanceModal";

const ActionMenu = ({
  emp,
  isOpen,
  setOpenMenuId,
  openMenuId,
  handleDelete,
  markAttendance,
}) => {
  const [viewAttendanceOpen, setViewAttendanceOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [markAttendanceOpen, setMarkAttendanceOpen] = useState(false);

  const toggleMenu = () => {
    if (openMenuId === emp.employee_id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(emp.employee_id);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleMenu} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <MoreVertical size={18} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-75">
          <button
            onClick={() => {
              setMarkAttendanceOpen(true);
              setOpenMenuId(null);
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
          >
            Mark Attendance
          </button>

          <button
            onClick={() => {
              setViewAttendanceOpen(true);
              setOpenMenuId(null);
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors border-t border-gray-50"
          >
            View Attendance
          </button>

          <button
            onClick={() => {
              setDeleteOpen(true);
              setOpenMenuId(null);
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-bold transition-colors border-t border-gray-50"
          >
            Delete Employee
          </button>
        </div>
      )}

      <DeleteConfirmModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        emp={emp}
        onConfirm={(id) => {
          handleDelete(id);
          setDeleteOpen(false);
        }}
      />

      <MarkAttendanceModal
        open={markAttendanceOpen}
        setOpen={setMarkAttendanceOpen}
        employee={emp}
        onConfirm={(data) => {
          markAttendance(data);
          setMarkAttendanceOpen(false);
        }}
      />

      <ViewAttendanceModal
        open={viewAttendanceOpen}
        setViewAttendanceOpen={setViewAttendanceOpen}
        employee={emp}
      />
    </div>
  );
};

export default ActionMenu;
