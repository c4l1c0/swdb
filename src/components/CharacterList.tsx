import { useEffect, useState } from 'react';
import { getCharacters } from '../services/swapiService';
import { Link } from 'react-router-dom';
import type { Character } from '../types/swapi';

const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPage = async (page: number) => {
        setLoading(true);
        try {
            const { characters: characterList, totalPages } = await getCharacters(page);
            setCharacters(characterList);
            setTotalPages(totalPages);
        } catch (err) {
            console.error('Error fetching characters:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(currentPage);
    }, [currentPage]);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Star Wars Characters</h2>
                {characters.map((char, index) => (
                    <p key={index}>
                        <Link to={`/character/${char.uid}`}>
                            <strong>{char.name}</strong>
                        </Link>{' '}
                    </p>
                ))}

            <div style={{ marginTop: '1rem' }}>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    ◀ Prev
                </button>
                <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next ▶
                </button>
            </div>
        </div>
    );
};

export default CharacterList;