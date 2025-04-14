import { useState } from "react";
import { usePets } from "../../context";
import { Save, X, Circle } from "lucide-react";
import { createRem } from "../../data/rem";
import { toast } from "react-toastify";
import { updateRem } from "../../data/rem";

const RemForm = ({
    onCancel,
    onSave,
    defaultValues,
    selectedDate,
    isEdit = false,
}) => {
    const { pets } = usePets();

    const formatDateForInput = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const [formData, setFormData] = useState({
        title: defaultValues?.title || "",
        petId: defaultValues?.petId || "",
        date: formatDateForInput(
            defaultValues?.date || selectedDate || new Date()
        ),
        recurring: defaultValues?.recurring || "none",
        category: defaultValues?.category || "",
        comment: defaultValues?.comment || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const cleanedData = { ...formData };

            if (!cleanedData.petId) delete cleanedData.petId;
            if (
                !cleanedData.category ||
                !cleanedData.title ||
                !cleanedData.date
            ) {
                toast.error("Please fill all required fields.");
                return;
            }

            onSave?.(cleanedData); // ➤ Rückgabe an Parent
        } catch (err) {
            console.error("SAVE ERROR", err.message);
            toast.error(err.message);
        }
    };

    return (
        <div>
            <form>
                <div className="p-4 text-base font-light space-y-4">
                    {/* title & pet */}
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <label className="flex input-small w-full">
                            {/* {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Title:
                                </span>
                            )} */}
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="grow"
                                required
                            />
                        </label>
                        <label className="flex input-small w-full">
                            <select
                                name="petId"
                                value={formData.petId}
                                onChange={handleChange}
                                className="w-full">
                                <option value="">Pet related (optional)</option>
                                {pets.map((pet) => (
                                    <option key={pet._id} value={pet._id}>
                                        {pet.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* Due Date & recurring */}
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <label className="flex input-small w-full">
                            {/* {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Due:
                                </span>
                            )} */}
                            <input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Due:"
                                className="grow"
                                required
                            />
                        </label>
                        <label className="flex input-small w-full">
                            <select
                                name="recurring"
                                value={formData.recurring}
                                onChange={handleChange}
                                className="w-full">
                                <option value="none">No Repeat</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </label>
                    </div>

                    {/* Category & note */}
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <label className="flex input-small w-full">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full">
                                <option value="">Select...</option>
                                <option value="medication">Medication</option>
                                <option value="vet">Vet</option>
                                <option value="birthday">Birthday</option>
                                <option value="supply">Supply</option>
                                <option value="grooming">Grooming</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label className="flex input-small w-full">
                            {/* {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Comment:
                                </span>
                            )} */}
                            <input
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                placeholder="Comment"
                                className="grow"
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-6 text-greenEyes px-4 pb-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="btn-icon">
                            <Save className="w-5 h-5" /> Save
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-icon text-error hover:text-[#A24140]">
                            <X className="w-5 h-5" /> Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RemForm;
