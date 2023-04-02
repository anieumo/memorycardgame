import './App.css';
import React, { useState, useEffect } from "react";
import back from "./images/back.jpg";
import one from "./images/1.jpeg";
import SingleCard from './components/SingleCard.js';

const cardImages = [
  { "src": require("./images/1.jpeg"), matched: false },
  { "src": require("./images/2.jpeg"), matched: false },
  { "src": require("./images/3.jpeg"), matched: false },
  { "src": require("./images/4.jpg"), matched: false },
  { "src": require("./images/5.jpeg"), matched: false },
  { "src": require("./images/6.jpeg"), matched: false },
  { "src": require("./images/7.jpeg"), matched: false },
  { "src": require("./images/8.jpeg"), matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)


  const shuffleCards = () => {
    //double cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)


  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  //compare two selected cards fires at begining of app init and ag
  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1.src === choice2.src) {
        // update cards state
        setCards(prevCards => {
          // take in the previous card state to upadte the state
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return {...card, matched: true}
              // creates a matched property for each card
            } else {
              // return card property 
              return card

            }
           })
        })
        console.log("match")
        reset()
      } else {
        console.log("not match")
        setTimeout(() => reset(), 1000)      
      }
    }
  }, [choice1, choice2])

  const reset = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurns => prevTurns + 1)
  }



  return (
    <div className="App-header">
      <h1>Memory card game</h1>
      <button classname="button" onClick={shuffleCards}>New Game</button>

      <div className="cardgrid">
        {/* <img src={"./images/1.jpeg"}></img> */}
        {cards.map(card => (
          /// pass key={card.id} in Singlecard div and pass prop 
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choice1 || card === choice2 || card.matched}/>
          // <div className="card" key={card.id}>
          //   <div>
          //     <img className="front" src={card.src} alt="card-front"></img>
          //     {/* <img className="back" src={back} alt="car-back"></img> */}
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default App;
