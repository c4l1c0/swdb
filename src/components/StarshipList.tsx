import { useEffect, useState } from 'react';
import { getStarships } from '../services/swapiService';
import type { Starship } from '../types/swapi';
import { Link } from 'react-router-dom';

const StarshipList = () => {
    const [starships, setStarships] = useState<Starship[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchPage = async (page: number) => {
        setLoading(true);
        try {
            const { starships: list, totalPages } = await getStarships(page);
            setStarships(list);
            setTotalPages(totalPages);
        } catch (e) {
            console.error('Error fetching starships:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(currentPage);
    }, [currentPage]);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    if (loading) return <p>Loading starships...</p>;

    return (
        <div>
            <h2>Starships (Page {currentPage})</h2>
            <ul>
                {starships.map((ship) => (
                    <li key={ship.uid}>
                        <Link to={`/starship/${ship.uid}`}>
                            <strong>{ship.name}</strong>
                        </Link>{' '}
                        — {ship.name}
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: '1rem' }}>
                <button onClick={handlePrev} disabled={currentPage === 1}>◀ Prev</button>
                <span style={{ margin: '0 1rem' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next ▶</button>
            </div>
        </div>
    );
};

export default StarshipList;