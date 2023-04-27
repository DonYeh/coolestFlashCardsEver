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
import { useOutletContext } from "react-router-dom";

type Decks = {
  title: string;
}

const schema = yup.object().shape({
  title: yup.string().required()
})

function App() {

  const [selectedDeck, setSelectedDeck] = useOutletContext();

  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>('')

  const {register, control, handleSubmit, setValue, formState: {errors}} = useForm<Decks>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: ''
    },
  
  });

  const deckSubmitHandler: SubmitHandler<Decks> = async ({title}: Decks, ) => {
    const newDeck = await createDeck(title)
    setDecks([...decks, newDeck])
    setTitle("");
    setValue("title","");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter((deck)=> deck._id !== deckId));
  }

 const linkHandler = (selectedDeckTitle: string) => {
  console.log('inside linkHandler, selectedDeckTitle: ', selectedDeckTitle)
  setSelectedDeck(selectedDeckTitle)
 }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
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
          <Link onClick={()=>linkHandler(deck.title)} to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>)}
      </ul>

      <form className="App__form" onSubmit={handleSubmit(deckSubmitHandler)}>
        <Controller 
          name='title' 
          control={control} 
          defaultValue=""
          render={({field}) => (
            <TextField 
              {...field}
              id="outlined-basic" 
              label="Deck Title"  
              variant="outlined" 
              error={!!errors.title} 
              helperText={errors.title ? errors.title?.message : ''}
            />
          )}
        />
        <Button component="button"variant="contained" type="submit">Create Deck</Button>
      </form>
    </div>
  )
}

export default App
