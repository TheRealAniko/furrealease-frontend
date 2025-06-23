import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-neutral900 text-neutral100 text-xs px-6 py-4 border-t border-t-neutral100 ">
            <div className="container mx-auto flex justify-between">
                <div className="flex items-center space-x-3">
                    &copy; {new Date().getFullYear()} FurRealEase. All rights
                    reserved.
                </div>
                <div className="flex space-x-4 items-center">
                    Made with <Heart className="text-pinkNose px-1" />
                    for pets & their humans.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
