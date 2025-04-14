import { useState } from "react";
import { useRems } from "../context/index.js";
import { usePets } from "../context/index.js";
import AddRemBtn from "../components/ui/AddRemBtn";
import RemCalendar from "../components/reminders/RemCalendar.jsx";
import RemList from "../components/reminders/RemList.jsx";
import RemModal from "../components/reminders/RemModal";
import RemCard from "../components/reminders/RemCard";

const Reminders = () => {
    const { showRemModal, setShowRemModal, selectedDate, rems, refreshRems } =
        useRems();
    const { pets, setPets } = usePets();

    console.log("Available pets:", pets);

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Reminders</h2>
                <AddRemBtn />
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
                            onClose={() => setShowRemModal(false)}
                        />
                    )}
                </div>
            </div>

            {/* All Reminders Section */}
            <div className="card-container flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-neutral800 mb-2">
                    All reminders
                </h3>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter("active")}
                            className={`btn ${
                                filter === "active"
                                    ? "btn-primary"
                                    : "btn-outline"
                            }`}>
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("done")}
                            className={`btn ${
                                filter === "done"
                                    ? "btn-primary"
                                    : "btn-outline"
                            }`}>
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("all")}
                            className={`btn ${
                                filter === "all" ? "btn-primary" : "btn-outline"
                            }`}>
                            All
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border rounded px-2 py-1 text-sm">
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
                            className="border rounded px-2 py-1 text-sm">
                            <option value="all">All Pets</option>
                            {petsWithReminders?.map((pet) => (
                                <option key={pet._id} value={pet._id}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() =>
                                setSortDir(sortDir === "asc" ? "desc" : "asc")
                            }
                            className="text-sm text-primary underline">
                            Sort:{" "}
                            {sortDir === "asc"
                                ? "Earliest first"
                                : "Latest first"}
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {sortedRems.map((rem) => (
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
