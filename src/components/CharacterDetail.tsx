import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacter, getNameFromUrl } from '../services/swapiService';
import type {CharacterDetails} from '../types/swapi';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState<CharacterDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [films, setFilms] = useState<string[]>([]);
    const [starships, setStarships] = useState<string[]>([]);
    const [species, setSpecies] = useState<string[]>([]);
    const [vehicles, setVehicles] = useState<string[]>([]);
    const [homeworld, setHomeworld] = useState<string>("");

    useEffect(() => {
        const fetchCharacter = async () => {
            if (!id) return;
            try {
                const data = await getCharacter(Number(id));
                setCharacter(data);

                const [filmsData, starshipsData, speciesData, vehiclesData] = await Promise.all([
                    Promise.all(data.films.map(getNameFromUrl)),
                    Promise.all(data.starships.map(getNameFromUrl)),
                    Promise.all(data.species.map(getNameFromUrl)),
                    Promise.all(data.vehicles.map(getNameFromUrl)),
                ]);

                const homeworldData = await getNameFromUrl(data.homeworld);
                setHomeworld(homeworldData)
                setFilms(filmsData);
                setStarships(starshipsData);
                setSpecies(speciesData);
                setVehicles(vehiclesData);
            } catch (error) {
                console.error('Error loading character:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <p>Loading character details...</p>;
    if (!character) return <p>Character not found.</p>;

    return (
        <div>
            <h2>{character.name}</h2>
            <table style={{width: "60vmin"}}>
                <tbody>
                <tr><td>Height</td><td>{character.height}</td></tr>
                <tr><td>Mass</td><td>{character.mass}</td></tr>
                <tr><td>Hair Color</td><td>{character.hair_color}</td></tr>
                <tr><td>Skin Color</td><td>{character.skin_color}</td></tr>
                <tr><td>Eye Color</td><td>{character.eye_color}</td></tr>
                <tr><td>Birth Year</td><td>{character.birth_year}</td></tr>
                <tr><td>Gender</td><td>{character.gender}</td></tr>
                <tr><td>Homeworld</td><td>{homeworld}</td></tr>
                </tbody>
            </table>

            <h3>Films</h3>
            {films.map((name, idx) => <p key={idx}>{name}</p>)}

            <h3>Starships</h3>
            {starships.map((name, idx) => <p key={idx}>{name}</p>)}

            <h3>Species</h3>
            {species.length ? species.map((name, idx) => <p key={idx}>{name}</p>) : <p>Human</p>}

            <h3>Vehicles</h3>
            {vehicles.map((name, idx) => <p key={idx}>{name}</p>)}

            <Link to="/">← Back to Characters</Link>
        </div>
    );
};

export default CharacterDetail;