import { useRems } from "../../context";
import RemCard from "./RemCard";
import {
    isAfter,
    isBefore,
    isSameDay,
    startOfDay,
    startOfToday,
} from "date-fns";

import { useState } from "react";

const RemDashboard = () => {
    const { rems } = useRems();
    const [activeReminderDash, setActiveReminderDash] = useState(null);

    const today = startOfToday();

    const overdue = rems.filter(
        (r) =>
            isBefore(startOfDay(new Date(r.date)), today) &&
            r.status !== "done" &&
            !isSameDay(startOfDay(new Date(r.date)), today)
    );

    const todayRems = rems.filter(
        (r) =>
            isSameDay(startOfDay(new Date(r.date)), today) &&
            r.status !== "done"
    );

    const upcoming = rems
        .filter(
            (r) =>
                isAfter(startOfDay(new Date(r.date)), today) &&
                r.status !== "done"
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    const completed = rems.filter((r) => r.status === "done").length;
    const recurring = rems.filter(
        (r) => r.recurring && r.recurring !== "none"
    ).length;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Todays Reminders */}
                {todayRems.length > 0 && (
                    <div className="card-container text-neutral900">
                        <h4 className="h3-section  pb-4">Today</h4>
                        <div className="space-y-2">
                            {todayRems.map((rem) => (
                                <RemCard
                                    key={rem._id}
                                    rem={rem}
                                    isActive={
                                        activeReminderDash?._id === rem._id
                                    }
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
                {/* Overdue Reminders */}
                {overdue.length > 0 && (
                    <div className="card-container text-neutral900">
                        <h4 className="h3-section text-error pb-4">Overdue</h4>
                        <div className="space-y-2">
                            {overdue.map((rem) => (
                                <RemCard
                                    key={rem._id}
                                    rem={rem}
                                    isActive={
                                        activeReminderDash?._id === rem._id
                                    }
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

                {/* Upcomming Reminders */}
                {upcoming.length > 0 && (
                    <div className="card-container">
                        <h4 className="h3-section  text-greenEyes  pb-4">
                            Coming up
                        </h4>
                        <div className="space-y-2">
                            {upcoming.map((rem) => (
                                <RemCard
                                    key={rem._id}
                                    rem={rem}
                                    isActive={
                                        activeReminderDash?._id === rem._id
                                    }
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
            </div>

            {overdue.length === 0 &&
                todayRems.length === 0 &&
                upcoming.length === 0 && (
                    <div className="card-container bg-success/50 text-green-900 text-sm text-center italic py-4">
                        You're all caught up – no pending reminders!
                    </div>
                )}
        </>
    );
};

export default RemDashboard;
