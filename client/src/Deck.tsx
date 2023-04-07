
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './deck.css';
import { deleteDeck } from './api/deleteDecks';
import { createDeck } from './api/createDeck';
import { getDecks, TDeck } from './api/getDecks';
import { createCard } from './api/createCard';
import { useParams } from 'react-router-dom';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';

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

  async function handleDeleteCard(cardId: number) {
    if(!deckId) return;
    const newDeck = await deleteCard(deckId, cardId)
    setCards(newDeck.cards);
        
        // cards.filter((card)=> card._id !== cardId));
  }

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
    <div className="deck">
      <ul className="cards">
        {cards.map((card, cardId)=> <li key={cardId}>
          
          <button onClick={()=> handleDeleteCard(cardId)}>X</button>
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
