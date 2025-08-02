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

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      try {
        const data = await getCharacter(Number(id));
        setCharacter(data);

        // Fetch related data in parallel
        const [filmsData, starshipsData, speciesData, vehiclesData] = await Promise.all([
          Promise.all(data.films.map(getNameFromUrl)),
          Promise.all(data.starships.map(getNameFromUrl)),
          Promise.all(data.species.map(getNameFromUrl)),
          Promise.all(data.vehicles.map(getNameFromUrl)),
        ]);

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
        <ul>
          <li>Gender: {character.gender}</li>
          <li>Birth Year: {character.birth_year}</li>
          <li>Height: {character.height} cm</li>
          <li>Mass: {character.mass} kg</li>
          <li>Eye Color: {character.eye_color}</li>
        </ul>

        <h3>Films</h3>
        <ul>{films.map((name, idx) => <li key={idx}>{name}</li>)}</ul>

        <h3>Starships</h3>
        <ul>{starships.map((name, idx) => <li key={idx}>{name}</li>)}</ul>

        <h3>Species</h3>
        <ul>{species.length ? species.map((name, idx) => <li key={idx}>{name}</li>) : <li>Human (default)</li>}</ul>

        <h3>Vehicles</h3>
        <ul>{vehicles.map((name, idx) => <li key={idx}>{name}</li>)}</ul>

        <Link to="/">← Back to Characters</Link>
      </div>
  );
};

export default CharacterDetail;