import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    startOfDay,
    endOfWeek,
    addDays,
    addMonths,
    subMonths,
    format,
    isSameMonth,
    isSameDay,
    isToday,
} from "date-fns";
import { useState } from "react";
import { useRems } from "../../context";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RemCalendar = () => {
    const {
        selectedDate,
        setSelectedDate,
        currentMonth,
        setCurrentMonth,
        rems,
        setActiveReminder,
    } = useRems();

    const goToPrevMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
    };
    const goToNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    const generateCalendarDays = () => {
        const start = startOfWeek(startOfMonth(currentMonth), {
            weekStartsOn: 1,
        });
        const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

        const days = [];
        let day = start;

        while (day <= end) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    };
    const getReminderClass = (day) => {
        const today = new Date();

        const remForDay = rems?.filter(
            (rem) =>
                rem.status !== "done" &&
                isSameDay(startOfDay(new Date(rem.date)), startOfDay(day))
        );

        if (remForDay?.length > 0) {
            const hasOverdue = remForDay.some(
                (rem) => new Date(rem.date) < today
            );
            return hasOverdue ? "border border-error" : "border border-primary";
        }

        return "";
    };

    const handleDayClick = (day) => {
        if (isSameDay(day, selectedDate)) {
            setSelectedDate(null);
            setActiveReminder(null);
        } else {
            setSelectedDate(day);
            setActiveReminder(null); // ⬅️ Cards sollen **nicht** geöffnet werden
        }
    };

    return (
        <div>
            <div className="modal-card p-6">
                {/* Navigation: Months */}
                <div className="flex justify-between items-center mb-4">
                    <button onClick={goToPrevMonth}>
                        <ChevronLeft />
                    </button>
                    <h3 className="text-neutral900">
                        {format(currentMonth, "MMMM yyyy")}
                    </h3>
                    <button onClick={goToNextMonth}>
                        {" "}
                        <ChevronRight />
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 text-center text-xs font-light pb-2 gap-4">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                        <div
                            key={day + index}
                            onClick={() => handleDayClick(day)}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days*/}
                <div className="grid grid-cols-7 text-center gap-4 w-96 ">
                    {generateCalendarDays().map((day, index) => (
                        <div
                            key={index}
                            className={`p-2 border rounded-full text-sm cursor-pointer ${
                                isSameMonth(day, currentMonth)
                                    ? ""
                                    : "text-gray-400 bg-neutral200"
                            } ${
                                isSameDay(day, selectedDate)
                                    ? "bg-darkPrimary rounded-full  text-neutral100"
                                    : ""
                            } ${getReminderClass(day)} ${
                                isToday(day) ? "bg-primary text-neutral100" : ""
                            }

`}
                            onClick={() =>
                                isSameDay(selectedDate, day)
                                    ? setSelectedDate(null)
                                    : setSelectedDate(day)
                            }>
                            {format(day, "d")}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => {
                        setCurrentMonth(new Date());
                        setSelectedDate(null); // reset → volle Monatsansicht
                        setActiveReminder(null); // Details auch zurücksetzen
                    }}
                    className="mt-4 px-6 py-1 text-sm rounded-full border border-primary text-primary hover:border-darkPrimary hover:text-darkPrimary block mx-auto">
                    Today
                </button>
            </div>
        </div>
    );
};

export default RemCalendar;
