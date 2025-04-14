import { createContext, useContext } from "react";

const AuthContext = createContext();
const PetContext = createContext();
const RemContext = createContext();

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

const useRems = () => {
    const context = useContext(RemContext);
    if (!context)
        throw new Error("useRems must be used with an RemsContextProvider");
    return context;
};

export { AuthContext, useAuth, PetContext, usePets, RemContext, useRems };
