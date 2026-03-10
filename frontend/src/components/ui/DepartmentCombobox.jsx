import { useState, useRef, useEffect } from "react";
import { IconChevron } from "../icons";

const DEPARTMENTS = ["Engineering", "HR", "Finance", "Marketing", "Operations", "Design", "Sales"];

const DepartmentCombobox = ({ value, error, onChange }) => {
    const [open, setOpen] = useState(false);
    const [inputVal, setInputVal] = useState(value || "");
    const wrapperRef = useRef(null);

    useEffect(() => { setInputVal(value || ""); }, [value]);

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = DEPARTMENTS.filter((d) =>
        d.toLowerCase().includes(inputVal.toLowerCase())
    );

    const handleInput = (e) => {
        setInputVal(e.target.value);
        onChange(e.target.value);
        setOpen(true);
    };

    const handleSelect = (dept) => {
        setInputVal(dept);
        onChange(dept);
        setOpen(false);
    };

    return (
        <div className="space-y-1.5" ref={wrapperRef}>
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                Department
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={inputVal}
                    onChange={handleInput}
                    onFocus={() => setOpen(true)}
                    placeholder="Type or select a department…"
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${error ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                />
                <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setOpen((o) => !o); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                    <IconChevron open={open} />
                </button>

                {open && (
                    <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                        {filtered.length === 0 ? (
                            <div className="px-4 py-3 text-xs text-gray-400 italic">
                                No match — press Enter to use "{inputVal}"
                            </div>
                        ) : (
                            filtered.map((dept) => (
                                <button
                                    key={dept}
                                    type="button"
                                    onMouseDown={() => handleSelect(dept)}
                                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition hover:bg-indigo-50 hover:text-indigo-600 ${inputVal === dept ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
                                >
                                    {dept}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};

export default DepartmentCombobox;
