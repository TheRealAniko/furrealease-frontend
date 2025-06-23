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
    X,
} from "lucide-react";
import { usePets } from "../../context/index.js";
import { useParams } from "react-router";

const speciesIcons = {
    cat: <Cat className="pl-4 w-10" />,
    dog: <Dog className="pl-4 w-10" />,
    small_mammal: <Rabbit className="pl-4 w-10" />,
    other: <PawPrint className="pl-4 w-10 " />,
};

const Sidebar = ({ isOpen, onClose }) => {
    const { isAuthenticated, signOut } = useAuth();

    // Collapse nur für Desktop (ab sm)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)"); // sm breakpoint
        const handleResize = () => {
            setIsDesktop(mediaQuery.matches);
        };

        mediaQuery.addEventListener("change", handleResize);
        handleResize(); // Initial call

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    if (!isAuthenticated) return null;

    const { pets } = usePets();
    const { id } = useParams();

    // Text soll sichtbar sein wenn:
    // - Mobile (immer) ODER Desktop und nicht collapsed
    const showText = !isDesktop || !isCollapsed;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="sm:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    bg-neutral700 text-neutral-100 font-light text-lg
                    flex flex-col justify-between
                    transition-all duration-300 ease-in-out
                    pt-20 pb-10 pr-8

                    /* Mobile: Fixed overlay */
                    fixed sm:relative
                   
                    left-0 sm:left-auto
                    min-h-full
                    z-50 sm:z-auto
                    w-64
                    
                    /* Mobile: Show/Hide basierend auf isOpen */
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    sm:translate-x-0

                    /* Desktop: Width basierend auf isCollapsed */
                    ${isCollapsed ? "sm:w-20 sm:items-center" : "sm:w-64"}
                `}>
                {/* Close-Button für Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:hidden text-white text-2xl z-50">
                    <X />
                </button>

                {/* Menu top */}
                <div className="mt-8 sm:mt-0">
                    <ul className="space-y-4">
                        {/* Toggle Button - nur auf Desktop sichtbar */}
                        <li
                            className="hidden sm:flex cursor-pointer text-neutral-100 hover:text-primary justify-end pb-2"
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
                                }
                                onClick={onClose}>
                                <House className="pl-4 w-10" />
                                {showText && <span>Home</span>}
                            </NavLink>
                        </li>

                        {/* Pets Section */}
                        {pets.length === 1 && (
                            <li>
                                <NavLink
                                    to={`/pets/${pets[0]._id}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link nav-link-active"
                                            : "nav-link"
                                    }
                                    onClick={onClose}>
                                    {speciesIcons[
                                        pets[0].species.toLowerCase()
                                    ] || speciesIcons.other}
                                    {showText && <span>{pets[0].name}</span>}
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
                                            }
                                            onClick={onClose}>
                                            {speciesIcons[
                                                pet.species.toLowerCase()
                                            ] || speciesIcons.other}
                                            {showText && (
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
                                    }
                                    onClick={onClose}>
                                    <PawPrint className="pl-4 w-10" />
                                    {showText && <span>Pets</span>}
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
                                            }
                                            onClick={onClose}>
                                            {speciesIcons[
                                                pet.species.toLowerCase()
                                            ] || speciesIcons.other}
                                            {showText && (
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
                                }
                                onClick={onClose}>
                                <AlarmClock className="pl-4 w-10" />
                                {showText && <span>Reminders</span>}
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
                                }
                                onClick={onClose}>
                                <Settings className="pl-4 w-10" />
                                {showText && <span>Settings</span>}
                            </NavLink>
                        </li>
                        <li onClick={signOut}>
                            <NavLink
                                to="/"
                                className="nav-link"
                                onClick={onClose}>
                                <LogOut className="pl-4 w-10" />
                                {showText && <span>Logout</span>}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
