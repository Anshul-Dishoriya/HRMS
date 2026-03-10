const SectionHeader = ({ title, subtitle, action }) => (
    <div className="flex justify-between items-end">
        <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
        {action && (
            <button
                onClick={action.onClick}
                className={action.className || "bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm flex items-center gap-2"}
            >
                {action.label}
            </button>
        )}
    </div>
);

export default SectionHeader;
