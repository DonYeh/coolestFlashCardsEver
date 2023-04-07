import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function deleteCard(deckId: string, cardId: number): Promise<TDeck> {
    const cardToDelete = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
        method: 'DELETE',
      }).then(response => response.json());

      return cardToDelete;
}