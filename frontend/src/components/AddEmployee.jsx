import { useState } from "react";
import { IconUser } from "./icons";
import ModalShell from "./ui/ModalShell";
import ModalHeader from "./ui/ModalHeader";
import DepartmentCombobox from "./ui/DepartmentCombobox";

const AddEmployeeModal = ({ open, setOpen, onSubmit }) => {
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.employee_id.trim()) newErrors.employee_id = "Employee ID is required";
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Valid email required";
    if (!form.department.trim()) newErrors.department = "Department required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit && onSubmit(form);
    setOpen(false);
    setForm({ employee_id: "", name: "", email: "", department: "" });
  };

  const inputClass = (key) =>
    `w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${errors[key] ? "border-red-300 bg-red-50" : "border-gray-200"}`;

  return (
    <ModalShell open={open} onClose={() => setOpen(false)}>
      <ModalHeader
        title="Add New Employee"
        subtitle="Fill in the details below to register"
        icon={<IconUser />}
        onClose={() => setOpen(false)}
      />

      <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Employee ID</label>
          <input
            type="text"
            placeholder="e.g. E001"
            value={form.employee_id}
            onChange={(e) => { setForm({ ...form, employee_id: e.target.value }); if (errors.employee_id) setErrors({ ...errors, employee_id: null }); }}
            className={inputClass("employee_id")}
          />
          {errors.employee_id && <p className="text-xs text-red-500 font-medium">{errors.employee_id}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Alice Johnson"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: null }); }}
            className={inputClass("name")}
          />
          {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
          <input
            type="email"
            placeholder="e.g. alice@company.com"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: null }); }}
            className={inputClass("email")}
          />
          {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
        </div>

        <DepartmentCombobox
          value={form.department}
          error={errors.department}
          onChange={(val) => {
            setForm({ ...form, department: val });
            if (errors.department) setErrors({ ...errors, department: null });
          }}
        />

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-indigo-200 hover:shadow-md"
          >
            Create Employee
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default AddEmployeeModal;