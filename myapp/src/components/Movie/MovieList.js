import React, { useEffect, useState } from "react";
import Card from "./Movie";

const CardList = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/movies`);
      const data = await response.json();
      setCards(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          ageRating={card.age_rating}
          imageUrl={card.poster_url}
          price={card.ticket_price}
          description={card.description}
          releaseDate={card.release_date}
        />
      ))}
    </div>
  );
};

export default CardList;
