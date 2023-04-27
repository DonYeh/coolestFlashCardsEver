import { useEffect, useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import './App.scss';
import { deleteDeck } from './api/deleteDecks';
import { createDeck } from './api/createDeck';
import { getDecks, TDeck } from './api/getDecks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';


type Decks = {
  title: string;
}

const schema = yup.object().shape({
  title: yup.string().required()
})

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>('')



  const {register, control, handleSubmit, watch, formState: {errors}} = useForm<Decks>({
    resolver: yupResolver(schema)
  });

  const deckSubmitHandler: SubmitHandler<Decks> = async ({title}: Decks, e: React.FormEvent) => {
    console.log('title: ', title)
    e.preventDefault();
    const newDeck = await createDeck(title)
    setDecks([...decks, newDeck])
    setTitle("");
  }

  console.log('errors: ', errors)
  console.log('watch variable title: ', watch('title'))

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

      <form className="App__form" onSubmit={handleSubmit(deckSubmitHandler)}>
        <Controller 
          name='title' 
          control={control} 
          render={({field}) => (
            <TextField 
              {...field}
              {...register('title')} 
              id="outlined-basic" 
              label="Deck Title"  
              variant="outlined" 
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} error={!!errors.title} helperText={errors.title ? errors.title?.message : ''}
            />
          )}
        />
        <Button component="button"variant="contained" type="submit">Create Deck</Button>
      </form>
    </div>
  )
}

export default App
