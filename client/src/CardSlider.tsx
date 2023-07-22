import { useState } from "react";
import './cardslider.css'
import { Box } from  '@mui/material';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';


import Typography from '@mui/material/Typography';
import Card from './Card';
import CSS from 'csstype';

const sliderStyles: CSS.Properties = {
  position: "relative",
  height: "100%",
  //media query here to show 88% at sm size
  // @media (min-width: 600px) {
  //   backgroundColor: "blue"
  // }
};

const slideStyles: CSS.Properties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    borderRadius: "10px",
 
  };

  const cardStyle: CSS.Properties = {
    width: "653px",
    height: "400px",
  }
  //TODO: add hover to right and left arrows
  const rightArrowStyles: CSS.Properties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "-50px",
    fontSize: "60px",
    color: "#1976d2",
    zIndex: 1,
    cursor: "pointer",
    
    // hover: {
    // "&:hover": {
    //   color:"purple",
    // }}
  };
  
  const leftArrowStyles: CSS.Properties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "-50px",
    fontSize: "60px",
    color: "#1976d2",
    zIndex: 1,
    cursor: "pointer",
  };
  
  
  const dotsContainerStyles: CSS.Properties = {
    display: "flex",
    justifyContent: "center",
  };
  
  type CardSliderProps = {
    cards: {text: string; definition: string; _id: number}[];
    cardBack: {current: string};
    cardFront: {current: string};
    currentIndex: number;
    flippedCard: {[cardId: number]: boolean};
    handleDeleteCard: (cardId: number) => void;
    handleFlip: (cardId: number, reset?: boolean) => void;
    mode: string;
    setCurrentIndex: (currentIndex:number) => void;
    view: string;
}

function CardSlider({cards, cardBack, cardFront, currentIndex, flippedCard, handleFlip, handleDeleteCard, mode, setCurrentIndex, view}: CardSliderProps) {
  
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'));
  
  //TODO: flip the previous card back to front when going to next card
  const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? cards.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      // handleFlip(() => handleFlip(newIndex))
      handleFlip(newIndex+1,true)
      console.log('in Prev, newIndex',newIndex)
      console.log('in Prev, flippedCard',flippedCard)

    };
    const goToNext = () => {
      const isLastSlide = currentIndex === cards.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      handleFlip(newIndex-1,true)
      console.log('in Next, newIndex',newIndex)
      console.log('in Next, flippedCard',flippedCard)


    };
    const goToSlide = (cardIndex: number) => {
      setCurrentIndex(cardIndex);
    };

    console.log('CardSlider, card[currentIndex]: ', cards[currentIndex])
    console.log('CardSlider, currentIndex: ', currentIndex)
  
    return (
      <Box style={sliderStyles} sx={{width: {
        xs: '100%',
        sm: '80%',
        md: '100%'
      } }}>
        {/* <div>
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
        </div> */}
        <div style={slideStyles}>
        {/* <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>   */}
            <Card 
                card={cards[currentIndex]}
                cardBack={cardBack} 
                cardFront={cardFront}
                cardId={currentIndex} 
                flippedCard={flippedCard}
                goToNext={goToNext} 
                goToPrevious={goToPrevious} 
                //why does handleDeleteCard not work in carousel view???? 
                // handleDeleteCard={() => handleDeleteCard(cards[currentIndex]._id)}
                // handleDeleteCard={()=>handleDeleteCard(currentIndex)}
                handleDeleteCard={()=>{
                  handleDeleteCard(currentIndex);
                  setCurrentIndex(currentIndex-1)
                }}
                handleFlip={handleFlip} 
                mode={mode}
                view={view}
            />
            {/* <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div> */}
        </div>
        <div style={dotsContainerStyles}>
          {cards.map((card, cardIndex) => (
            <div
              className={cardIndex === currentIndex ? "dotStyle active" : "dotStyle"}
              key={cardIndex}
              onClick={() => {
                console.log('inside dotStyle, cardIndex: ', cardIndex)
                goToSlide(cardIndex)}}
            >
                ●
            </div>
          ))}
        </div>
      </Box>
    );
}

export default CardSlider