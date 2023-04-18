import { useState } from "react";
import './cardslider.css'
import Typography from '@mui/material/Typography';

const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursorre: "pointer",
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
  


function CardSlider({cards, mode, flippedCard, switchMode, cardFront, cardBack}) {
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
    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${cards[currentIndex].text})`,
    };
    console.log('inside cardSlider, cards: ', cards)
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
        <div style={slideStylesWidthBackground}>
            {/* <ul className="cards">
        {cards.map((card, cardId) => <li key={cardId} className={`card ${flippedCard[cardId] ? 'flip' : ''}`} onClick={() => handleFlip(cardId)} >
              <button className={`button ${flippedCard[cardId] ? 'flip' : ''}`} onClick={()=> handleDeleteCard(cardId)}>X</button>
            
            <div className={`cardDiv ${flippedCard[cardId] ? 'flip' : ''}`} >
              <div className={`front ${flippedCard[cardId] ? 'hidden' : ''}`} ref={cardFront}> 
              {mode == 'study' ? 
                <>
                  <div className="text">
                    {card.text}
                  </div>
                  <div className="definition">
                    {mode == 'study' ? card.definition : ''}
                  </div>
                </>
                :
                <div className="text">
                  {card.text}
                </div> 
              }
              </div>
              
              <div className={`back ${flippedCard[cardId] ? '' : 'hidden'}`} ref={cardBack}>
                <div className="cardBack">
                  {card.definition}
                </div>
              </div>
            </div>
          </li>)}
          </ul> */}
        { mode == 'study' ?
            <>
                <div>
                    {cards[currentIndex].text}
                </div>
                <div>
                    {cards[currentIndex].definition}
                </div>
            </>
            :
            <div>
                {cards[currentIndex].text}
            </div>
        }        
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