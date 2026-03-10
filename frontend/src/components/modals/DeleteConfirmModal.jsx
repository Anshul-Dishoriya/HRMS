import { IconTrash } from "../icons";
import ModalShell from "../ui/ModalShell";
import ModalHeader from "../ui/ModalHeader";

const DeleteConfirmModal = ({ open, setOpen, onConfirm, emp }) => {
  return (
    <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-sm">
      <ModalHeader
        title="Delete Employee"
        subtitle="This action is permanent"
        icon={<IconTrash />}
        color="red"
        onClose={() => setOpen(false)}
      />

      <div className="px-7 py-6">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 mb-5">
          <div className="w-9 h-9 bg-red-100 text-red-500 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
            {emp?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{emp?.name}</p>
            <p className="text-xs text-gray-400 font-mono">{emp?.employee_id}</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center leading-relaxed">
          Are you sure you want to permanently delete this employee? All associated attendance records will also be removed.
        </p>
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
          onClick={() => {
            onConfirm(emp.employee_id);
          }}
          className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-red-200 hover:shadow-md"
        >
          Delete
        </button>
      </div>
    </ModalShell>
  );
};

export default DeleteConfirmModal;