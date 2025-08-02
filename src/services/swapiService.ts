import axios from 'axios';
import type { CharacterDetails, Character } from '../types/swapi';

const BASE_URL = 'https://swapi.info/api';

export const getCharacter = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/people/${id}`);
    return response.data as CharacterDetails;
};

export const getCharacters = async () => {
    const response = await axios.get(`${BASE_URL}/people`);
    return {
        characters: response.data as Character[],
    };
};

export const getNameFromUrl = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url);
        if ("name" in response.data) {
           return response.data.name;
        }
        else if ("title" in response.data) {
            return response.data.title;
        }
        else
        {
            return "no data";
        }
    } catch (err) {
        console.error(`Failed to fetch resource from ${url}`, err);
        return '[Unknown]';
    }
};