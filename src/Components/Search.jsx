import { Button, Checkbox, DatePicker, Dropdown, Input, Space } from "antd";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

const Search = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [oneWay, setOneWay] = useState(false);

  const data = [
    {
      flight: {
        from: "Delhi",
        to: "Mumbai",
        departureDate: "10:00",
        arrive: "12:00",
        fromCode: "IST",
        toCode: "JFK",
        fromCity: "Istanbul",
        toCity: "TKT",
        // departureDate: "2021-04-01",
        price: 1200,
      },
    },
    {
      flight: {
        from: "Delhi",
        to: "Mumbai",
        departureDate: "10:00",
        arrive: "12:00",
        fromCode: "IST",
        toCode: "JFK",
        fromCity: "Istanbul",
        toCity: "TKT",
        // departureDate: "2021-04-01",
        price: 1000,
      },
    },
  ];

  const items = [
    {
      label: "price",
      key: "0",
    },
    {
      label: "flight duration",
      key: "1",
    },
    {
      label: "start date",
      key: "2",
    },
    {
      label: "arrive date",
      key: "3",
    },
  ];

  return (
    <div className="search-container-section">
      <div className="options">
        <Checkbox
          onChange={(e) => {
            console.log(e.target.checked);
            setOneWay(e.target.checked);
            console.log("oneWay", oneWay);
          }}
        >
          Checkbox
        </Checkbox>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Sort by
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      <div className="search-tab-container">
        <Input placeholder="From?" className="search-input" />
        <Input placeholder="To?" className="search-input" />
        <DatePicker
          selected={startDate}
          onChange={(e) => {
            console.log(e);
            setStartDate(e);
            console.log("startDate", startDate);
          }}
        />
        <DatePicker
          selected={endDate}
          onChange={() => {
            setEndDate();
            console.log("endDate", endDate);
          }}
          disabled={oneWay}
        />

        <Button type="primary">Search</Button>
      </div>
      <div className="results-container">
        {data.map((item, index) => (
          <div className="flight-info">
            <div className="flight-container">
              <div className="flight">
                <p>{item.flight.departureDate}</p>
                <p>{item.flight.fromCode}</p>
                <p>{item.flight.fromCity}</p>
              </div>
              <div className="flight">
                <p>{item.flight.arrive}</p>
                <p>{item.flight.toCode}</p>
                <p>{item.flight.toCity}</p>
              </div>
            </div>
            <div className="price-container">
              <p>{item.flight.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
