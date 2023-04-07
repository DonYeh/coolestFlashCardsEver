import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function createCard(deckId: string, text: string): Promise<TDeck> {
    const newCard = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {"Content-Type": 'application/json'}
      }).then((response)=> response.json());

      return newCard;
}