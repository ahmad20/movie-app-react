import React, { useState, useRef, useEffect } from 'react';

const Card = ({ title, ageRating, imageUrl, price, description, releaseDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const handleCardClick = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleClickOutsideModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeModal();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideModal);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, []);
    
    return (
    <div className="card" onClick={handleCardClick}>
        <div className="card-badge">{ageRating}+</div>
        <img src={imageUrl} alt="img" className="card-image" />
        <div className="card-content">
            <h2 className="card-title">{title}</h2>
        </div>
    {isModalOpen && (
        <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
                <div className="modal-content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>Release Date: {releaseDate}</p>
                    <p>Price: {price}</p>
                    <button>Buy Ticket</button>
                </div>
            </div>
        </div>
    )}
    </div>
  );
};

export default Card;
