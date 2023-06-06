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
import { Card, Grid, CardActionArea } from '@mui/material'

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

  console.log('inside App, decks: ', decks)
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


  // xs, extra-small: 0px.
  // sm, small: 600px.
  // md, medium: 900px.
  // lg, large: 1200px.
  // xl, extra-large: 1536px.

  return (
    <Grid container className="App">
      {/* <h1>Decks</h1> */}
            {/*TODO: hide the X button until you hover over the card*/}
      <Grid item container className="App__decksContainer" spacing={2}>
        {/* <ul className="App__decksContainer"> */}
          {decks.map((deck) => 
          <Grid item container xs={12} sm={6} md={4} lg={3} xl={2.5} className='App__deckContainer' >
          {/* <Grid item className='App__decksCard' > */}
            {/* <li key={deck._id} className='App__decksCard'> */}
              {/* <Grid item> */}
                <Card className="App_deckCard">
                    <button onClick={()=> handleDeleteDeck(deck._id)} className="App_deckCard--button">X</button>
                  <CardActionArea component={Link} to={`decks/${deck._id}`} className="App_cardActionArea">
                    {deck.title}
                  </CardActionArea>
                </Card>
                {/* </Grid> */}
            {/* </li> */}
            </Grid>)}
        {/* </ul> */}
      </Grid>
      <Grid container item xs={12} className="App_formContainer">
        <form className="App__form" onSubmit={handleSubmit(deckSubmitHandler)}>
            <Grid container>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          {/* TODO: add media query for TextField and Button to widen and padding top/bottom at xs breakpoint */}
          <Grid item xs={12} sm={6}>
            <Button component="button"variant="contained" type="submit" >Create Deck</Button>
          </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default App
