import { Save, X } from "lucide-react";

const WeightForm = ({
    formData,
    setFormData,
    onSave,
    onCancel,
    isEdit = false,
    showButtons = true,
    inlineMode = false,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="rounded-md border border-neutral400 bg-neutral200">
            <div>
                {/* Form head */}
                <div
                    className={` text-neutral100 font-normal text-base px-4 py-2 rounded-md ${
                        isEdit ? "bg-pinkNose" : "bg-greenEyes"
                    }`}>
                    {isEdit ? "Update Weight" : "New Weight"}
                </div>

                <div className="p-4 text-base font-light space-y-4">
                    {/* Weight & Date */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Weigt:
                                </span>
                            )}
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="grow focus:outline-none"
                                placeholder="kg"
                                required
                            />
                        </label>

                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    On:
                                </span>
                            )}

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="grow focus:outline-none"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                {showButtons && (
                    <div className="flex justify-end gap-6 text-greenEyes px-4 pb-4">
                        <button
                            type="button"
                            onClick={onSave}
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
                )}
            </div>
        </div>
    );
};

export default WeightForm;
