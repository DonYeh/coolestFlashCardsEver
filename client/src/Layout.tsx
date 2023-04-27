import Header from './Header';
import {Outlet, useOutletContext} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDecks, TDeck } from './api/getDecks';


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
    <Header decks={decks} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
    <Outlet context={[selectedDeck,setSelectedDeck]}/>
    </>
    )
}

export default Layout;