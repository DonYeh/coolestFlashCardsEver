
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import './deck.scss';
import { deleteDeck } from './api/deleteDecks';
import { createDeck } from './api/createDeck';
import { getDecks, TDeck } from './api/getDecks';
import { createCard } from './api/createCard';
import { useParams } from 'react-router-dom';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';
import Card from './Card';
import CardSlider from './CardSlider'
import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';


type Card = {
  text: string;
  definition: string;
  // _id: string;
}

const schema = yup.object().shape({
  text: yup.string().required(),
  definition: yup.string().required(),
  // _id: yup.string()
})

export default function Deck() {
  
  type flippedCardStatus = {
    [userId: number]: boolean;
  }

  enum switchMode {
    study = 'study',
    quiz = 'quiz',
  }

  enum switchView {
    grid = 'grid',
    carousel = 'carousel'
  }

  const {register, control, handleSubmit, setValue, formState: {errors}} = useForm<Card>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: '',
      definition: ''
    },
  
  });

  const [deck,setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<Card[]>([]);
  const [text, setText] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const [mode, setMode] = useState<switchMode>(switchMode.study)
  const [view, setView] = useState<switchView>(switchView.grid)
  const [flippedCard, setFlippedCard] = useState<flippedCardStatus>({})
  const { deckId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);


  const cardBack = useRef<HTMLDivElement>(null);
  const cardFront = useRef<HTMLDivElement>(null);

  const cardSubmitHandler: SubmitHandler<Card> = async ({text, definition}: Card ) => {
    const { cards: serverCards } = await createCard(deckId!, text, definition)
    console.log('inside handleCreateCard', cards )
    setCards(serverCards)
    setText("");
    setDefinition("");
    setValue("text", "")
    setValue("definition", "")

    console.log('view: ', view)
    if (view === 'carousel') {
      console.log('carousel')
      setCurrentIndex(currentIndex+1)

    } 
    }

  async function handleDeleteCard(cardId: number) {

    if(!deckId){ console.log('no deckID'); return} ;
    console.log('inside handleDeleteCard, X button clicked')
    console.log('inside handleDeleteCard, deckId: ', deckId)
    console.log('inside handleDeleteCard, cardId: ', cardId)
    // if(!deckId || !cardId) return;
    const newDeck = await deleteCard(deckId, cardId)
    console.log('after new deck, deleteCard called')
    setCards(newDeck.cards);        
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

  const handleModeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    mode == switchMode.study ? setMode(switchMode.quiz) : setMode(switchMode.study)
  }

  const handleViewSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    view == switchView.grid ? setView(switchView.carousel) : setView(switchView.grid)
    setCurrentIndex(0)
  }

  const handleFlip = (cardId: number) => {
    setFlippedCard(state => ({...state, [cardId]: !state[cardId]}))
  }

  // console.log('view', view)
  // console.log('cards in Deck', cards)
  // console.log('Deck, cardFront: ', cardFront)

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

  // console.log('Deck, cardId', cardId)

  //TODO: 
  // 1. add flip card button and animation to card, put title on front, definition on back
  // 2. add study mode that displays the title + definition and quiz mode that separates title/definition on front/
  //    back
  // fix the close button issue when clicking the X button, it flips the card then closes. Need to isolate the    
  //   click event
  // research mobile device detection. If on a desktop, add onHover events that only show the X button on hover. 
  // add styling to the decks
  // add header 
  // add carousel mode 
  // 3. themes - light/dark mode
  // 4. stretch goals: upload picture/sound to definitions, could possibly pull images from some API/AI

  return (
    <div className="deck">
      
      {view == 'grid' ? 

        <ul className="cards">
          {cards.map((card, cardId) => 
            <li key={cardId}>
                <Card 
                  card={card}
                  cardBack={cardBack} 
                  cardFront={cardFront}
                  cardId={cardId} 
                  flippedCard={flippedCard} 
                  handleDeleteCard={handleDeleteCard} 
                  handleFlip={handleFlip} 
                  mode={mode}
                  view={view}
                />
            </li>)}
        </ul> 
        :
        <CardSlider 
          cards={cards}
          cardBack={cardBack} 
          cardFront={cardFront} 
          flippedCard={flippedCard}  
          handleFlip={handleFlip} 
          handleDeleteCard={handleDeleteCard} 
          mode={mode} 
          view={view}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      }

      <form className="Deck__form" onSubmit={handleSubmit(cardSubmitHandler)}>
        <Controller 
          name='text'
          control={control}
          defaultValue=""
          render={({field}) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Card Text"
              variant="outlined"
              error={!!errors.text}
              helperText={errors.text ? errors.text?.message : ''}
            />
          )}
        />
        <Controller 
          name='definition'
          control={control}
          defaultValue=""
          render={({field}) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Card Definition"
              variant="outlined"
              error={!!errors.definition}
              helperText={errors.definition ? errors.definition?.message : ''}
            />
          )}
        />
        <Button component="button"variant="contained" type="submit">Create Card</Button>
      </form>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Study</Typography>
        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={handleModeSwitch} checked={mode == 'study' ? false : true}/>
        <Typography>Quiz</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Grid</Typography>
        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={handleViewSwitch} checked={view == 'carousel' ? true : false}/>
        <Typography>Carousel</Typography>
      </Stack>
    </div>
  )
}
