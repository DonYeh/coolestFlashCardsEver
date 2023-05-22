import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function deleteCard(deckId: string, cardId: string): Promise<TDeck> {

console.log('inside deleteCard, cardId: ', cardId)

    const cardToDelete = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
        method: 'DELETE',
      }).then(response => response.json());

      console.log('inside deleteCard, cardToDelete: ', cardToDelete)


      return cardToDelete;
}