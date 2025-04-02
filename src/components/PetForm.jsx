import { useState } from "react";
import { createPet } from "../data/pets";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PetForm = () => {
    // const navigate = useNavigate();
    const initialState = {
        name: "",
        species: "",
        breed: "",
        sex: "",
        birthdate: "",
        intact: "",
        chipped: "",
        chipNumber: "",
    };
    const [form, setForm] = useState(initialState);
    const {
        name,
        species,
        breed,
        sex,
        birthdate,
        intact,
        chipped,
        chipNumber,
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

            await createPet(formData);

            // Reset
            setForm({ ...initialState });
            setPhoto(null);
            setPhotoPreview(null);

            toast.success("Pet created!");
        } catch (error) {
            toast.error(error.message);
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

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="my-5 md:w-1/2 mx-auto flex flex-col gap-3">
                <label className="input flex items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </label>
                {photoPreview && (
                    <div className="mt-4">
                        <img
                            src={photoPreview}
                            alt="Preview"
                            className="rounded-xl w-32 h-32 object-cover border border-neutral400"
                        />
                    </div>
                )}
                <label className="input flex items-center gap-2">
                    <input
                        name="name"
                        value={name}
                        onChange={handleChange}
                        type="text"
                        className="grow font-light text-base"
                        placeholder="Name"
                        required
                    />
                </label>
                <label className="input flex items-center gap-2">
                    <select
                        name="species"
                        value={species}
                        onChange={handleChange}
                        className="grow font-light text-base"
                        required>
                        <option value="">Choose pet...</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="small_mammal">Small Mammal</option>
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
                <label className="input flex items-center gap-2">
                    <input
                        name="birthdate"
                        value={birthdate}
                        onChange={handleChange}
                        type="date"
                        className="grow font-light text-base"
                        placeholder="Birthdate"
                    />
                </label>
                <fieldset className="input flex gap-6 font-light text-base">
                    <legend className="sr-only">
                        Is your pet spayed or neutered?
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
                    <legend className="px-4">Is your pet microchipped?</legend>
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
                    <label className="input  items-center gap-4">
                        <input
                            name="chipNumber"
                            value={chipNumber}
                            onChange={handleChange}
                            type="text"
                            className="grow font-light text-base"
                            placeholder="Chip Number"
                        />
                    </label>
                )}
                <button className="btn btn-primary self-center">
                    Add {name || "Pet"}
                </button>
            </form>
        </>
    );
};

export default PetForm;
