import { API_URL } from "./config";

export async function createDeck(title: string) {
    const newDeck = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        body: JSON.stringify({title}),
        headers: {"Content-Type": 'application/json'}
      }).then((response)=> response.json());

      return newDeck;
}