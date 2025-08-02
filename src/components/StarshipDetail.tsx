import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStarship } from '../services/swapiService';
import type { StarshipDetails } from '../types/swapi';

const StarshipDetail = () => {
    const { id } = useParams();
    const [starship, setStarship] = useState<StarshipDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStarship = async () => {
            if (!id) return;
            try {
                const data = await getStarship(Number(id));
                setStarship(data);
            } catch (e) {
                console.error('Error loading starship:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchStarship();
    }, [id]);

    if (loading) return <p>Loading starship...</p>;
    if (!starship) return <p>Starship not found.</p>;

    return (
        <div>
            <h2>{starship.name}</h2>
            <ul>
                <li>Model: {starship.model}</li>
                <li>Class: {starship.starship_class}</li>
                <li>Manufacturer: {starship.manufacturer}</li>
                <li>Cost: {starship.cost_in_credits} credits</li>
                <li>Crew: {starship.crew}</li>
                <li>Passengers: {starship.passengers}</li>
            </ul>
            <Link to="/starships">← Back to Starships</Link>
        </div>
    );
};

export default StarshipDetail;