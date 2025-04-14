import { useRems } from "../../context";
import RemCard from "./RemCard";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { useState } from "react";

const RemDashboard = () => {
    const { rems } = useRems();
    const [activeReminderDash, setActiveReminderDash] = useState(null);

    const today = new Date();

    const overdue = rems.filter(
        (r) => isBefore(new Date(r.date), today) && r.status !== "done"
    );

    const todayRems = rems.filter(
        (r) => isSameDay(new Date(r.date), today) && r.status !== "done"
    );

    const upcoming = rems
        .filter((r) => isAfter(new Date(r.date), today) && r.status !== "done")
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    const completed = rems.filter((r) => r.status === "done").length;
    const recurring = rems.filter(
        (r) => r.recurring && r.recurring !== "none"
    ).length;

    return (
        <div className="mt-10">
            <h3 className="h3-section mb-4">Reminders</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm text-neutral-700">
                <div className="bg-neutral-100 rounded-md px-3 py-2">
                    <p className="font-semibold text-lg">{completed}</p>
                    <p className="text-xs">Completed</p>
                </div>
                <div className="bg-neutral-100 rounded-md px-3 py-2">
                    <p className="font-semibold text-lg">{recurring}</p>
                    <p className="text-xs">Recurring</p>
                </div>
                <div className="bg-neutral-100 rounded-md px-3 py-2">
                    <p className="font-semibold text-lg">{overdue.length}</p>
                    <p className="text-xs">Overdue</p>
                </div>
                <div className="bg-neutral-100 rounded-md px-3 py-2">
                    <p className="font-semibold text-lg">{upcoming.length}</p>
                    <p className="text-xs">Coming Up</p>
                </div>
            </div>

            {overdue.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-red-600 mb-2">
                        Overdue
                    </h4>
                    <div className="space-y-2">
                        {overdue.map((rem) => (
                            <RemCard
                                key={rem._id}
                                rem={rem}
                                isActive={activeReminderDash?._id === rem._id}
                                onClick={() =>
                                    setActiveReminderDash(
                                        activeReminderDash?._id === rem._id
                                            ? null
                                            : rem
                                    )
                                }
                                compact
                            />
                        ))}
                    </div>
                </div>
            )}

            {todayRems.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-amber-600 mb-2">
                        Today
                    </h4>
                    <div className="space-y-2">
                        {todayRems.map((rem) => (
                            <RemCard key={rem._id} rem={rem} compact />
                        ))}
                    </div>
                </div>
            )}

            {upcoming.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Coming up
                    </h4>
                    <div className="space-y-2">
                        {upcoming.map((rem) => (
                            <RemCard key={rem._id} rem={rem} compact />
                        ))}
                    </div>
                </div>
            )}

            {overdue.length === 0 &&
                todayRems.length === 0 &&
                upcoming.length === 0 && (
                    <p className="text-sm text-neutral-400 italic">
                        No reminders yet
                    </p>
                )}
        </div>
    );
};

export default RemDashboard;
