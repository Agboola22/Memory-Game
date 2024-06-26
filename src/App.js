import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Component/SingleCard';

const cardImages = [
  { 'src': 'img/helmet-1.png', matched: false },
  { 'src': 'img/potion-1.png', matched: false },
  { 'src': 'img/ring-1.png', matched: false },
  { 'src': 'img/scroll-1.png', matched: false },
  { 'src': 'img/shield-1.png', matched: false },
  { 'src': 'img/sword-1.png', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards at random and add id class
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // set the choices of card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(() => {
    shuffleCards()
  }, [])

  // comapre two selected choices and update the matched states
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  // console.log(choiceOne, choiceTwo, turns)
  // console.log(cards)

  //reset choices and turns 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  return (
    <div className="App">
      <h1><span className='emoji'>❤</span> Magic Match <span className='emoji'>❤</span></h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>


      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
