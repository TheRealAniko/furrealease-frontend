import { useEffect, useState } from "react";
import { useAuth } from "../../context/index.js";
import { NavLink, useParams } from "react-router";
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

const speciesIcons = {
    cat: <Cat className="pl-4 w-10" />,
    dog: <Dog className="pl-4 w-10" />,
    small_mammal: <Rabbit className="pl-4 w-10" />,
    other: <PawPrint className="pl-4 w-10" />,
};

const Sidebar = ({ isOpen, onClose }) => {
    const { isAuthenticated, signOut } = useAuth();
    const { pets } = usePets();
    const { id } = useParams();

    /** Viewport State:
     * 'mobile'  -> < md (Burger/Overlay)
     * 'tablet'  -> md–lg (collapsed only)
     * 'desktop' -> ≥ lg (toggle collapsed/expanded)
     */
    const [viewport, setViewport] = useState("mobile");

    // User-controlled collapse only on desktop
    const [collapsedState, setCollapsedState] = useState(false);

    useEffect(() => {
        const checkViewport = () => {
            if (window.innerWidth >= 1024) setViewport("desktop");
            else if (window.innerWidth >= 768) setViewport("tablet");
            else setViewport("mobile");
        };
        window.addEventListener("resize", checkViewport);
        checkViewport();
        return () => window.removeEventListener("resize", checkViewport);
    }, []);

    // Sidebar isVisible? Always on tablet+desktop, only on mobile if isOpen
    const isSidebarVisible = viewport !== "mobile" || isOpen;

    // Collapsed logic: Always collapsed on tablet, user-toggle on desktop
    const isCollapsed =
        viewport === "tablet" || (viewport === "desktop" && collapsedState);

    // Text visibility
    const showText = viewport === "mobile" || !isCollapsed;

    if (!isAuthenticated) return null;

    return (
        <>
            {/* Mobile overlay background */}
            {viewport === "mobile" && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar itself */}
            <aside
                className={`
          bg-neutral700 text-neutral-100 font-light text-lg
          flex flex-col justify-between
          fixed md:relative
          z-50 md:z-auto
          min-h-full
          transition-all duration-300 ease-in-out
          pt-20 pb-10 pr-8
          
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0

          ${isCollapsed ? "md:w-20 md:items-center" : "md:w-64"}
        `}>
                {/* Close button on mobile */}
                {viewport === "mobile" && isOpen && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-2xl z-50">
                        <X />
                    </button>
                )}

                {/* Menu Top */}
                <div className="mt-8 md:mt-0">
                    <ul className="space-y-4">
                        {/* Toggle only on desktop */}
                        {viewport === "desktop" && (
                            <li
                                className="hidden md:flex cursor-pointer hover:text-primary justify-end pb-2"
                                onClick={() =>
                                    setCollapsedState(!collapsedState)
                                }>
                                {collapsedState ? (
                                    <CircleChevronRight />
                                ) : (
                                    <CircleChevronLeft />
                                )}
                            </li>
                        )}

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
                                {showText && <span>Dashboard</span>}
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
                                        pets[0].species?.toLowerCase()
                                    ] || speciesIcons.other}
                                    {showText && <span>{pets[0].name}</span>}
                                </NavLink>
                            </li>
                        )}

                        {pets.length >= 2 && (
                            <div className="border-t border-b border-white/30 mt-2 py-2 space-y-2">
                                {pets.length > 2 && (
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
                                )}
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
                                                pet.species?.toLowerCase()
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

                {/* Menu Bottom */}
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
