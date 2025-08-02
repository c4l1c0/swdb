import axios from 'axios';
import type {
    CharacterDetails, Character, 
    StarshipDetails, Starship,
    SwapiResponse} from '../types/swapi';

const BASE_URL = 'https://www.swapi.tech/api';

export const getCharacter = async (id: number) => {
    const response = await axios.get<SwapiResponse<CharacterDetails>>(`${BASE_URL}/people/${id}`);
    return response.data.result.properties;
};

export const getCharacters = async (page: number = 1) => {
    const response = await axios.get(`${BASE_URL}/people?page=${page}&limit=10`);
    return {
        characters: response.data.results as Character[],
        totalPages: Math.ceil(response.data.total_records / response.data.total_pages),
    };
};

export const getStarship = async (id: number) => {
    const response = await axios.get<SwapiResponse<StarshipDetails>>(`${BASE_URL}/starships/${id}`);
    return response.data.result.properties;
};

export const getStarships = async (page: number = 1) => {
    const response = await axios.get(`${BASE_URL}/starships?page=${page}&limit=10`);
    return {
        starships: response.data.results as Starship[],
        totalPages: Math.ceil(response.data.total_records / response.data.total_pages),
    };
};

export const getNameFromUrl = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url);
        return response.data.result.properties.name;
    } catch (err) {
        console.error(`Failed to fetch resource from ${url}`, err);
        return '[Unknown]';
    }
};