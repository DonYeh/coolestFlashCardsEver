import { useEffect, useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import './App.scss';
import { deleteDeck } from './api/deleteDecks';
import { createDeck } from './api/createDeck';
import { getDecks, TDeck } from './api/getDecks';


function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>('')

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const newDeck = await createDeck(title)
    setDecks([...decks, newDeck])
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter((deck)=> deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
      console.log('App.tsx useEffect', newDecks);
    }
    fetchDecks();
 
  }, []);

  return (
    <div className="App">
      <h1>Decks</h1>
      <ul className="App__decks">
        {decks.map((deck)=> <li key={deck._id}>
          {/*TODO: hide the X button until you hover over the card*/}
          <button onClick={()=> handleDeleteDeck(deck._id)}>X</button>
          <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>)}
      </ul>

      <form className="App__form"onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title" 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
