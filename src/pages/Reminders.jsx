import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useInView } from "react-intersection-observer";

import { useRems } from "../context/index.js";
import { usePets } from "../context/index.js";
import AddRemBtn from "../components/ui/AddRemBtn";
import RemCalendar from "../components/reminders/RemCalendar.jsx";
import RemList from "../components/reminders/RemList.jsx";
import RemModal from "../components/reminders/RemModal";
import RemCard from "../components/reminders/RemCard";
import { CirclePlus } from "lucide-react";

const Reminders = () => {
    const { showRemModal, setShowRemModal, selectedDate, rems, refreshRems } =
        useRems();
    const { pets, setPets } = usePets();

    const [searchParams] = useSearchParams();
    const addReminder = searchParams.get("addReminder") === "true";

    const [openWithAdd, setOpenWithAdd] = useState(false);

    useEffect(() => {
        if (addReminder) {
            setShowRemModal(true);
            setOpenWithAdd(true);
        }
    }, [addReminder, setShowRemModal]);

    useEffect(() => {
        if (!addReminder) {
            setShowRemModal(false);
            setOpenWithAdd(false);
        }
    }, [addReminder]);

    const [activeReminderTop, setActiveReminderTop] = useState(null);
    const [activeReminderBottom, setActiveReminderBottom] = useState(null);

    const [filter, setFilter] = useState("active"); // 'active' | 'done' | 'all'
    const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [petFilter, setPetFilter] = useState("all");

    const filteredRems = rems.filter((rem) => {
        console.log(
            "rem.petId",
            typeof rem.petId,
            rem.petId,
            "=== petFilter",
            petFilter
        );

        const statusMatch =
            filter === "done"
                ? rem.status === "done"
                : filter === "active"
                ? rem.status !== "done"
                : true;

        const categoryMatch =
            categoryFilter === "all" || rem.category === categoryFilter;
        const petMatch =
            petFilter === "all" ||
            (petFilter === "none" && !rem.petId) ||
            rem.petId?.toString() === petFilter;

        return statusMatch && categoryMatch && petMatch;
    });

    const sortedRems = [...filteredRems].sort((a, b) =>
        sortDir === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date)
    );
    const petsWithReminders = pets?.filter((pet) =>
        rems.some((rem) => rem.petId === pet._id)
    );

    const pageSize = 1;
    const [page, setPage] = useState(1);

    // Nur Reminder, die gezeigt werden sollen
    const visibleRems = sortedRems.slice(0, page * pageSize);

    // Observer-Ref
    const { ref, inView } = useInView();

    // bei Sichtbarkeit -> nächste Page laden
    useEffect(() => {
        if (inView && visibleRems.length < sortedRems.length) {
            const timeout = setTimeout(() => {
                setPage((prev) => prev + 1);
            }, 300); // 300ms künstliche Verzögerung

            return () => clearTimeout(timeout);
        }
    }, [inView, visibleRems, sortedRems]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Reminders</h2>
                <button
                    onClick={() => {
                        setOpenWithAdd(true);
                        setShowRemModal(true);
                        console.log("hello");
                    }}
                    className="btn-icon">
                    <CirclePlus className="w-5 h-5" />
                    Add Reminder
                </button>
            </div>

            {/* Calendar & Upper Reminder Section */}
            <div className="card-container flex gap-8 mb-10">
                <RemCalendar />
                <div className="relative w-full">
                    <RemList
                        activeReminder={activeReminderTop}
                        setActiveReminder={setActiveReminderTop}
                    />
                    {showRemModal && (
                        <RemModal
                            selectedDate={selectedDate}
                            openWithAdd={openWithAdd}
                            onClose={() => {
                                setShowRemModal(false);
                                setOpenWithAdd(false);
                            }}
                        />
                    )}
                </div>
            </div>

            {/* All Reminders Section */}
            <div className="card-container flex flex-col gap-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter("active")}
                            className={`${
                                filter === "active"
                                    ? "btn-primary-xs"
                                    : "btn-outline-xs"
                            }`}>
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("done")}
                            className={`btn ${
                                filter === "done"
                                    ? "btn-primary-xs"
                                    : "btn-outline-xs"
                            }`}>
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("all")}
                            className={`btn ${
                                filter === "all"
                                    ? "btn-primary-xs"
                                    : "btn-outline-xs"
                            }`}>
                            All
                        </button>
                    </div>

                    <div className="flex gap-2 text-xs items-center">
                        {" "}
                        Filter by:
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="btn-outline-xs">
                            <option value="all">All Categories</option>
                            <option value="vet">Vet</option>
                            <option value="medication">Medication</option>
                            <option value="grooming">Grooming</option>
                            <option value="birthday">Birthday</option>
                            <option value="other">Other</option>
                        </select>
                        <select
                            value={petFilter}
                            onChange={(e) => setPetFilter(e.target.value)}
                            className="btn-outline-xs">
                            <option value="all">All Pets</option>
                            {petsWithReminders?.map((pet) => (
                                <option key={pet._id} value={pet._id}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>
                        Sort:
                        <button
                            onClick={() =>
                                setSortDir(sortDir === "asc" ? "desc" : "asc")
                            }
                            className="btn-outline-xs">
                            {sortDir === "asc"
                                ? "Earliest first"
                                : "Latest first"}
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {visibleRems.map((rem) => (
                        <RemCard
                            key={rem._id}
                            rem={rem}
                            isActive={activeReminderBottom?._id === rem._id}
                            onClick={() =>
                                setActiveReminderBottom(
                                    activeReminderBottom?._id === rem._id
                                        ? null
                                        : rem
                                )
                            }
                        />
                    ))}

                    {/* Lade-Trigger */}
                    {visibleRems.length < sortedRems.length && (
                        <div
                            ref={ref}
                            className="py-6 text-center text-sm text-neutral-400">
                            <span className="animate-pulse">
                                Loading more reminders...
                            </span>
                        </div>
                    )}

                    {sortedRems.length === 0 && (
                        <p className="text-neutral400 italic text-sm">
                            No reminders found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reminders;
