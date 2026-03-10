import { useRef } from "react";
import { IconCalendar } from "../icons";

const DatePickerPill = ({ label, value, onChange, min, max, formatFn }) => {
    // Ref + showPicker() trick: the native <input type="date"> is visually hidden,
    // but clicking the styled pill programmatically opens it.
    const ref = useRef(null);

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {label}
                </label>
            )}
            <div
                onClick={() => ref.current?.showPicker()}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer hover:border-indigo-400 hover:bg-white transition-all group min-w-[140px]"
            >
                <span className="text-indigo-400 group-hover:text-indigo-500 transition-colors">
                    <IconCalendar />
                </span>
                <span className={`text-xs font-semibold ${value ? "text-gray-700" : "text-gray-300"}`}>
                    {value ? (formatFn ? formatFn(value) : value) : "Pick a date"}
                </span>
                <input
                    ref={ref}
                    type="date"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
                />
            </div>
        </div>
    );
};

export default DatePickerPill;
