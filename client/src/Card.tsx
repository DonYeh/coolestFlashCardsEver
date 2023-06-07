import { useEffect, useState, useRef } from 'react';
// import { flippedCardStatus } from './Deck';

type CardProps = {
    card: {text: string; definition: string; _id: number};
    cardBack: {current: string};
    cardFront: {current: string};
    cardId: number;
    flippedCard: {[cardId: number]: boolean};
    handleDeleteCard: (cardId: number) => void;
    handleFlip: (cardId: number, reset?: boolean) => void;
    mode?: string | null;
    view?: string | null;
}

export default function Card({ card, cardBack, cardFront, cardId, flippedCard, handleDeleteCard, handleFlip, mode, view }: CardProps) {
    
return (
    <div 
        // convert this div to a Grid component
        // sx={{ width: {
        // xs: '80%',
        // sm: '100%'}}} 
        className={`cardContainer ${view == 'carousel' ? 
        'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}  
        onClick={ 
            () => handleFlip(cardId)}
           
            >
        <button 
            className={`cardButton ${view == 'carousel' ? 
            'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}     
            onClick={()=> handleDeleteCard(cardId)}>X</button>
        <div className={`cardDiv ${flippedCard[cardId] ? 'flip' : ''}`} >
            <div className={`front ${flippedCard[cardId] ? 'hidden' : ''}`} ref={cardFront}> 
                {mode == 'study' ? 
                    <>
                        <div className="text">
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
    </div>
)

} 



