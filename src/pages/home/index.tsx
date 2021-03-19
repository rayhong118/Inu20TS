import { url } from "inspector";
import React from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import WIP from "../../shared/components/wip";
import { ROUTES } from "../../shared/constants/routes";
import "./home.scss";

const HomePageComponent = () => {
  const cardConfigs: MainPageCardProps[] = [
    {
      title: "Chat",
      text: "Real time chat page",
      href: ROUTES.CHAT,
      imageUrl: "./logo512.png",
    },
    {
      title: "Restaurant Archive",
      text: "List of restaurants",
      href: ROUTES.RESTAUTANT,
      imageUrl: "./logo192.png",
    },
  ];
  return (
    <div className="page">
      <WIP />
      <p>HomePage</p>
      <span>CSS is my passion</span>
      <p>
        This personal site is built without using UI libraries (e.g. Boorstrap,
        Material UI, Semantic UI)
      </p>
      <div className="mainpage-cards-container">
        {cardConfigs.map((card) => {
          return (
            <NavLink to={card.href} className="mainpage-card" key={card.title}>
              <MainpageCard {...card} />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default HomePageComponent;

interface MainPageCardProps {
  title: string;
  text: string;
  imageUrl?: string;
  imgDescription?: string;
  href: string;
}

const MainpageCard: React.FC<MainPageCardProps> = (props) => {
  let history = useHistory();
  return (
    <>
      <div className="img-container">
        <img src={props.imageUrl} alt={props.imgDescription} />
      </div>

      <h3>{props.title}</h3>
      <span>{props.text}</span>
    </>
  );
};
