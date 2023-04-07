import { API_URL } from "./config";

export type TDeck = {
    title: string;
    _id: string;
  }

export async function getDecks(): Promise<TDeck[]> {
    const decks = await fetch(`${API_URL}/decks`)
        .then(response => response.json());

    return decks
}

