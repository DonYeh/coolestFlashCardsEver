import { useState } from "react";
import './cardslider.css'
import Typography from '@mui/material/Typography';
import Card from './Card';
import CSS from 'csstype';

const sliderStyles: CSS.Properties = {
  position: "relative",
  height: "100%",
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
  
  const rightArrowStyles: CSS.Properties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "-33px",
    fontSize: "60px",
    color: "#1976d2",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const leftArrowStyles: CSS.Properties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "-33px",
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
    handleFlip: (cardId: number) => void;
    mode: string;
    setCurrentIndex: (currentIndex:number) => void;
    view: string;
}

function CardSlider({cards, cardBack, cardFront, currentIndex, flippedCard, handleFlip, handleDeleteCard, mode, setCurrentIndex, view}: CardSliderProps) {
    // const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? cards.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currentIndex === cards.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
    const goToSlide = (cardIndex: number) => {
      setCurrentIndex(cardIndex);
    };

    console.log('CardSlider, card[currentIndex]: ', cards[currentIndex])
    console.log('CardSlider, currentIndex: ', currentIndex)
  
    return (
      <div style={sliderStyles}>
        <div>
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
        </div>
        <div style={slideStyles}>        
            <Card 
                card={cards[currentIndex]}
                cardBack={cardBack} 
                cardFront={cardFront}
                cardId={currentIndex} 
                flippedCard={flippedCard} 
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
                style={cardStyle}
            />
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
      </div>
    );
}

export default CardSlider