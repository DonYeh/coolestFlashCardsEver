import { API_URL } from "./config";

type Card = {
    text: string;
    definition: string;
    _id: string;
  }

export type TDeck = {
    title: string;
    // cards: string[];
    cards: Card[];
    // cards: [{text: string, definition: string}];
    _id: string;
  }

export async function getDecks(): Promise<TDeck[]> {
    const decks = await fetch(`${API_URL}/decks`)
        .then(response => response.json());

    return decks
}

