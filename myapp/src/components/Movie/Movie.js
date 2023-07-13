import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  title,
  ageRating,
  imageUrl,
  price,
  description,
  releaseDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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

  const handleBuyTicket = () => {
    // Open page to choose seats and pass the movie ID
    navigate(`/movie/${id}/choose-seats`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
          <div
            className="modal-overlay absolute inset-0 bg-gray-800 bg-opacity-40"
            onClick={closeModal}
          >
            <div
              className="modal bg-white rounded-lg p-4 w-full sm:max-w-md z-50"
              ref={modalRef}
            >
              <div className="modal-content">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="mb-4">{description}</p>
                <p className="text-gray-500">Release Date: {releaseDate}</p>
                <p className="text-gray-500">Price: RP.{price}</p>
                <div className="mt-6 flex justify-end">
                  <button
                    className="btn btn-blue mr-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={handleBuyTicket}
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
