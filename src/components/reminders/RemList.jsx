import { useRems } from "../../context";
import { useState } from "react";
import {
    format,
    isAfter,
    isToday,
    isSameDay,
    isBefore,
    isSameMonth,
    startOfMonth,
    startOfDay,
    startOfToday,
} from "date-fns";
import RemCard from "./RemCard";
import { CirclePlus } from "lucide-react";

const RemList = () => {
    const {
        selectedDate,
        activeReminder,
        setActiveReminder,
        currentMonth,
        setShowRemModal,
        setEditingRem,
        rems,
    } = useRems();
    const [showCompleted, setShowCompleted] = useState(false);
    const today = startOfToday();

    const visibleReminders = rems.filter((rem) => {
        const date = new Date(rem.date);
        const isOverdue =
            isBefore(date, today) &&
            !isBefore(currentMonth, startOfMonth(date)) && // nur ab dem Fälligkeitsmonat
            rem.status !== "done";

        const isInCurrentMonth = isSameMonth(date, currentMonth);

        return isInCurrentMonth || isOverdue;
    });
    const remindersForSelectedDate = selectedDate
        ? rems.filter((rem) => isSameDay(new Date(rem.date), selectedDate))
        : visibleReminders; // bestehende Logik

    const overdueRems = rems.filter((rem) => {
        const date = startOfDay(new Date(rem.date));
        return isBefore(date, today) && rem.status !== "done";
    });

    const todayRems = rems.filter((rem) => {
        const date = new Date(rem.date);
        return isToday(date) && rem.status !== "done";
    });

    const monthRems = rems.filter((rem) => {
        const date = new Date(rem.date);
        return (
            isSameMonth(date, today) &&
            !isToday(date) &&
            isAfter(date, today) &&
            rem.status !== "done"
        );
    });

    const doneRems = rems.filter((rem) => rem.status === "done");

    return (
        <div className="w-full p-6">
            {/* Today or selected day */}
            <h4 className="h3-section ">
                {selectedDate
                    ? `Reminders for ${format(selectedDate, "dd MMM yyyy")}`
                    : "Today"}
            </h4>

            {(selectedDate
                ? rems.filter(
                      (rem) =>
                          isSameDay(new Date(rem.date), selectedDate) &&
                          rem.status !== "done"
                  )
                : todayRems
            ).map((rem) => (
                <RemCard
                    key={rem._id}
                    rem={rem}
                    isActive={activeReminder?._id === rem._id}
                    onClick={() =>
                        setActiveReminder(
                            activeReminder?._id === rem._id ? null : rem
                        )
                    }
                />
            ))}

            {/* Leerer Zustand + Add Button (nur wenn ausgewähltes Datum) */}
            {(selectedDate
                ? rems.filter((rem) =>
                      isSameDay(new Date(rem.date), selectedDate)
                  ).length === 0
                : todayRems.length === 0) && (
                <div className="mt-2 space-y-2">
                    <p className=" text-neutral700 italic">
                        {selectedDate
                            ? "No reminders for this date."
                            : "No reminders for today."}
                    </p>
                </div>
            )}

            {/* Add Button immer sichtbar bei zukünftigem Datum */}
            {selectedDate && isAfter(selectedDate, today) && (
                <div className="mt-2 flex justify-end gap-10">
                    <button
                        onClick={() => {
                            setShowRemModal(true);
                            setEditingRem(null);
                        }}
                        className="btn-icon">
                        <CirclePlus className="w-5 h-5" />
                        Add Reminder for {format(selectedDate, "dd MMM yyyy")}
                    </button>
                </div>
            )}
            {/* Overdue Reminders */}
            {overdueRems.length > 0 && (
                <>
                    <h4 className="h3-section text-error pt-4">Overdue</h4>
                    {overdueRems.map((rem) => (
                        <RemCard
                            key={rem._id}
                            rem={rem}
                            isActive={activeReminder?._id === rem._id}
                            onClick={() =>
                                setActiveReminder(
                                    activeReminder?._id === rem._id ? null : rem
                                )
                            }
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default RemList;
