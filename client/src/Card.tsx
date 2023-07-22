import { useEffect, useState, useRef } from 'react';
import CSS from 'csstype';
// import { flippedCardStatus } from './Deck';

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

//TODO: align the left/right arrows at all breakpoints

export default function Card({ card, cardBack, cardFront, cardId, flippedCard, goToNext, goToPrevious, handleDeleteCard, handleFlip, mode, view }: CardProps) {

    console.log('mode: ', mode)
    console.log('view: ', view)
    
return (
    <div 
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
{ view === 'carousel' && <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div> }
        {/* <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div> */}

        <button 
            className={`cardButton ${view == 'carousel' ? 
            'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}     
            onClick={()=> handleDeleteCard(cardId)}>X</button>
        <div className={`cardDiv ${flippedCard[cardId] ? 'flip' : ''}`} >
            <div className={`front ${flippedCard[cardId] ? 'hidden' : ''}`} ref={cardFront}> 
                {mode == 'study' ? 
                    <>
                        <div className="text study">
                            {card?.text}
                        </div>
                        <div className="definition">
                            {card?.definition}
                        </div>
                    </>
                    :
                        <div className="text">
                          {card?.text}
                        </div> 
                }
            </div>
            <div className={`back ${flippedCard[cardId] ? '' : 'hidden'}`} ref={cardBack}>
                <div className="cardBack">
                    {card.definition}
                </div>
            </div>
        </div>
{ view === 'carousel' && <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
        </div> }
        {/* <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
        </div>  */}

    </div>
)

} 



