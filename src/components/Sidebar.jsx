import { useState } from "react";
import { useAuth } from "../context/index.js";
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
import { usePets } from "../context";
import { useParams } from "react-router";

const speciesIcons = {
    cat: <Cat className="pl-6 w-10" />,
    dog: <Dog className="pl-6 w-10" />,
    small_mammal: <Rabbit className="pl-6 w-10" />,
    other: <PawPrint className="pl-6 w-10 " />,
};

const Sidebar = () => {
    const { isAuthenticated, signOut } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
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
                    <li>
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
                    </li>
                    {/* if pets show list of pets name aa link  */}
                    <ul className="space-y-4 ">
                        {pets.length > 0 &&
                            pets.map((pet) => (
                                <li key={pet._id}>
                                    <NavLink
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
                                </li>
                            ))}
                    </ul>

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
