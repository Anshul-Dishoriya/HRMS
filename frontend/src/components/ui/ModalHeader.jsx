import { IconX } from "../icons";

const colorMap = {
    indigo: "bg-indigo-600",
    red: "bg-red-500",
};

const subtitleColorMap = {
    indigo: "text-indigo-200",
    red: "text-red-200",
};

const ModalHeader = ({ title, subtitle, icon, avatarLetter, color = "indigo", onClose, children }) => {
    const bg = colorMap[color] || colorMap.indigo;
    const subtitleColor = subtitleColorMap[color] || subtitleColorMap.indigo;

    return (
        <div className={`relative ${bg} px-7 pt-7 pb-6 flex-shrink-0`}>
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute right-10 bottom-0 w-20 h-20 bg-white/[0.04] rounded-full pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                            {icon}
                        </div>
                    )}
                    {avatarLetter && !icon && (
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {avatarLetter}
                        </div>
                    )}
                    <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                        {subtitle && <p className={`${subtitleColor} text-xs mt-0.5`}>{subtitle}</p>}
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    {avatarLetter && icon && (
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {avatarLetter}
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                        <IconX />
                    </button>
                </div>
            </div>

            {children && <div className="relative z-10 mt-5">{children}</div>}
        </div>
    );
};

export default ModalHeader;
