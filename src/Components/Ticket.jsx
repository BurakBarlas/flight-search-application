import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Ticket = ({ data, from }) => {
  const [extend, setExtend] = useState(false);

  return (
    <div>
      {data.length > 0 ? (
        (from
          ? data?.filter((item) => item.flight.fromCity === from)
          : data
        ).map((item, index) => (
          <div className="ticket-info">
            <div className="main-ticket-info">
              <div className="sub-container">
                <div className="main-box">
                  <p>{item.departure_time}</p>
                  <span> - </span>
                  <p>{item.arrival_time}</p>
                </div>
                <p1>{item.airline}</p1>
              </div>
              <div className="sub-container">
                <div className="main-box">
                  <p>{item.duration} hours</p>
                </div>
                <div className="sub-box">
                  <p1>{item.departure_airport}</p1>
                  <span> - </span>
                  <p1>{item.arrival_airport}</p1>
                </div>
              </div>

              <div className="flight">
                <p>{item.departure_city}</p>
                <span> - </span>
                <p>{item.arrival_city}</p>
              </div>
              <div className="price-container">
                <p>{item.price} $</p>
              </div>
              {!extend ? (
                <DownOutlined
                  onClick={() => {
                    setExtend(!extend);
                    console.log("extend", extend);
                  }}
                />
              ) : (
                <UpOutlined
                  onClick={() => {
                    setExtend(!extend);
                    console.log("extend", extend);
                  }}
                />
              )}
            </div>
            <div className={`extend-container ${extend && "open"}`}>
              <div className="extra-info">
                <p>Date: {item.departure_date}</p>
                <p1>Flight Number: {item.flight_number}</p1>
                <p1>Seat: {item.seat_number}</p1>
                <p1>{item.ticket_type}</p1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No available flight</p>
      )}
    </div>
  );
};

export default Ticket;
