import { useAuth, usePets } from "../context/index.js";
import ProfileInfo from "../components/settings/ProfileInfo.jsx";

const Settings = () => {
    const { pets } = usePets();
    const { user, setUser } = useAuth();

    return (
        <>
            <ProfileInfo user={user} pets={pets} onUpdateUser={setUser} />
        </>
    );
};

export default Settings;
