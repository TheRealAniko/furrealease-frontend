import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { usePets } from "../../context/index.js";

const Breadcrumbs = ({ className = "" }) => {
    const location = useLocation();
    const { pets } = usePets();

    const pathnames = location.pathname.split("/").filter(Boolean);

    // Ausschluss für public Seiten
    if (location.pathname === "/" || location.pathname.startsWith("/auth"))
        return null;

    if (!pathnames.length) return null;

    // statische Labels
    const labelMap = {
        dashboard: "Dashboard",
        pets: "Pets",
        reminders: "Reminders",
        settings: "Settings",
        "new-pet": "Add",
        sleeping: "Sleeping",
    };

    const getLabel = (segment, index) => {
        // 1) /pets/edit-pet/:id
        if (
            pathnames.includes("edit-pet") &&
            pathnames[index - 1] === "edit-pet"
        ) {
            const found = pets.find((pet) => pet._id === segment);
            if (found) return found.name;
        }

        // 2) /pets/:id
        if (index > 0 && pathnames[index - 1] === "pets") {
            const found = pets.find((pet) => pet._id === segment);
            if (found) return found.name;
        }

        // 3) mapping oder Capitalize
        return (
            labelMap[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1)
        );
    };

    return (
        <nav className={`flex md:hidden text-sm text-neutral700 ${className}`}>
            {pathnames.map((segment, index) => {
                const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                return (
                    <span key={routeTo} className="flex items-center">
                        {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                        {isLast ? (
                            <span className="font-medium text-neutral700">
                                {decodeURIComponent(getLabel(segment, index))}
                            </span>
                        ) : (
                            <Link
                                to={routeTo}
                                className="hover:underline text-primary">
                                {decodeURIComponent(getLabel(segment, index))}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
