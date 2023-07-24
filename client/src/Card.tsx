import { useEffect, useState, useRef } from 'react';
import CSS from 'csstype';
import { Box } from  '@mui/material';

// import { flippedCardStatus } from './Deck';

    const rightArrowStyles: CSS.Properties = {
    position: "absolute",
    // top: "50%",
    // transform: "translate(0, -50%)",
    // right: "-3.125rem",
    // fontSize: "3.75rem",
    color: "#1976d2",
    zIndex: 1,
    cursor: "pointer",
   
    // transform: "none",
    
    // hover: {
    // "&:hover": {
    //   color:"purple",
    // }}
  };
  
  const leftArrowStyles: CSS.Properties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    // left: "-3.125rem",
    // fontSize: "3.75rem",
    color: "#1976d2",
    zIndex: 1,
    cursor: "pointer",
  };

type CardProps = {
    card: {text: string; definition: string; _id: number};
    cardBack: {current: string};
    cardFront: {current: string};
    cardId: number;
    flippedCard: {[cardId: number]: boolean};
    goToNext: () => void;
    goToPrevious: () => void;
    handleDeleteCard: (cardId: number) => void;
    handleFlip: (cardId: number, reset?: boolean) => void;
    mode?: string | null;
    view?: string | null;
}

//TODO: align the left/right arrows at all breakpoints, when card is flipped, the arrows also flip. try to get it so that the arrows don't flip with the card

export default function Card({ card, cardBack, cardFront, cardId, flippedCard, goToNext, goToPrevious, handleDeleteCard, handleFlip, mode, view }: CardProps) {

    console.log('mode: ', mode)
    console.log('view: ', view)
    console.log('flippedCard: ', flippedCard)
    
return (
    <Box 
        // convert this div to a Grid component
        // sx={{ width: {
        // xs: '80%',
        // sm: '100%'}}} 
        // if study mode, add padding-bottom: 1rem to the text to separate from definition
        className={`cardContainer ${view == 'carousel' ? 
        'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}  
        onClick={ 
            () => handleFlip(cardId)}
           
            >
        { view === 'carousel' && <Box className="cardContainerRightArrow" onClick={flippedCard[cardId] === true ? goToPrevious : goToNext} style={rightArrowStyles} sx={{fontSize: { xs: "3rem", sm: "3.75rem", md: "5rem", lg: "6rem"}, right: {xs: "-3.125rem", md: "-5rem", lg: "-6rem" }}}>
            ❱
        </Box> }
        

        <button 
            className={`cardButton ${view == 'carousel' ? 
            'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}     
            onClick={()=> handleDeleteCard(cardId)}>X</button>
        <Box className={`cardDiv ${flippedCard[cardId] ? 'flip' : ''}`} sx={view == 'carousel'? {fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3.5rem'}}:{}}>
            <Box className={`front ${flippedCard[cardId] ? 'hidden' : ''}`} ref={cardFront}> 
                {mode == 'study' ? 
                    <>
                        <Box className="text study">
                            {card?.text}
                        </Box>
                        <Box className="definition">
                            {card?.definition}
                        </Box>
                    </>
                    :
                        <Box className="text">
                          {card?.text}
                        </Box> 
                }
            </Box>
            <Box className={`back ${flippedCard[cardId] ? '' : 'hidden'}`} ref={cardBack}>
                <Box className="cardBack">
                    {card.definition}
                </Box>
            </Box>
        </Box>
        { view === 'carousel' && <Box onClick={flippedCard[cardId] === true ? goToNext : goToPrevious} style={leftArrowStyles} sx={{fontSize: { xs: "3rem", sm: "3.75rem", md: "5rem", lg: "6rem"}, left: {xs: "-3.125rem", md: "-5rem", lg: "-6rem" }}}>
            ❰
        </Box> }
        

    </Box>
)

} 



