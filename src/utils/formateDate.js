export const formatDate = (
    date,
    locale = "en-US",
    options = {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }
) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString(locale, options);
};
