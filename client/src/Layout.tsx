import Header from './Header';
import './Layout.scss'
import {Outlet, useOutletContext} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDecks, TDeck } from './api/getDecks';
import { Box } from '@mui/material'

const Layout = () => {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState("")

  console.log('SelectedDeck inside Layout: ', selectedDeck)

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
      console.log('App.tsx useEffect', newDecks);
    }
    fetchDecks();
 
  }, []);

  console.log('inside Layout. decks:', decks);

    return(
    <>
      <Box classname="appContainer">
        <Header decks={decks} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
        <Outlet context={[selectedDeck,setSelectedDeck]}/>
      </Box>
    </>
    )
}

export default Layout;