import { Save, X } from "lucide-react";
import { useState } from "react";

const MedForm = ({
    med,
    handleChange,
    onSave,
    onCancel,
    isEdit = false,
    showButtons = true,
}) => {
    const [isOngoingUI, setIsOngoingUI] = useState(false);

    return (
        <div className="rounded-md border border-neutral400 bg-neutral200">
            <div>
                <div
                    className={` text-neutral100 font-normal text-base px-4 py-2 rounded-md ${
                        isEdit ? "bg-pinkNose" : "bg-greenEyes"
                    }`}>
                    {isEdit ? "Update Medication" : "New Medication"}
                </div>

                <div className="p-4 text-base font-light space-y-4">
                    {/* Name + Reason */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Medication:
                                </span>
                            )}
                            <input
                                name="name"
                                value={med.name}
                                onChange={handleChange}
                                placeholder="Medication name"
                                className="grow focus:outline-none"
                            />
                        </label>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Reason:
                                </span>
                            )}
                            <input
                                name="reason"
                                value={med.reason}
                                onChange={handleChange}
                                placeholder="Reason"
                                className="grow focus:outline-none"
                            />
                        </label>
                    </div>

                    {/* Dosage + Route */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Dosage:
                                </span>
                            )}
                            <input
                                name="dosage"
                                value={med.dosage}
                                onChange={handleChange}
                                placeholder="Dosage"
                                className="grow focus:outline-none"
                            />
                        </label>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Select method:
                                </span>
                            )}
                            <select
                                name="route"
                                value={med.route}
                                onChange={handleChange}
                                className="grow focus:outline-none">
                                <option value="">Select method</option>
                                <option value="oral">oral</option>
                                <option value="injection">injection</option>
                                <option value="topical">topical</option>
                                <option value="eye drops">eye drops</option>
                                <option value="other">other</option>
                            </select>
                        </label>
                    </div>

                    {/* StartDate + EndDate + Ongoing Toggle */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        {/* Start Date */}
                        <label className="input-small w-full flex">
                            <span className="text-neutral400 pr-4">Start:</span>
                            <input
                                type="date"
                                name="startDate"
                                value={med.startDate}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </label>

                        {/* End Date – nur wenn nicht ongoing */}
                        {!isOngoingUI && (
                            <label className="input-small w-full flex">
                                <span className="text-neutral400 pr-4">
                                    End:
                                </span>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={med.endDate}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none"
                                />
                            </label>
                        )}

                        {/* Ongoing Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsOngoingUI((prev) => !prev)}
                            className={`px-3 py-2 text-xs rounded-md border text-nowrap ${
                                isOngoingUI
                                    ? "bg-greenEyes text-white border-greenEyes"
                                    : "bg-white text-neutral800 border-neutral400"
                            }`}>
                            {isOngoingUI ? "Set end date" : "No end date"}
                        </button>
                    </div>

                    {/* Comment */}
                    <input
                        name="comment"
                        value={med.comment}
                        onChange={handleChange}
                        placeholder="Comment"
                        className="input-small w-full"
                    />
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

export default MedForm;
