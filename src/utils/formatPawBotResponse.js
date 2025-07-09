export const getPawBotText = (data, petName = "your pet") => {
    if (!data) return "";

    const entries = [];

    // Dynamic field processing
    Object.keys(data).forEach((fieldType) => {
        const fieldData = data[fieldType];
        if (!fieldData || typeof fieldData !== "object") return;

        switch (fieldType) {
            case "vetVisit":
                if (fieldData.date) {
                    let text = `vet visit on ${fieldData.date}`;
                    if (fieldData.reason) text += ` for ${fieldData.reason}`;
                    if (fieldData.vet) text += ` at ${fieldData.vet}`;
                    if (fieldData.notes) text += ` (Notes: ${fieldData.notes})`;
                    entries.push(text);
                }
                break;

            case "weight":
                if (fieldData.date && fieldData.weight) {
                    entries.push(
                        `weight of ${fieldData.weight} kg on ${fieldData.date}`
                    );
                }
                break;

            case "medication":
                if (fieldData.name) {
                    let text = `medication "${fieldData.name}"`;
                    if (fieldData.dosage) text += ` (${fieldData.dosage})`;
                    if (fieldData.route) text += ` via ${fieldData.route}`;
                    if (fieldData.startDate)
                        text += ` starting ${fieldData.startDate}`;
                    if (fieldData.endDate)
                        text += ` until ${fieldData.endDate}`;
                    if (fieldData.reason) text += ` for ${fieldData.reason}`;
                    if (fieldData.comment) text += ` (${fieldData.comment})`;
                    entries.push(text);
                }
                break;

            case "vaccination":
                if (fieldData.name) {
                    let text = `vaccination "${fieldData.name}"`;
                    if (fieldData.date) text += ` on ${fieldData.date}`;
                    if (fieldData.interval)
                        text += ` (next due: ${fieldData.interval})`;
                    if (fieldData.vet) text += ` at ${fieldData.vet}`;
                    if (fieldData.comment) text += ` (${fieldData.comment})`;
                    entries.push(text);
                }
                break;

            default:
                // Handle unknown field types dynamically
                const hasValidData = Object.values(fieldData).some(
                    (val) => val && val.toString().trim() !== ""
                );
                if (hasValidData) {
                    const validFields = Object.entries(fieldData)
                        .filter(
                            ([key, value]) =>
                                value && value.toString().trim() !== ""
                        )
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ");
                    entries.push(`${fieldType} (${validFields})`);
                }
                break;
        }
    });

    if (entries.length === 0) {
        return "No valid entries found to process.";
    }

    const entriesText = entries.join(", ");
    return `For ${petName}, I have the following input: ${entriesText}. Please confirm and I'll add this to your records.`;
};
