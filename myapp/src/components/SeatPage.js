import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SeatPage = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [seatsAvailable, setSeats] = useState([]);
  const [movie, setMovie] = useState("");
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const storedSelectedSeats = localStorage.getItem("selectedSeats");
    if (storedSelectedSeats) {
      setSelectedSeats(JSON.parse(storedSelectedSeats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const handleSeatClick = (seatId) => {
    const isBooked = seatsAvailable.find(
      (seat) => seat.Row.concat(seat.Number) === seatId
    )?.Booked;
    if (!isBooked) {
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.filter((seat) => seat !== seatId)
        );
      } else {
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
      }
    }
  };

  const fetchMovieDetails = () => {
    fetch(`${url}/movie/details/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.code === 200) {
          // Reset form field
          setMovie(data.data);
          setSeats(data.data.seats);
        } else {
          navigate(`/movie/${id}/choose-seats`);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        navigate(`/movie/${id}/choose-seats`);
      });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const handleBookSeats = () => {
    const cookieValue = cookies.token;
    const seatsToBook = selectedSeats.map((seatId) => {
      const row = seatId.substring(0, 1);
      const number = parseInt(seatId.substring(1));
      return { row, number };
    });

    const requestBody = {
      seats: seatsToBook,
    };

    fetch(`${url}/user/buy-ticket/${id}`, {
      method: "POST",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        setSelectedSeats([]);
        fetchMovieDetails([]);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
    console.log("Selected Seats:", selectedSeats);
    setSelectedSeats([]);
    // refresh()
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
      <div className="relative">
        <div className="bg-gray-600 mb-4 rounded py-4">
          <div className="text-white absolute top-0 left-1/2 transform -translate-x-1/2">
            <h3 className="text-xl font-bold">Screen</h3>
          </div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-9 gap-2">
        <div className="col-span-4 grid grid-cols-8 gap-2">
          {seatsAvailable.slice(0, 32).map((seat) => {
            const seatId = seat.Row.concat(seat.Number);
            const isSelected = selectedSeats.includes(seatId);
            const isBooked = seat.Booked;

            let seatClassName = "p-2 rounded text-center cursor-pointer";
            if (isSelected) {
              seatClassName += " bg-yellow-500";
            } else if (isBooked) {
              seatClassName += " bg-red-500";
            } else {
              seatClassName += " bg-green-500";
            }

            return (
              <div
                key={seatId}
                className={seatClassName}
                onClick={() => {
                  if (isBooked) {
                    alert(
                      "This seat is already booked. Please choose another seat."
                    );
                  } else {
                    handleSeatClick(seatId);
                  }
                }}
              >
                {seat.Row}
                {seat.Number}
              </div>
            );
          })}
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center bg-orange-500">
          <p className="text-center transform -rotate-90">CORRIDOR</p>
        </div>
        <div className="col-span-4 grid grid-cols-8 gap-2">
          {seatsAvailable.slice(32, 64).map((seat) => {
            const seatId = seat.Row.concat(seat.Number);
            const isSelected = selectedSeats.includes(seatId);
            const isBooked = seat.Booked;

            let seatClassName = "p-2 rounded text-center cursor-pointer";
            if (isSelected) {
              seatClassName += " bg-yellow-500";
            } else if (isBooked) {
              seatClassName += " bg-red-500";
            } else {
              seatClassName += " bg-green-500";
            }

            return (
              <div
                key={seatId}
                className={seatClassName}
                onClick={() => handleSeatClick(seatId)}
              >
                {seat.Row}
                {seat.Number}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-bold">Seat Legend:</h4>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-green-500 mr-2 rounded"></div>
          <p className="text-sm">Available</p>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-yellow-500 mr-2 rounded"></div>
          <p className="text-sm">Selected</p>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-red-500 mr-2 rounded"></div>
          <p className="text-sm">Booked</p>
        </div>
      </div>
      <button
        onClick={handleBookSeats}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Book Selected Seats
      </button>
    </div>
  );
};

export default SeatPage;
