export interface SwapiResponse<T> {
    message: string;
    result: {
        properties: T;
        _id: string;
        uid: string;
    };
}

export interface CharacterDetails {
    name: string;
    height: string;
    mass: string;
    gender: string;
    birth_year: string;
    eye_color: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
}

export interface Character {
    uid:  string;
    name: string;
    url: string;
}

export interface StarshipDetails {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
}

export interface Starship {
    uid:  string;
    name: string;
    url: string;
}
