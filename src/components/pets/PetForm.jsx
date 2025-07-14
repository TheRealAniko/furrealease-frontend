import { useState } from "react";
import { toastSuccess, toastError } from "../../utils/toastHelper.js";
import { createPet } from "../../data/pets";
import { useNavigate } from "react-router";
import PetProfilImg from "./PetProfileImg";

const PetForm = () => {
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
            if (sex) formData.append("sex", sex);
            formData.append("birthdate", birthdate);
            if (intact) formData.append("intact", intact);
            if (chipped) formData.append("chipped", chipped);
            if (chipNumber) formData.append("chipNumber", chipNumber);
            if (photo) formData.append("photo", photo); // 📸

            await createPet(formData);

            // Reset
            setForm({ ...initialState });
            setPhoto(null);
            setPhotoPreview(null);

            toastSuccess("Pet created!");
            navigate("/pets", { state: { reload: true } });
        } catch (err) {
            toastError(err.message || "Error while creating pet");
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
        <div className="w-full items-start-full  flex flex-col lg:flex-row gap-6 ">
            <div className="w-1/2 flex self-center lg:self-start">
                {photoPreview ? (
                    <div className="mt-4">
                        <img
                            src={photoPreview}
                            alt="Preview"
                            className="rounded-full aspect-square object-cover border border-neutral400"
                        />
                    </div>
                ) : (
                    <PetProfilImg species={species} />
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className="my-5  w-full mx-auto flex flex-col gap-3">
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
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                </div>

                <label className="input-wrapper flex items-center gap-2">
                    <input
                        name="name"
                        value={name}
                        onChange={handleChange}
                        type="text"
                        className="input-field"
                        placeholder="Name"
                        required
                    />
                </label>
                <label className="input-wrapper flex items-center gap-2">
                    <select
                        name="species"
                        value={species}
                        onChange={handleChange}
                        className="input-field"
                        required>
                        <option value="">Choose pet...</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="small_mammal">Small Mammal</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label className="input-wrapper flex items-center gap-2">
                    <input
                        name="breed"
                        value={breed}
                        onChange={handleChange}
                        type="text"
                        className="input-field"
                        placeholder="Breed"
                    />
                </label>
                <fieldset className="rounded-full border border-neutral700 bg-neutral100  py-4 px-6 flex gap-6 font-light text-base">
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
                <label className="input-wrapper flex items-center gap-2">
                    <input
                        name="birthdate"
                        value={birthdate}
                        onChange={handleChange}
                        type="date"
                        className="input-field"
                        placeholder="Birthdate"
                    />
                </label>

                <fieldset className="rounded-full border border-neutral700 bg-neutral100  pt-2 pb-4 px-6 flex gap-6 font-light text-base">
                    <legend className="px-4">
                        Is your pet spayed or neutered?
                    </legend>

                    <label className="flex items-center gap-4">
                        <label className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="intact"
                                value="neutered"
                                checked={intact === "neutered"}
                                onChange={handleChange}
                                className="radio-btn"
                            />
                            Yes
                        </label>
                        <input
                            type="radio"
                            name="intact"
                            value="intact"
                            checked={intact === "intact"}
                            onChange={handleChange}
                            className="radio-btn"
                        />
                        No
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

                <fieldset className="rounded-full border border-neutral700 bg-neutral100  pt-2 pb-4 px-6 flex gap-6 font-light text-base">
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
                    <label className="input-wrapper  items-center gap-4">
                        <input
                            name="chipNumber"
                            value={chipNumber}
                            onChange={handleChange}
                            type="text"
                            className="input-field"
                            placeholder="Chip Number"
                        />
                    </label>
                )}
                <div className="flex gap-8 justify-center mt-6">
                    <button type="submit" className="btn btn-primary">
                        Add {name || "Pet"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                            setForm(initialState);
                            setPhoto(null);
                            setPhotoPreview(null);
                        }}>
                        Reset
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PetForm;
