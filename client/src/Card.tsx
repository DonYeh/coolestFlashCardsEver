import { useEffect, useState, useRef } from 'react';



export default function Card({ card, cardBack, cardFront, cardId, flippedCard, handleDeleteCard,handleFlip, mode, view }) {

    console.log('Card, view: ', view)
    console.log('Card, cardId: ', cardId)
    

return (
    <div 
        className={`cardContainer ${view == 'carousel' ? 
        'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}  
        onClick={() => handleFlip(cardId)} >
        <button 
            className={`cardButton ${view == 'carousel' ? 
            'carousel': ''} ${flippedCard[cardId] ? 'flip' : ''}`}     
            onClick={()=> handleDeleteCard(cardId)}>X</button>
        <div className={`cardDiv ${flippedCard[cardId] ? 'flip' : ''}`} >
            <div className={`front ${flippedCard[cardId] ? 'hidden' : ''}`} ref={cardFront}> 
                {mode == 'study' ? 
                    <>
                        <div className="text">
                            {card.text}
                        </div>
                        <div className="definition">
                            {card.definition}
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
    </div>
)

} 



