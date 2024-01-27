import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Space,
  message,
} from "antd";
import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import Icon from "@ant-design/icons/lib/components/Icon";

const Search = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [oneWay, setOneWay] = useState(false);
  const [sort, setSort] = useState("Sort by");
  const [displayData, setDisplayData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [extend, setExtend] = useState(false);

  let data = [
    {
      flight: {
        id: 1,
        from: "Delhi",
        to: "Mumbai",
        departureDate: "10:00",
        arrive: "15:00",
        fromCode: "IST",
        toCode: "JFK",
        fromCity: "sivas",
        toCity: "izmir",
        // departureDate: "2021-04-01",
        price: 1200,
        duration: "2",
      },
    },
    {
      flight: {
        id: 2,
        from: "Delhi",
        to: "sivas",
        departureDate: "09:00",
        arrive: "12:00",
        fromCode: "IST",
        toCode: "JFK",
        fromCity: "istanbul",
        toCity: "tokat",
        // departureDate: "2021-04-01",
        price: 1000,
        duration: "1",
      },
    },
    {
      flight: {
        id: 3,
        from: "Delhi",
        to: "Mumbai",
        departureDate: "12:00",
        arrive: "13:00",
        fromCode: "IST",
        toCode: "JFK",
        fromCity: "istanbul",
        toCity: "TKT",
        // departureDate: "2021-04-01",
        price: 1300,
        duration: "3",
      },
    },
  ];

  const [tableData, setTableData] = useState([data]);

  const items = [
    {
      label: "price lower",
      key: "0",
    },
    {
      label: "price higher",
      key: "1",
    },
    {
      label: "flight duration",
      key: "2",
    },
    {
      label: "start date",
      key: "3",
    },
    {
      label: "arrive date",
      key: "4",
    },
  ];

  const dataTest = [
    { name: "Ibas", age: 100 },
    {
      name: "doe",
      age: 36,
    },
  ];

  const data1 = [...dataTest].sort((a, b) => (a.name < b.name ? -1 : 1));

  data1.map((d) => console.log("without conversion", d.name)); // Ibas, doe

  const data2 = [...data].sort((a, b) =>
    a.flight.price < b.flight.price ? -1 : 1
  );

  data2.map((d) => console.log("with conversion", d.flight.price)); // doe, Ibas

  let data3;
  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);

    if (key === "0") {
      data3 = [...data].sort((a, b) =>
        a.flight.price < b.flight.price ? -1 : 1
      );
    } else if (key === "1") {
      data3 = [...data].sort((a, b) =>
        a.flight.price > b.flight.price ? -1 : 1
      );
    } else if (key === "2") {
      data3 = [...data].sort((a, b) =>
        a.flight.duration < b.flight.duration ? -1 : 1
      );
    } else if (key === "3") {
      data3 = [...data].sort((a, b) =>
        a.flight.departureDate < b.flight.departureDate ? -1 : 1
      );
    } else if (key === "4") {
      data3 = [...data].sort((a, b) =>
        a.flight.arrive < b.flight.arrive ? -1 : 1
      );
    }
    console.log("data3", data3);
    // Now you can use data3 here
    setDisplayData(data3);
    setSort(items.find((item) => item.key === key).label);
  };

  const handleInputChangeFrom = (event) => {
    setFrom(event.target.value);
    console.log("from", from);
  };

  const handleInputChangeTo = (event) => {
    setTo(event.target.value);
  };

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
          One way
        </Checkbox>
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {sort}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      <div className="search-tab-container">
        <Input
          placeholder="From?"
          className="search-input"
          onChange={handleInputChangeFrom}
        />
        <Input
          placeholder="To?"
          className="search-input"
          onChange={handleInputChangeTo}
        />
        <DatePicker
          selected={startDate}
          onChange={(e) => {
            console.log(e);
            setStartDate(e);
            console.log("startDate", startDate);
          }}
          placeholder="Departure date"
        />
        <DatePicker
          selected={endDate}
          onChange={() => {
            setEndDate();
            console.log("endDate", endDate);
          }}
          placeholder="Return date"
          disabled={oneWay}
        />

        <Button type="primary">Search</Button>
      </div>
      <div className="results-container">
        {(from
          ? displayData?.filter((item) => item.flight.fromCity === from)
          : displayData
        ).map((item, index) => (
          <div className="ticket-info">
            <div className="main-ticket-info">
              <div className="sub-container">
                <div className="main-box">
                  <p>{item.flight.departureDate}</p>
                  <span> - </span>
                  <p>{item.flight.arrive}</p>
                </div>
                {/* <div className=""> */}
                <p1>THY</p1>
              </div>
              <div className="sub-container">
                <div className="main-box">
                  <p>{item.flight.duration} hours</p>
                </div>
                <div className="sub-box">
                  <p1>{item.flight.fromCode}</p1>
                  <span> - </span>
                  <p1>{item.flight.toCode}</p1>
                </div>
              </div>

              <div className="flight">
                <p></p>
                <p>{item.flight.fromCity}</p>
              </div>
              <div className="flight">
                <p></p>
                <p>{item.flight.toCity}</p>
              </div>
              <div className="price-container">
                <p>{item.flight.price}</p>
              </div>
              <DownOutlined
                onClick={() => {
                  setExtend(!extend);
                  console.log("extend", extend);
                }}
              />
            </div>
            <div className={`extend-container ${extend && "open"}`}>
              <div className="extra-info">
                <p>14 mart per</p>
                <p1>Airbus A321</p1>
                <p1>Economi</p1>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!oneWay && (
        <div className="results-container">
          <p>INBOUND TRIP</p>
          {(from
            ? displayData?.filter((item) => item.flight.fromCity === from)
            : displayData
          ).map((item, index) => (
            <div className="ticket-info">
              <div className="main-ticket-info">
                <div className="sub-container">
                  <div className="main-box">
                    <p>{item.flight.departureDate}</p>
                    <span> - </span>
                    <p>{item.flight.arrive}</p>
                  </div>
                  {/* <div className=""> */}
                  <p1>THY</p1>
                </div>
                <div className="sub-container">
                  <div className="main-box">
                    <p>{item.flight.duration} hours</p>
                  </div>
                  <div className="sub-box">
                    <p1>{item.flight.fromCode}</p1>
                    <span> - </span>
                    <p1>{item.flight.toCode}</p1>
                  </div>
                </div>

                <div className="flight">
                  <p></p>
                  <p>{item.flight.fromCity}</p>
                </div>
                <div className="flight">
                  <p></p>
                  <p>{item.flight.toCity}</p>
                </div>
                <div className="price-container">
                  <p>{item.flight.price}</p>
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
              <div
                className={`extend-container ${
                  extend && index === item.flight.id && "open"
                }`}
              >
                <div className="extra-info">
                  <p>14 mart per</p>
                  <p1>Airbus A321</p1>
                  <p1>Economi</p1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
