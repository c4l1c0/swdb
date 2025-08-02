import { useEffect, useState } from 'react';
import { getCharacters } from '../services/swapiService';
import { Link } from 'react-router-dom';
import type { Character } from '../types/swapi';

const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {
        setLoading(true);
        try {
            const { characters: characterList } = await getCharacters();
            setCharacters(characterList);
        } catch (err) {
            console.error('Error fetching characters:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Star Wars Characters</h2>
                {characters.map((char, index) => (
                    <p key={index}>
                        <Link to={`/character/${index+1}`}>
                            <strong>{char.name}</strong>
                        </Link>{' '}
                    </p>
                ))}
        </div>
    );
};

export default CharacterList;