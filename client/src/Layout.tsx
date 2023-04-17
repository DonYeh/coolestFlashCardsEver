import {Header} from './Header';
import {Outlet, useOutletContext} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDecks, TDeck } from './api/getDecks';


const Layout = () => {
  const [decks, setDecks] = useState<TDeck[]>([]);

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
      // console.log('App.tsx useEffect', newDecks);
    }
    fetchDecks();
 
  }, []);

  console.log('inside Layout. decks:', decks);

    return(
    <>
    <Header decks={decks}/>
    <Outlet context={[decks,setDecks]}/>
    </>
    )
}

export default Layout;