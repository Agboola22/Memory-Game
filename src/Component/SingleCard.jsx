import React from 'react';
import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className='card' >
            <div className={flipped ? 'flipped' : ''}>
                <img src={card.src} className='Front' alt='card front' />
                <img
                    src='/img/cover.png'
                    className='Back'
                    alt='card back'
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default SingleCard