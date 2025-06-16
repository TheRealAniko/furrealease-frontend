import { useAuth } from "./index.js";
import { useEffect, useState } from "react";
import { getRems } from "../data/rem.js";
import { toast } from "react-toastify";
import { RemContext } from "./index.js";

const RemContextProvider = ({ children }) => {
    const { user } = useAuth();
    const [rems, setRems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRemModal, setShowRemModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingRem, setEditingRem] = useState(null);
    const [activeReminder, setActiveReminder] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        if (!user) return;
        setRems([]);
        const fetchRems = async () => {
            try {
                const data = await getRems();
                setRems(data);
            } catch (error) {
                console.error("Failed to load reminders", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRems();
    }, [user]);

    const refreshRems = async () => {
        try {
            const data = await getRems();
            setRems(data);
        } catch (error) {
            console.error("Failed to refresh reminders", error.message);
        }
    };

    return (
        <RemContext.Provider
            value={{
                rems,
                setRems,
                refreshRems,
                loading,
                showRemModal,
                setShowRemModal,
                selectedDate,
                setSelectedDate,
                editingRem,
                setEditingRem,
                activeReminder,
                setActiveReminder,
                currentMonth,
                setCurrentMonth,
            }}>
            {children}
        </RemContext.Provider>
    );
};

export default RemContextProvider;
