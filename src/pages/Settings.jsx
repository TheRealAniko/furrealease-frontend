import { useAuth, usePets } from "../context/index.js";

const Settings = () => {
    const { pets } = usePets();
    const { user } = useAuth();
    return (
        <div>
            <h3 className="h3-section mb-4">Account Settings</h3>

            <p>
                <strong>Name:</strong> {user?.firstName} {user?.lastName}
            </p>
            <p>
                <strong>Email:</strong> {user?.email}
            </p>
            <p>
                <strong>Pets:</strong> {pets?.length}
            </p>
        </div>
    );
};

export default Settings;
