
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

import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function Deck() {

  enum switchMode {
    study = 'study',
    quiz = 'quiz',
  }

  const [deck,setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<object[]>([]);
  const [text, setText] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const [mode, setMode] = useState<switchMode>(switchMode.quiz)
  const { deckId } = useParams();

  // enum switchMode {
  //   quiz = '1',
  //   study = '0',
  // }

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


  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('e.target.value', e.target.value)
    console.log('e.target.checked', e.target.checked)
    const { value, checked } = e.target;
    mode == switchMode.study ? setMode(switchMode.quiz) : setMode(switchMode.study)
    console.log('mode', mode)
    // setMode('quiz')
    // setMode('study')
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
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Study</Typography>
        {/* <AntSwitch  inputProps={{ 'aria-label': 'ant design' }} /> */}
        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={handleSwitch} checked={mode == 'study' ? true : false}/>
        <Typography>Quiz</Typography>
      </Stack>
    </div>
  )
}
