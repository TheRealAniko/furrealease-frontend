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

export const getDueDate = (vaccination) => {
    if (!vaccination?.date || !vaccination?.interval) return null;

    const date = new Date(vaccination.date);
    date.setFullYear(date.getFullYear() + vaccination.interval);

    return date.toISOString().split("T")[0]; // oder direkt formatiert
};
