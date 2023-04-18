import { useState } from "react";
import './cardslider.css'
import Typography from '@mui/material/Typography';
import Card from './Card';

const slideStyles = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    borderRadius: "10px",
 
  };

  const cardStyle = {
    width: "600px",
    height: "400px",
  }
  
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const sliderStyles = {
    position: "relative",
    height: "100%",
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  


function CardSlider({cards, cardBack, cardFront, flippedCard, handleFlip, handleDeleteCard, mode, view}) {
    const [currentIndex, setCurrentIndex] = useState(0);
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
    const goToSlide = (cardIndex) => {
      setCurrentIndex(cardIndex);
    };
 
    console.log('inside cardSlider, cards: ', cards)
    console.log('inside cardSlider, cards ID: ', cards[currentIndex]._id)
    console.log('inside cardSlider, currentIndex: ', currentIndex)
  
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
                cardId={cards[currentIndex]._id} 
                flippedCard={flippedCard} 
                //why does handleDeleteCard not work in carousel view????
                handleDeleteCard={handleDeleteCard} 
                handleFlip={handleFlip} 
                mode={mode}
                view={view}
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