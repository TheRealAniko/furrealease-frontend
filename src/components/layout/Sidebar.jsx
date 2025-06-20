import { useEffect, useState } from "react";
import { useAuth } from "../../context/index.js";
import { Link, NavLink } from "react-router";
import {
    CircleChevronLeft,
    CircleChevronRight,
    House,
    PawPrint,
    AlarmClock,
    Settings,
    LogOut,
    Cat,
    Dog,
    Rabbit,
} from "lucide-react";
import { usePets } from "../../context/index.js";
import { useParams } from "react-router";

const speciesIcons = {
    cat: <Cat className="pl-4 w-10" />,
    dog: <Dog className="pl-4 w-10" />,
    small_mammal: <Rabbit className="pl-4 w-10" />,
    other: <PawPrint className="pl-4 w-10 " />,
};

const Sidebar = () => {
    const { isAuthenticated, signOut } = useAuth();

    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(max-width: 1279px)").matches;
    });
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1279px)");
        const handleResize = () => setIsCollapsed(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    if (!isAuthenticated) return null;
    const { pets } = usePets();
    const { id } = useParams();

    return (
        <aside
            className={`bg-neutral700 min-h-[calc(100vh-4rem)] text-neutral100 font-light text-lg pt-20 pb-8 pr-8 flex flex-col justify-between transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-20 items-center" : "w-64"
            }`}>
            {/* Menu top */}
            <div className="">
                <ul className="space-y-4">
                    <li
                        className="flex  cursor-pointer text-neutral100 hover:text-primary justify-end pb-2"
                        onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? (
                            <CircleChevronRight />
                        ) : (
                            <CircleChevronLeft />
                        )}
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link nav-link-active"
                                    : "nav-link"
                            }>
                            <House className="pl-4 w-10" />
                            {!isCollapsed && <span>Home</span>}
                        </NavLink>
                    </li>
                    {/* Pets */}
                    {/* === Pets Section === */}
                    {pets.length === 1 && (
                        <li>
                            <NavLink
                                to={`/pets/${pets[0]._id}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link nav-link-active"
                                        : "nav-link"
                                }>
                                {speciesIcons[pets[0].species.toLowerCase()] ||
                                    speciesIcons.other}
                                {!isCollapsed && <span>{pets[0].name}</span>}
                            </NavLink>
                        </li>
                    )}

                    {pets.length === 2 && (
                        <div className="border-t border-b border-white/30 mt-2 py-2 space-y-2">
                            {pets
                                .filter((pet) => pet.status !== "sleeping")
                                .slice()
                                .reverse()
                                .map((pet) => (
                                    <NavLink
                                        key={pet._id}
                                        to={`/pets/${pet._id}`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link nav-link-active"
                                                : "nav-link"
                                        }>
                                        {speciesIcons[
                                            pet.species.toLowerCase()
                                        ] || speciesIcons.other}
                                        {!isCollapsed && (
                                            <span>{pet.name}</span>
                                        )}
                                    </NavLink>
                                ))}
                        </div>
                    )}

                    {pets.length > 2 && (
                        <div className="border-t border-b border-white/30 mt-2 py-2 space-y-2">
                            <NavLink
                                to="/pets"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link nav-link-active"
                                        : "nav-link"
                                }>
                                <PawPrint className="pl-4 w-10" />
                                {!isCollapsed && <span>Pets</span>}
                            </NavLink>

                            {pets
                                .filter((pet) => pet.status !== "sleeping")
                                .slice()
                                .reverse()
                                .map((pet) => (
                                    <NavLink
                                        key={pet._id}
                                        to={`/pets/${pet._id}`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link nav-link-active"
                                                : "nav-link"
                                        }>
                                        {speciesIcons[
                                            pet.species.toLowerCase()
                                        ] || speciesIcons.other}
                                        {!isCollapsed && (
                                            <span>{pet.name}</span>
                                        )}
                                    </NavLink>
                                ))}
                        </div>
                    )}

                    <li>
                        <NavLink
                            to="/reminders"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link nav-link-active"
                                    : "nav-link"
                            }>
                            <AlarmClock className="pl-4 w-10" />
                            {!isCollapsed && <span>Reminders</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Menu bottom */}
            <div>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link nav-link-active"
                                    : "nav-link"
                            }>
                            <Settings className="pl-4 w-10" />
                            {!isCollapsed && <span>Settings</span>}
                        </NavLink>
                    </li>
                    <li onClick={signOut}>
                        <NavLink to="/" className="nav-link">
                            <LogOut className="pl-4 w-10" />
                            {!isCollapsed && <span>Logout</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
