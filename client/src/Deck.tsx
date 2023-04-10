
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
  const [cards, setCards] = useState<object[]>([]);
  const [text, setText] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const { deckId } = useParams();

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text, definition)
    console.log('inside handleCreateCard', cards )
    setCards(serverCards)
    setText("");
    setDefinition("");

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

  //TODO: 
  // 1. add flip card button and animation to card, put title on front, definition on back
  // 2. add study mode that displays the title + definition and quiz mode that separates title/definition on front/back
  // 3. themes - light/dark mode
  // 4. stretch goals: upload picture/sound to definitions, could possibly pull images from some API/AI

  return (
    <div className="deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, cardId) => <li key={cardId}>
          
          <button onClick={()=> handleDeleteCard(cardId)}>X</button>
          {card.text}{card.definition}
          </li>)}
      </ul>
          {/* <Link to={`decks/${deck._id}`}>{deck.title}</Link> */}

      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input id="card-text" 
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
        <label htmlFor="card-definition">Card Definition</label>
        <input id="card-definition" 
        value={definition}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefinition(e.target.value)}
      />
        <button>Create Card</button>
      </form>
    </div>
  )
}
