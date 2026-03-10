const ModalShell = ({ open, onClose, maxWidth = "max-w-md", scrollable = false, children }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className={`bg-white w-full ${maxWidth} rounded-3xl shadow-2xl overflow-hidden ${scrollable ? "flex flex-col max-h-[88vh]" : ""
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalShell;
