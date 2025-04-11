export const getVaccinationStatus = (vaccinations) => {
    const today = new Date();
    const lastDate = new Date(vaccinations.date);
    const intervalYears = vaccinations.interval || 1;

    const nextDue = new Date(lastDate);
    nextDue.setFullYear(lastDate.getFullYear() + intervalYears);

    const daysUntilDue = (nextDue - today) / (1000 * 60 * 60 * 24);

    if (daysUntilDue < 0) return "overdue";
    if (daysUntilDue <= 30) return "dueSoon";
    return "fresh";
};
