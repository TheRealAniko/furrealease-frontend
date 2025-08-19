import { useAuth } from "../../context/index.js";
import { Link, NavLink } from "react-router";
import { Menu, User } from "lucide-react";
import { updateProfile } from "../../data/user.js";

const Header = ({ onBurgerClick, user }) => {
    const { isAuthenticated } = useAuth();
    const avatarUrl = user?.photoUrl || null;

    return (
        <header className="fixed top-0 z-50 bg-neutral900 text-neutral100 w-full h-12 sm:h-16 border-b border-b-neutral100 flex">
            <div className="w-full px-4 flex justify-between items-center">
                {isAuthenticated && (
                    <button
                        onClick={onBurgerClick}
                        className=" sm:hidden  bg-neutral800 text-white rounded-full p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                )}

                <div className="self-center ">
                    <NavLink to="/">
                        <h1 className="font-sans text-xl sm:text-3xl font-thin">
                            FurRealEase
                        </h1>
                    </NavLink>
                </div>
                {isAuthenticated && (
                    <>
                        <div className="flex items-end h-12 sm:h-16 relative">
                            <div className="translate-y-1/3">
                                <div className="w-10 sm:w-16 aspect-square rounded-full ring ring-primary ring-offset-1 sm:ring-offset-2 ring-offset-base-100">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-full"
                                            onError={(e) => {
                                                console.error(
                                                    "Image load error:",
                                                    e.target.src
                                                );
                                                e.target.onerror = null;
                                                e.target.src = ""; // vermeide Endlos-Loop
                                            }}
                                        />
                                    ) : (
                                        <User className="w-full h-full text-white p-2 bg-primary rounded-full" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
