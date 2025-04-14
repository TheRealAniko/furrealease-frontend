import { useParams } from "react-router";
import { usePets } from "../context";
import { toastSuccess, toastError } from "../utils/toastHelper.js";
import { getSinglePet, updatePet, sleepPet } from "../data/pets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GoBackBtn from "../components/ui/GoBackBtn";
import PetProfilImg from "../components/pets/PetProfileImg";
import { toast } from "react-toastify";

const UpdatePet = () => {
    const { id } = useParams();
    const { refreshPets } = usePets();
    const navigate = useNavigate();
    const initialState = {
        name: "",
        species: "",
        breed: "",
        sex: "",
        birthdate: "",
        intact: "",
        chipped: "",
        chipNumber: "",
        photoUrl: "",
    };
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const petData = await getSinglePet(id);
                // Format für <input type="date">
                const formatDateForInput = (isoDate) => {
                    return isoDate?.split("T")[0];
                };

                setForm({
                    ...petData,
                    birthdate: formatDateForInput(petData.birthdate),
                });

                setPhotoPreview(data.photoUrl || null);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPet();
    }, [id]);

    const {
        name,
        species,
        breed,
        sex,
        birthdate,
        intact,
        chipped,
        chipNumber,
        photoUrl,
    } = form;

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!name || !species)
                throw new Error("Name and species are required");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("species", species);
            formData.append("breed", breed);
            formData.append("sex", sex);
            formData.append("birthdate", birthdate);
            formData.append("intact", intact);
            formData.append("chipped", chipped);
            if (chipNumber) formData.append("chipNumber", chipNumber);
            if (photo) formData.append("photo", photo); // 📸

            // testen
            console.log("👀 Inhalt von formData:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            await updatePet(id, formData);

            // Reset
            setForm(form);
            setPhotoPreview(photoUrl || null);
            setPhoto(null);

            toastSuccess("Pet upadted!");
            await refreshPets();
            navigate(`/pets/${id}`, { state: { reload: true } });
        } catch (err) {
            toastError(err.message || "Error updating pet");

            // Zusätzliche Info loggen:
            if (!res.ok) {
                const text = await res.text(); // ← nicht .json(), falls HTML!
                console.error("Server response (not OK):", text);
                throw new Error("Update failed");
            }
        }
    };

    // Image upload
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // Handler to read file
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhoto(file); // Datei speichern
        const previewURL = URL.createObjectURL(file); // temporäre Vorschau-URL
        setPhotoPreview(previewURL); // im state speicher für <img />
    };

    // handke sleep
    const handleSleep = async () => {
        try {
            await sleepPet(id);
            await refreshPets();
            toastSuccess(`${name} is now sleeping 🌙`);
            navigate("/pets"); // oder zurück zur Liste
        } catch (err) {
            toastError(err.message || "Sleep update failed");
            console.error(err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Edit Profile of {name}</h2>
                <GoBackBtn />
            </div>
            {/* Pet info container */}
            <div className="card-container flex gap-28 ">
                {/* Start form | später ein form für add und edit! */}
                <div className="w-full flex gap-10 items-start-full">
                    {photoPreview ? (
                        <div className="mt-4">
                            <img
                                src={photoPreview}
                                alt="New preview"
                                className="rounded-full w-80 aspect-square object-cover border border-neutral400"
                            />
                        </div>
                    ) : photoUrl ? (
                        <div className="mt-4">
                            <img
                                src={photoUrl}
                                alt="Saved profile"
                                className="rounded-full w-80 aspect-square object-cover border border-neutral400"
                            />
                        </div>
                    ) : (
                        <div className="">
                            <PetProfilImg species={species} />
                        </div>
                    )}

                    <div className=""></div>
                    <form
                        onSubmit={handleSubmit}
                        className="my-5 md:w-1/2 mx-auto flex flex-col gap-3">
                        <div className="flex overflow-hidden rounded-full border border-neutral700 w-full text-base">
                            <label
                                htmlFor="photo"
                                className="bg-primary px-4 py-4 text-neutral100 text-base cursor-pointer whitespace-nowrap">
                                Choose Image
                            </label>
                            <div className="flex-1 px-4 py-4  text-neutral700 bg-neutral100">
                                {photo?.name || "No file chosen"}
                            </div>
                            <input
                                id="photo"
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>

                        <label className="input flex items-center gap-2 text-inactive">
                            {name && <span>Name:</span>}
                            <input
                                name="name"
                                value={name}
                                onChange={handleChange}
                                type="text"
                                className="grow font-light text-base text-neutral900"
                                placeholder="Name"
                                required
                            />
                        </label>
                        <label className="input flex items-center gap-2 text-inactive">
                            {species && <span>Species:</span>}
                            <select
                                name="species"
                                value={species}
                                onChange={handleChange}
                                className="grow font-light text-base text-neutral900"
                                required>
                                <option value="">Choose pet...</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                                <option value="small_mammal">
                                    Small Mammal
                                </option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label className="input flex items-center gap-2">
                            <input
                                name="breed"
                                value={breed}
                                onChange={handleChange}
                                type="text"
                                className="grow font-light text-base"
                                placeholder="Breed"
                            />
                        </label>
                        <fieldset className="input flex gap-6 font-light text-base">
                            <legend className="sr-only">Sex</legend>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="female"
                                    checked={sex === "female"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                Female
                            </label>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="male"
                                    checked={sex === "male"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                Male
                            </label>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="unknown"
                                    checked={sex === "unknown"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                No Info
                            </label>
                        </fieldset>
                        <label className="input flex items-center gap-2 text-inactive">
                            {birthdate && <span>Day of birth:</span>}
                            <input
                                name="birthdate"
                                value={birthdate}
                                onChange={handleChange}
                                type="date"
                                className="grow font-light text-base text-neutral900"
                                placeholder="Birthdate"
                            />
                        </label>
                        <fieldset className="input flex gap-6 font-light text-base">
                            <legend className="px-4">
                                Is {name} spayed or neutered?
                            </legend>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="intact"
                                    value="intact"
                                    checked={intact === "intact"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                Intact
                            </label>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="intact"
                                    value="neutered"
                                    checked={intact === "neutered"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                Sprayed / Neutered
                            </label>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="intact"
                                    value="unknown"
                                    checked={intact === "unknown"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                No Info
                            </label>
                        </fieldset>

                        <fieldset className="input flex gap-6 font-light text-base">
                            <legend className="px-4">
                                Is {name} microchipped?
                            </legend>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="chipped"
                                    value="yes"
                                    checked={chipped === "yes"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                Yes
                            </label>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="chipped"
                                    value="no"
                                    checked={chipped === "no"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                No
                            </label>
                            <label className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="chipped"
                                    value="unknown"
                                    checked={chipped === "unknown"}
                                    onChange={handleChange}
                                    className="radio-btn"
                                />
                                No Info
                            </label>
                        </fieldset>
                        {chipped === "yes" && (
                            <label className="input  items-center gap-4 text-inactive">
                                {chipNumber && <span>Chipnumber: </span>}
                                <input
                                    name="chipNumber"
                                    value={chipNumber}
                                    onChange={handleChange}
                                    type="text"
                                    className="grow font-light text-base text-neutral900"
                                    placeholder="Chip Number"
                                />
                            </label>
                        )}
                        <div className="flex gap-8 justify-center mt-6">
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => navigate(-1)}>
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-grey"
                                onClick={handleSleep}>
                                Sleep
                            </button>
                        </div>
                    </form>
                </div>
                {/* End form */}
            </div>
        </div>
    );
};

export default UpdatePet;
