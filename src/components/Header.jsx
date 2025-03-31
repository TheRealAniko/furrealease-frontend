import { useAuth } from "../context/index.js";

const Header = () => {
    const { isAuthenticated } = useAuth();
    return (
        <header className="fixed top-0 z-50 bg-neutral900 text-neutral100 w-full h-16 border-b border-b-neutral100 flex">
            <div className="container mx-auto self-center flex justify-between ">
                <div className="self-center ">
                    <h1 className="font-sans text-3xl font-thin">
                        FurRealEase
                    </h1>
                </div>
                {isAuthenticated && (
                    <>
                        {/* <div className="flex self-center">
                            Hi, {user?.firstName}
                        </div> */}
                        <div className="flex items-end h-16 relative">
                            <div className="translate-y-1/3">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        className="rounded-full"
                                    />
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
