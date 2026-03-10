const EmptyState = ({ icon = "📋", message, subMessage }) => (
    <div className="py-24 flex flex-col items-center justify-center text-center px-8">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
            {icon}
        </div>
        <p className="text-gray-500 font-medium">{message}</p>
        {subMessage && <p className="text-gray-400 text-sm mt-1">{subMessage}</p>}
    </div>
);

export default EmptyState;
