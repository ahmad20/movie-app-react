import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const TicketList = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [cookies] = useCookies(["token"]);
  const cookieValue = cookies.token;
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${url}/user/me`, {
      method: "GET",
      headers: {
        Authorization: cookieValue,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setTickets(data.data.ticket);
        } else {
          console.log("Error retrieving tickets");
        }
      })
      .catch((error) => {
        console.error("Error retrieving tickets:", error);
      });
  }, [cookieValue, url]);

  const handleCancelTicket = (ticketId) => {
    const requestBody = {
      id: ticketId
    };

    fetch(`${url}/user/cancel-ticket`, {
      method: "POST",
      headers: {
        "Authorization" :cookieValue,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // Refresh the ticket list
        window.location.reload();
        // Implement the logic to refresh the ticket list after cancellation
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  const [expandedTicket, setExpandedTicket] = useState(null);

  const toggleTicketDropdown = (ticketId) => {
    if (expandedTicket === ticketId) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketId);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      {!tickets?.length && <h2 className="text-lg font-bold mb-4">Empty List</h2>}
      {tickets?.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-4">My Tickets</h2>
          <ul className="space-y-4">
            {tickets.map((ticket) => (
              <li key={ticket.ID} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p>{ticket.Movie.title}</p>
                    <p>
                      Booked At:{" "}
                      {new Date(ticket.Created_At).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleCancelTicket(ticket.ID)}
                      className="btn btn-red"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <div
                      className="dropdown-trigger ml-2"
                      onClick={() => toggleTicketDropdown(ticket.ID)}
                    >
                      <FontAwesomeIcon
                        icon={
                          expandedTicket === ticket.ID ? faAngleUp : faAngleDown
                        }
                      />
                    </div>
                  </div>
                </div>
                {expandedTicket === ticket.ID && (
                  <div className="mt-4">
                    <p>
                      Seats:{" "}
                      {ticket.Seats.map((seat) => seat.Row + seat.Number).join(
                        ", "
                      )}
                    </p>
                    <p>Price: {ticket.Cost}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TicketList;
