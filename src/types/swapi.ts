export interface CharacterDetails {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
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
