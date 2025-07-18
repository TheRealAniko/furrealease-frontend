import { useAuth, usePets } from "../context/index.js";
import ProfileInfo from "../components/settings/ProfileInfo.jsx";

const Settings = () => {
    const { pets } = usePets();
    const { user } = useAuth();
    return (
        <>
            <ProfileInfo user={user} pets={pets} />
        </>
    );
};

export default Settings;
