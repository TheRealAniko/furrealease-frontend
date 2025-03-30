import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
    CircleChevronLeft,
    CircleChevronRight,
    House,
    PawPrint,
    AlarmClock,
    Settings,
    LogOut,
} from "lucide-react";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <aside
            className={`bg-neutral700 min-h-[calc(100vh-4rem)] text-neutral100 font-light text-lg pt-20 pb-8 pr-8 flex flex-col justify-between transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-20 items-center" : "w-64"
            }`}>
            {/* Menu top */}
            <div>
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
                            <House />
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
                            <PawPrint />
                            {!isCollapsed && <span>Pets</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/reminders"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link nav-link-active"
                                    : "nav-link"
                            }>
                            <AlarmClock />
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
                            <Settings />
                            {!isCollapsed && <span>Settings</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="nav-link">
                            <LogOut />
                            {!isCollapsed && <span>Logout</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
