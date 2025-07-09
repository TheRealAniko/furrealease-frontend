export const mapParcedEntryToForms = (parsedEntry = {}) => {
    console.log("Parsing GPT response:", parsedEntry);

    const { vetVisit, weight, medication, vaccination } = parsedEntry;

    const mapped = {};

    if (vetVisit) {
        mapped.vetVisit = {
            date: vetVisit?.date ?? "",
            reason: vetVisit.reason ?? "",
            vet: vetVisit.vet ?? "",
            notes: vetVisit.notes ?? "",
        };
    }

    if (weight) {
        mapped.weight = {
            date: weight.date ?? "",
            weight: weight.weight ?? "",
        };
    }

    if (medication) {
        // Nur verarbeiten wenn Pflichtfelder vorhanden sind
        if (medication.name && medication.startDate) {
            const medicationData = {
                name: medication.name,
                startDate: medication.startDate,
                reason: medication.reason ?? "",
                dosage: medication.dosage ?? "",
                endDate: medication.endDate ?? "",
                comment: medication.comment ?? "",
            };

            // Route nur hinzufügen wenn sie einen gültigen Wert hat
            if (
                medication.route &&
                ["oral", "injection", "topical", "eye drops", "other"].includes(
                    medication.route
                )
            ) {
                medicationData.route = medication.route;
            }
            // Wenn route leer ist, wird der default "oral" vom Schema verwendet

            mapped.medication = medicationData;
        } else {
            console.warn(
                "Medication data incomplete - missing name or startDate:",
                medication
            );
        }
    }

    if (vaccination) {
        // Prüfen, ob relevante Felder überhaupt ausgefüllt sind
        const hasUsefulVaccinationData =
            vaccination.name ||
            vaccination.date ||
            vaccination.interval ||
            vaccination.vet ||
            vaccination.comment;

        if (hasUsefulVaccinationData) {
            mapped.vaccination = {
                name: vaccination.name ?? "",
                date: vaccination.date ?? "",
                interval: vaccination.interval ?? "",
                vet: vaccination.vet ?? "",
                comment: vaccination.comment ?? "",
            };
        } else {
            console.warn(
                "Vaccination data incomplete - skipping:",
                vaccination
            );
        }
    }

    return mapped;
};
