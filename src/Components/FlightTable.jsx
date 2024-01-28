import React from "react";
import FlightTableItem from "./FlightTableItem";

const FlightTable = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map((rowItem, index) => <FlightTableItem data={rowItem} />)
      ) : (
        <p>No available flight</p>
      )}
    </div>
  );
};

export default FlightTable;
