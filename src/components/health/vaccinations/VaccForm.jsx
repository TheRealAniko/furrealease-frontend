import { Save, X, Circle } from "lucide-react";
import { getVaccinationStatus } from "../../../utils/vaccStatus";

const VaccForm = ({
    vacc,
    handleChange,
    onSave,
    onCancel,
    isEdit = false,
    showButtons = true,
}) => {
    const statusClass = {
        fresh: "text-success fill-success",
        dueSoon: "text-warning fill-warning",
        overdue: "text-error fill-error",
    };

    return (
        <div>
            <div>
                <div
                    className={` text-neutral100 font-normal text-base px-4 py-2 rounded-md ${
                        isEdit ? "bg-pinkNose" : "bg-greenEyes"
                    }`}>
                    {isEdit ? "Update Vaccination" : "New Vaccination"}
                </div>

                <div className="p-4 text-base font-light space-y-4">
                    {/* Due Date & Status */}
                    {isEdit && (
                        <div className="flex justify-end items-center gap-2">
                            <Circle
                                className={`w-3 h-3 ${
                                    statusClass[getVaccinationStatus(vacc)]
                                }`}
                            />
                            <span className="text-neutral900">
                                {getVaccinationStatus(vacc)}
                            </span>
                        </div>
                    )}

                    {/* Vaccine + Date */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Vaccine:
                                </span>
                            )}
                            <input
                                name="name"
                                value={vacc.name}
                                onChange={handleChange}
                                placeholder="Vaccine name"
                                className="grow focus:outline-none"
                            />
                        </label>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    On:
                                </span>
                            )}
                            <input
                                name="date"
                                type="date"
                                value={vacc.date}
                                onChange={handleChange}
                                placeholder="On:"
                                className="grow focus:outline-none"
                            />
                        </label>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Interval:
                                </span>
                            )}
                            <input
                                name="interval"
                                type="Number"
                                value={vacc.interval}
                                onChange={handleChange}
                                placeholder="Repeat (in years):"
                                className="grow focus:outline-none"
                            />
                        </label>
                    </div>

                    {/* Vet */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Vet:
                                </span>
                            )}
                            <input
                                name="vet"
                                value={vacc.vet}
                                onChange={handleChange}
                                placeholder="Vet"
                                className="grow focus:outline-none"
                            />
                        </label>

                        {/* Comment */}
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Comment:
                                </span>
                            )}
                            <input
                                name="comment"
                                value={vacc.comment}
                                onChange={handleChange}
                                placeholder="Comment"
                                className="grow focus:outline-none"
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

export default VaccForm;
