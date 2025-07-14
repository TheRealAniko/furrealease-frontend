import { useNavigate } from "react-router";
import { Hospital, Syringe, AlarmClock } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <section className="flex-1 flex flex-col justify-center text-center py-16">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-primary mb-4">
                    FurRealEase
                </h1>
                <p className="text-base sm:text-lg md:text-xl max-w-sm sm:max-w-md md:max-w-xl mx-auto text-neutral700 leading-relaxed">
                    The smarter way to care for your pets – keep track of vet
                    visits, meds, weight & more. All in one place.
                </p>
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
                    <button
                        className="btn btn-primary w-full sm:w-auto px-8 py-3"
                        onClick={() => navigate("/auth?signup=false")}>
                        Log In
                    </button>
                    <button
                        className="btn btn-outline w-full sm:w-auto px-8 py-3"
                        onClick={() => navigate("/auth?signup=true")}>
                        Create Account
                    </button>
                </div>
            </section>

            {/* Feature Section */}
            <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 py-14">
                <Feature
                    icon={
                        <Syringe
                            strokeWidth={1.25}
                            className="text-primary w-16 h-16 md:w-20 md:h-20"
                        />
                    }
                    title="Vaccinations & Medications"
                    text="Track treatments with automated reminders."
                />
                <Feature
                    icon={
                        <Hospital
                            strokeWidth={1.25}
                            className="text-primary w-16 h-16 md:w-20 md:h-20"
                        />
                    }
                    title="Weight & Vet Visits"
                    text="Log vet visits and monitor weight history easily."
                />
                <Feature
                    icon={
                        <AlarmClock
                            strokeWidth={1.25}
                            className="text-primary w-16 h-16 md:w-20 md:h-20"
                        />
                    }
                    title="Smart Reminders"
                    text="Stay ahead with categorized, pet-specific reminders."
                />
            </section>
        </>
    );
};

const Feature = ({ icon, title, text }) => (
    <div className="card-container flex flex-col items-center py-6 md:py-8 px-4 text-center">
        <div className="mb-4 md:mb-6">{icon}</div>
        <h3 className="h2-section mb-3 md:mb-4 text-lg md:text-xl">{title}</h3>
        <p className="text-sm md:text-base text-neutral600 max-w-xs leading-relaxed">
            {text}
        </p>
    </div>
);

export default Home;
