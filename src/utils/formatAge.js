export const formatAge = (birthdate) => {
    const now = new Date();
    const birth = new Date(birthdate);

    const diffMs = now - birth;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths =
        now.getMonth() -
        birth.getMonth() +
        12 * (now.getFullYear() - birth.getFullYear());
    const diffYears = now.getFullYear() - birth.getFullYear();

    if (diffYears > 1) return `${diffYears} years old`;
    if (diffYears === 1) return `1 year old`;
    if (diffMonths > 1) return `${diffMonths} months old`;
    if (diffMonths === 1) return `1 month old`;
    if (diffDays > 1) return `${diffDays} days old`;
    if (diffDays === 1) return `1 day old`;

    return `Newborn`;
};
