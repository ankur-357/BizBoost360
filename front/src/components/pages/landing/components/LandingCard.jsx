import "./LandingCard.component.css";
import Frame from "../../../../assets/LandingNew/Frame.png";
import Frame2 from "../../../../assets/LandingNew/Frame2.png";
import Frame3 from "../../../../assets/LandingNew/Frame3.png";

const LandingCard = () => {
  const cardsData = [
    {
      title: "REGISTRATION",
      text: "You can register your products and add details such as product name, description, price, quantity, etc.",
      imageSrc: Frame,
    },
    {
      title: "INVENTORY",
      text: "You can monitor the movement of your products, including their entry and exit, and stay up to date when your inventory levels are low.",
      imageSrc: Frame2,
    },
    {
      title: "SALES",
      text: "All in one place, a comprehensive solution for inventory and sales management.",
      imageSrc: Frame3, // Replace with the URL of your image
    },
  ];

  return (
    <div className="landingcard-container">
      <h2>What does <span>BizBoost360</span> offer?</h2>
      <div className="landingcard">
        {cardsData.map((card, index) => (
          <div key={index} className="landingcard-card">

            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingCard;
