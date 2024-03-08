import { Button, Checkbox, DatePicker, Dropdown, Space, Select } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import { RotatingLines } from "react-loader-spinner";
import { Airports, Flights } from "../Data/MockData";
import FlightData from "../Data/FlightData";
import FlightTable from "./FlightTable";

const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [oneWay, setOneWay] = useState(false);
  const [sortBy, setSortBy] = useState("Sort by");
  const [flightData, setFlightData] = useState([]);
  const [returnFlightData, setReturnFlightData] = useState([]);

  const [displayData, setDisplayData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([Flights]);

  const sortingOptions = [
    {
      label: "Price Lower",
      key: "price",
    },
    {
      label: "Flight Duration",
      key: "duration",
    },
    {
      label: "Departure Time",
      key: "departure_time",
    },
    {
      label: "Arrival Time",
      key: "arrival_time",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    // setDisplayData(FlightData.data);
    // setFlightData(FlightData.data);

    fetch("https://my.api.mockaroo.com/flight/info", {
      headers: {
        "X-API-Key": "09a57e80",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setFlightData(data);
          setDisplayData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filterIncomingData = () => {
    let filteredData = displayData.filter((flight) =>
      flight.departure_airport.includes(from)
    );
    filteredData = filteredData.filter((flight) =>
      flight.arrival_airport.includes(to)
    );

    if (startDate)
      filteredData = filteredData.filter(
        (flight) => flight.departure_date === startDate.format("DD/MM/YYYY")
      );

    let filteredReturnData = displayData.filter((flight) =>
      flight.departure_airport.includes(to)
    );
    filteredReturnData = filteredReturnData.filter((flight) =>
      flight.arrival_airport.includes(from)
    );

    if (endDate) {
      filteredReturnData = filteredReturnData.filter(
        (flight) => flight.departure_date === endDate.format("DD/MM/YYYY")
      );
    }

    setFlightData(filteredData);
    setReturnFlightData(filteredReturnData);
  };

  const sortFlightData = ({ key }) => {
    setSortBy(sortingOptions.find((option) => option.key === key).label);

    const filteredData = [
      ...flightData.sort((a, b) => (a[key] > b[key] ? 1 : -1)),
    ];
    const filteredReturnData = [
      ...returnFlightData.sort((a, b) => (a[key] > b[key] ? 1 : -1)),
    ];

    setFlightData(filteredData);
    setReturnFlightData(filteredReturnData);
  };

  return (
    <div className="search-container-section">
      <div className="search-container-row">
        <div className="search-tab-container">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Where From?"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase()) ||
              (option?.code ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={Airports}
            onSelect={(value) => {
              setFrom(value);
            }}
          />
          <Select
            className="search-input"
            showSearch
            style={{ width: 200 }}
            placeholder="Where To?"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase()) ||
              (option?.code ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={Airports}
            onSelect={(value) => {
              setTo(value);
            }}
          />
          <DatePicker
            selected={startDate}
            onChange={(e) => {
              setStartDate(e);
            }}
            placeholder="Departure date"
            format="DD/MM/YYYY"
          />
          <DatePicker
            selected={endDate}
            onChange={(e) => {
              setEndDate(e);
            }}
            placeholder="Return date"
            disabled={oneWay}
            format="DD/MM/YYYY"
          />
          <Button
            type="primary"
            onClick={(e) => {
              filterIncomingData();
            }}
          >
            Search
          </Button>
        </div>
        <div className="search-options">
          <Checkbox
            onChange={(e) => {
              setOneWay(e.target.checked);
            }}
          >
            One way
          </Checkbox>
          <Dropdown
            menu={{
              items: sortingOptions,
              onClick: sortFlightData,
            }}
            // trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {sortBy}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      {!isLoading ? (
        <>
          <div className="results-container">
            <FlightTable data={flightData} />
          </div>
          {!oneWay && (
            <div className="results-container">
              <p>INBOUND TRIP</p>
              <FlightTable data={returnFlightData} />
            </div>
          )}
        </>
      ) : (
        <div className="loader">
          <RotatingLines
            visible={true}
            strokeColor="#4fafff"
            height="60"
            width="60"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            strokeWidth="5"
            animationDuration="0.75"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
