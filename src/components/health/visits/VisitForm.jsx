import { Save, X } from "lucide-react";
import VaccForm from "../vaccinations/VaccForm";
import MedForm from "../medications/MedForm";
import WeightForm from "../weight/WeightForm"; // ✅ Import korrekt

const VisitForm = ({
    visit,
    handleChange,
    onSave,
    onCancel,
    isEdit = false,
    addVacc,
    setAddVacc,
    vaccData,
    setVaccData,
    addMed,
    setAddMed,
    medData,
    setMedData,
    addWeight, // ✅ hinzugefügt
    setAddWeight, // ✅ hinzugefügt
    weightData,
    setWeightData,
}) => {
    return (
        <div className="rounded-md border border-neutral400 bg-neutral200">
            <form>
                <div
                    className={`text-neutral100 font-normal text-base px-4 py-2 rounded-md ${
                        isEdit ? "bg-pinkNose" : "bg-greenEyes"
                    }`}>
                    {isEdit
                        ? "Update Vet Visit Record"
                        : "New Vet Visit Record"}
                </div>

                <div className="p-4 text-base font-light space-y-4">
                    {/* Reason + Date */}
                    <div
                        className={`flex flex-col ${
                            isEdit ? "space-y-4" : "md:flex-row md:gap-4"
                        }`}>
                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Reason:
                                </span>
                            )}
                            <input
                                name="reason"
                                value={visit.reason}
                                onChange={handleChange}
                                placeholder="Visit reason"
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
                                value={visit.date}
                                onChange={handleChange}
                                placeholder="On:"
                                className="grow focus:outline-none"
                            />
                        </label>
                    </div>

                    {/* Vet + Notes */}
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
                                value={visit.vet}
                                onChange={handleChange}
                                placeholder="Vet"
                                className="grow focus:outline-none"
                            />
                        </label>

                        <label className="flex input-small w-full">
                            {isEdit && (
                                <span className="text-neutral400 pr-4">
                                    Note:
                                </span>
                            )}
                            <input
                                name="notes"
                                value={visit.notes}
                                onChange={handleChange}
                                placeholder="Note"
                                className="grow focus:outline-none"
                            />
                        </label>
                    </div>

                    {/* Checkboxes für Subdaten */}
                    {!isEdit && (
                        <div className="flex gap-4 mt-4 px-4">
                            <label className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={addWeight}
                                    onChange={() => setAddWeight(!addWeight)}
                                />
                                Add Weight
                            </label>
                            <label className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={addMed}
                                    onChange={() => setAddMed(!addMed)}
                                />
                                Add Medication
                            </label>
                            <label className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={addVacc}
                                    onChange={() => setAddVacc(!addVacc)}
                                />
                                Add Vaccination
                            </label>
                        </div>
                    )}

                    {/* Subformulare */}
                    {addWeight && (
                        <div className="mt-4">
                            <WeightForm
                                formData={weightData}
                                setFormData={setWeightData}
                                onSave={() => {}}
                                onCancel={() => setAddWeight(false)}
                                showButtons={false}
                            />
                        </div>
                    )}
                    {addMed && (
                        <MedForm
                            med={medData}
                            handleChange={(e) =>
                                setMedData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            showButtons={false}
                        />
                    )}
                    {addVacc && (
                        <VaccForm
                            vacc={vaccData}
                            handleChange={(e) =>
                                setVaccData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            showButtons={false}
                        />
                    )}
                </div>

                {/* Save / Cancel */}
                <div className="flex justify-end gap-6 text-greenEyes px-4 pb-4">
                    <button type="button" onClick={onSave} className="btn-icon">
                        <Save className="w-5 h-5" /> Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-icon text-error hover:text-[#A24140]">
                        <X className="w-5 h-5" /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VisitForm;
