import { useNavigate } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Hospital, Syringe, AlarmClock } from "lucide-react";
import Cat from "../assets/Cat.svg";
import Dog from "../assets/Dog.svg";
import Rabbit from "../assets/Rabbit.svg";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-between  bg-neutral200 text-neutral900 relativ">
            <Header />
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                    src={Dog}
                    className="hidden md:block absolute w-72 top-20 left-10 "
                    alt="Dog Illustration"
                />
                <img
                    src={Cat}
                    className="hidden md:block absolute w-64 top-24 right-0"
                    alt="Cat Illustration"
                />
                <img
                    src={Rabbit}
                    className="hidden sm:block absolute w-56 top-1/4 left-2/3"
                    alt="Rabbit Illustration"
                />
            </div>
            {/* Hero Section */}
            {/* Spacer*/}
            <div className="flex-grow" />{" "}
            <section className="relative z-10 text-center  px-6">
                <h1 className="text-5xl md:text-8xl font-bold mb-6 text-primary">
                    FurRealEase
                </h1>
                <p className="text-lg md:text-xl max-w-xl mx-auto text-neutral700">
                    The smarter way to care for your pets – keep track of vet
                    visits, meds, weight & more. All in one place.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/auth?signup=false")}>
                        Log In
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate("/auth?signup=true")}>
                        Create Account
                    </button>
                </div>
            </section>
            {/* Spacer*/}
            <div className="flex-grow" /> {/* Feature Section */}
            <div className="container mx-auto relative z-10 ">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    <Feature
                        icon={
                            <Syringe
                                strokeWidth={1.25}
                                className="text-primary w-20 h-20"
                            />
                        }
                        title="Vaccinations & Medications"
                        text="Track treatments with automated reminders."
                    />
                    <Feature
                        icon={
                            <Hospital
                                strokeWidth={1.25}
                                className="text-primary w-20 h-20"
                            />
                        }
                        title="Weight & Vet Visits"
                        text="Log vet visits and monitor weight history easily."
                    />
                    <Feature
                        icon={
                            <AlarmClock
                                strokeWidth={1.25}
                                className="text-primary w-20 h-20"
                            />
                        }
                        title="Smart Reminders"
                        text="Stay ahead with categorized, pet-specific reminders."
                    />
                </section>
            </div>
            {/* Spacer*/}
            <div className="flex-grow" />{" "}
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

const Feature = ({ icon, title, text }) => (
    <div className="card-container flex flex-col items-center py-8">
        <div className="text-4xl mb-6">{icon}</div>
        <h3 className="h2-section mb-4">{title}</h3>
        <p className="text-base text-neutral600">{text}</p>
    </div>
);

export default Home;
