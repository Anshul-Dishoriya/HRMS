export const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export const formatShortDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
};
