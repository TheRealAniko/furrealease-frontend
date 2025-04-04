import { createContext, useContext } from "react";

const AuthContext = createContext();
const PetContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used with an AuthContextProvider");
    return context;
};

const usePets = () => {
    const context = useContext(PetContext);
    if (!context)
        throw new Error("usePets must be used with an PetsContextProvider");
    return context;
};

export { AuthContext, useAuth, PetContext, usePets };
