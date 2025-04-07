import { useParams, useNavigate } from "react-router";
import { getSinglePet } from "../../../data/pets";
import { useEffect, useState } from "react";

const WeightCard = () => {
    const [currPet, setCurrPet] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const fetchPet = async () => {
            try {
                const data = await getSinglePet(id);
                setCurrPet(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPet();
    }, [id]);

    const { weightHistory = [] } = currPet;

    return (
        <div>
            {weightHistory.length === 0 && (
                <p>Keine Gewichtsdaten vorhanden.</p>
            )}
            {weightHistory.map((entry) => (
                <div key={entry._id} className="border p-2 my-2 rounded">
                    <p>
                        <strong>Gewicht:</strong> {entry.weight} kg
                    </p>
                    <p>
                        <strong>Datum:</strong>{" "}
                        {new Date(entry.date).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default WeightCard;
