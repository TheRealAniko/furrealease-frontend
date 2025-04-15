import { Save, X } from "lucide-react";

const WeightForm = ({
    formData,
    setFormData,
    onSave,
    onCancel,
    isEdit = false,
    showButtons = true,
}) => {
    return (
        <>
            <td>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            weight: e.target.value,
                        }))
                    }
                    className="input input-bordered w-full text-sm"
                    placeholder="kg"
                    required
                />
            </td>
            <td>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            date: e.target.value,
                        }))
                    }
                    className="input input-bordered w-full text-sm"
                    required
                />
            </td>
            <td></td>
            {/* Buttons */}
            {showButtons && (
                <>
                    <td>
                        <button onClick={onSave} className="btn-icon">
                            <Save className="w-5 h-5" /> Save
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={onCancel}
                            className="btn-icon text-error hover:text-[#A24140]">
                            <X className="w-5 h-5" /> Cancel
                        </button>
                    </td>
                </>
            )}
        </>
    );
};

export default WeightForm;
