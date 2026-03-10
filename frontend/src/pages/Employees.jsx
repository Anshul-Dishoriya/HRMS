import { useEffect, useState } from "react";
import ActionMenu from "../components/ActionMenu";
import AddEmployeeModal from "../components/AddEmployee";
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployees,
} from "../api/employeeApi";
import { useApi } from "../hooks/useApi";
import { markAttendanceApi } from "../api/attendenceApi";
import Loader from "../components/Loader";
import { IconSearch } from "../components/icons";

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const { execute, loading } = useApi(getEmployees);
  const [openMenuId, setOpenMenuId] = useState(null);

  const { execute: createEmployee } = useApi(createEmployeeApi);
  const { execute: deleteEmployee } = useApi(deleteEmployeeApi);
  const { execute: markAttendance } = useApi(markAttendanceApi);

  const handleAdd = async (form) => {
    await createEmployee(form);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await execute();
    if (Array.isArray(data)) setEmployees(data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleMarkAttendance = async (data) => {
    await markAttendance(data);
  };

  const filtered = employees.filter((emp) =>
    [emp.employee_id, emp.name, emp.email, emp.department]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employees</h2>
          <p className="text-gray-400 text-sm mt-1">
            <span className="font-semibold text-gray-500">{employees.length}</span> registered staff members
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-indigo-200 hover:shadow-md"
        >
          <span className="text-lg leading-none">+</span>
          Add Employee
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder="Search by name, ID, email or department…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              <th className="px-7 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">ID</th>
              <th className="px-7 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</th>
              <th className="px-7 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</th>
              <th className="px-7 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Department</th>
              <th className="px-7 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-24 text-center">
                  <Loader />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-24 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">👤</span>
                    <p className="text-gray-400 font-medium">
                      {search ? "No employees match your search" : "No employees found"}
                    </p>
                    <p className="text-gray-300 text-xs">
                      {search ? "Try a different keyword" : "Add your first employee to get started"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((emp, idx) => (
                <tr
                  key={emp.employee_id}
                  className={`group hover:bg-indigo-50/40 transition-colors ${idx !== filtered.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <td className="px-7 py-5">
                    <span className="font-black text-gray-800 text-xs font-mono tracking-tight">
                      {emp.employee_id}
                    </span>
                  </td>

                  <td className="px-7 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {emp.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="font-semibold text-gray-800">{emp.name}</span>
                    </div>
                  </td>

                  <td className="px-7 py-5 text-gray-400 text-sm break-words">
                    {emp.email}
                  </td>

                  <td className="px-7 py-5">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-indigo-50 text-indigo-600 uppercase tracking-wider border border-indigo-100">
                      {emp.department}
                    </span>
                  </td>

                  <td className="px-7 py-5 text-right relative">
                    <ActionMenu
                      emp={emp}
                      isOpen={openMenuId === emp.employee_id}
                      setOpenMenuId={setOpenMenuId}
                      openMenuId={openMenuId}
                      handleDelete={handleDelete}
                      markAttendance={handleMarkAttendance}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal
        open={open}
        setOpen={setOpen}
        onSubmit={(data) => handleAdd(data)}
      />
    </div>
  );
};

export default Employees;