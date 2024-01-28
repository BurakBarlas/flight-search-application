import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const FlightTableItem = ({ data }) => {
  const [isExtended, setIsExtended] = useState(false);

  const onExtendClick = () => {
    setIsExtended(!isExtended);
    console.log("extend", isExtended);
  }

  return (
    <div className="ticket-info">
        <div className="main-ticket-info">
          <div className="sub-container">
            <div className="main-box">
              <p>{data.departure_time}</p>
              <span> - </span>
              <p>{data.arrival_time}</p>
            </div>
            <p1>{data.airline}</p1>
          </div>
          <div className="sub-container">
            <div className="main-box">
              <p>{data.duration} hours</p>
            </div>
            <div className="sub-box">
              <p1>{data.departure_airport}</p1>
              <span> - </span>
              <p1>{data.arrival_airport}</p1>
            </div>
          </div>
          <div className="flight">
            <p>{data.departure_city}</p>
            <span> - </span>
            <p>{data.arrival_city}</p>
          </div>
          <div className="price-container">
            <p>{data.price} $</p>
          </div>
          {!isExtended ? (
            <DownOutlined
              onClick={onExtendClick}
            />
          ) : (
            <UpOutlined
              onClick={onExtendClick}
            />
          )}
        </div>
        <div className={`extend-container ${isExtended && "open"}`}>
          <div className="extra-info">
            <p>Date: {data.departure_date}</p>
            <p1>Flight Number: {data.flight_number}</p1>
            <p1>Seat: {data.seat_number}</p1>
            <p1>{data.ticket_type}</p1>
          </div>
        </div>
    </div>
  );
};

export default FlightTableItem;
