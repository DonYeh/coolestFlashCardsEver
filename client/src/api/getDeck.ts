import { API_URL } from "./config";

export type TDeck = {
    title: string;
    cards: string[];
    _id: string;
  }

export async function getDeck(deckId: string): Promise<TDeck> {
    const deck = await fetch(`${API_URL}/decks/${deckId}`)
        .then(response => response.json());

    return deck
}

