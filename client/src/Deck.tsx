
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import { deleteDeck } from './api/deleteDecks';
import { createDeck } from './api/createDeck';
import { getDecks, TDeck } from './api/getDecks';
import { createCard } from './api/createCard';
import { useParams } from 'react-router-dom';
import { getDeck } from './api/getDeck';

export default function Deck() {

  const [deck,setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState<string>('')
  const { deckId } = useParams();

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text)
    setCards(serverCards)
    setText("");
  }

//   async function handleDeleteCard(cardId: string) {
//     await deleteCard(cardId)
//     setCards(cards.filter((card)=> card._id !== cardId));
//   }

  useEffect(() => {
      async function fetchDeck() {
        if(!deckId) return;
        const newDeck = await getDeck(deckId);
        setDeck(newDeck);
        setCards(newDeck.cards);
        console.log(newDeck);
    }
    fetchDeck();
 
  }, [deckId]);

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card)=> <li key={card}>
          
          {/* <button onClick={()=> handleDeleteCard(card._id)}>X</button> */}
          {/* <Link to={`decks/${deck._id}`}>{deck.title}</Link> */}
          {card}
          </li>)}
      </ul>

      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input id="card-text" 
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}
