import React, { useEffect, useState } from 'react';
import Card from './Card';

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://seleksi-sea-2023.vercel.app/api/movies');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          ageRating={card.age_rating}
          imageUrl={card.poster_url}
          price={card.ticket_price} // Add price prop
          description={card.description} // Add description prop
          releaseDate={card.releaseDate} // Add releaseDate prop
        />
      ))}
    </div>
  );
};

export default CardList;
