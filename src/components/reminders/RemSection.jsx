import { useRems } from "../../context";

const RemSection = () => {
    const {
        selectedDate,
        activeReminder,
        setActiveReminder,
        currentMonth,
        setShowRemModal,
        setEditingRem,
        rems,
    } = useRems();

    return (
        <div>
            <div className="mb-4 ">
                <h3 className="h3-section">
                    Your Reminders for {format(currentMonth, "MMMM yyyy")}
                </h3>
            </div>
            <div className="space-y-2">
                <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                    <thead className="table-head">
                        <tr className="overflow-hidden">
                            <th>Vaccine</th>
                            <th>Last Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {vaccinations.slice(0, 2).map((vacc) => (
                            <tr
                                key={vacc._id}
                                className="bg-neutral100 rounded-md border border-neutral400 overflow-hidden">
                                <td className="flex gap-4">
                                    <Syringe className="text-inactive w-6 " />
                                    {vacc.name}
                                </td>
                                <td>{formatDate(vacc.date)}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Circle
                                            className={`w-3 h-3 ${
                                                statusClass[
                                                    getVaccinationStatus(vacc)
                                                ]
                                            }`}
                                        />
                                        <span className="text-neutral900">
                                            {getVaccinationStatus(vacc)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RemSection;
