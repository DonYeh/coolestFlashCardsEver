import { API_URL } from "./config";
// import { TDeck } from "./getDecks";
import { TDeck } from "./getDeck";

// export async function createCard(deckId: string, text: string): Promise<TDeck> {
export async function createCard(deckId: string, text: string, definition: string): Promise<TDeck> {
    const newCard = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: 'POST',
        // body: JSON.stringify({text}),
        body: JSON.stringify({text, definition}),
        headers: {"Content-Type": 'application/json'}
      }).then((response)=> response.json());

      return newCard;
}