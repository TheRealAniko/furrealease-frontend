import { Save, X } from "lucide-react";

const NoteForm = ({
    formData,
    setFormData,
    onSave,
    onCancel,
    isEdit = false,
    showButtons = true,
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
                    {isEdit ? "Update Observation" : "New Observation"}
                </div>
                <div className="p-4 text-base font-light space-y-4">
                    {/* Observation */}
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="grow input-small"
                            placeholder="Enter your note"
                            rows={2}
                        />
                    </div>
                    {/* Category & Date */}
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Category:
                                </span>
                            )}
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="select select-bordered w-full text-sm">
                                <option value="" disabled>
                                    Select category
                                </option>
                                <option value="Symptom">Symptom</option>
                                <option value="Behavior">Behavior</option>
                                <option value="Feeding">Feeding</option>
                                <option value="Sleep">Sleep</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <label className="input-small w-full flex">
                            <span className="text-neutral400 pr-4">On:</span>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </label>
                    </div>
                </div>
                {showButtons && (
                    <div className="flex justify-end gap-6 text-greenEyes px-4 pb-4">
                        <button onClick={onSave} className="btn-icon">
                            <Save className="w-5 h-5" /> Save
                        </button>
                        <button
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
export default NoteForm;
