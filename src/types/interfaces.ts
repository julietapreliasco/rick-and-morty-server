export interface User {
  firebaseUid?: string;
  email: string;
  name: string;
  favoriteCharacters?: string[];
}

export interface BodyResponse<T> {
  message: string;
  data?: T;
  error: boolean;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
