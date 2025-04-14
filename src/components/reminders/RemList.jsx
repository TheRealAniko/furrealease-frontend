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
} from "date-fns";
import RemCard from "./RemCard";

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
    const today = new Date();
    // const futureReminders = rems.filter(
    //     (rem) =>
    //         isToday(new Date(rem.date)) || isAfter(new Date(rem.date), today)
    // );

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
        const date = new Date(rem.date);
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
        <div className="w-full">
            {/* <div className="mb-4 ">
                <h3 className="h3-section">
                    Your Reminders for {format(currentMonth, "MMMM yyyy")}
                </h3>
            </div> */}
            {overdueRems.length > 0 && (
                <>
                    <div className=" bg-error text-neutral100 font-normal text-base px-4 py-2 rounded-md">
                        Overdue
                    </div>
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
            <div className="bg-primary text-neutral100 font-normal text-base px-4 py-2 rounded-md">
                {selectedDate
                    ? `Reminders for ${format(selectedDate, "dd MMM yyyy")}`
                    : "Today"}
            </div>

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
                    <p className="text-sm text-neutral-500 italic">
                        {selectedDate
                            ? "No reminders for this date."
                            : "No reminders for today."}
                    </p>
                </div>
            )}

            {/* Add Button immer sichtbar bei zukünftigem Datum */}
            {selectedDate && isAfter(selectedDate, today) && (
                <div className="mt-2">
                    <button
                        onClick={() => {
                            setShowRemModal(true);
                            setEditingRem(null);
                        }}
                        className="text-sm text-primary underline">
                        + Add Reminder for {format(selectedDate, "dd MMM yyyy")}
                    </button>
                </div>
            )}

            {doneRems.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowCompleted((prev) => !prev)}
                        className="bg-inactive text-neutral100 font-normal text-base px-4 py-2 rounded-md w-full text-left">
                        {showCompleted ? "Hide completed" : "Show completed"}
                    </button>

                    {showCompleted && (
                        <div className="mt-2 space-y-2">
                            {doneRems.map((rem) => (
                                <RemCard
                                    key={rem._id}
                                    rem={rem}
                                    isActive={activeReminder?._id === rem._id}
                                    onClick={() =>
                                        setActiveReminder(
                                            activeReminder?._id === rem._id
                                                ? null
                                                : rem
                                        )
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* {remindersForSelectedDate.length > 0 ? (
                <div className="space-y-2">
                    {remindersForSelectedDate.map((rem) => (
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
                </div>
            ) : (
                <p>no reminders</p>
            )} */}
        </div>
    );
};

export default RemList;
