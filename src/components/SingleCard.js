import "./SingleCard.css"
import back from "../images/back.jpg";


function SingleCard({ card, handleChoice, flipped }) {

    const handleClick = () => {
      handleChoice(card)
    }

    return (
    <div className="card" key={card.id}>
        <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} onClick={handleClick} alt="card-front"></img>
            <img className="back" src={back} onClick={handleClick} alt="card-back"></img>
        </div>
    </div>
    )

}
export default SingleCard;
