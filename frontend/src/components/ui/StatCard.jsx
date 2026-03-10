const StatCard = ({ label, value, icon, stripe, iconBg, iconColor, loading }) => (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col gap-4 p-6 pt-7 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div className={`absolute top-0 left-0 right-0 h-[3px] ${stripe}`} />

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
            {icon}
        </div>

        <div className="text-5xl font-black leading-none tracking-tight text-gray-900">
            {loading ? (
                <span className="text-2xl text-gray-300 animate-pulse">—</span>
            ) : (
                value
            )}
        </div>

        <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {label}
        </div>
    </div>
);

export default StatCard;
