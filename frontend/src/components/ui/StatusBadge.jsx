import { IconCheckCircle, IconXCircle } from "../icons";

const StatusBadge = ({ status, iconSize = 14 }) => {
    if (status === "Present") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                <IconCheckCircle size={iconSize} />
                Present
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-100">
            <IconXCircle size={iconSize} />
            Absent
        </span>
    );
};

export default StatusBadge;
