import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Space,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Hourglass } from "react-loader-spinner";
import { Airports, Flights } from "../Data/MockData";
import Ticket from "./Ticket";

const Search = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [oneWay, setOneWay] = useState(false);
  const [sort, setSort] = useState("Sort by");
  const [displayData, setDisplayData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [extend, setExtend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tableData, setTableData] = useState([Flights]);

  const sortingOptions = [
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

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch("https://my.api.mockaroo.com/flight/info", {
      headers: {
        "X-API-Key": "fb7f5ee0",
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
            sortingOptions,
            // onClick,
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
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Where From?"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
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
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
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
      {!isLoading ? (
        <>
          <div className="results-container">
            <Ticket data={displayData} from={from} />
          </div>
          {!oneWay && (
            <div className="results-container">
              <p>INBOUND TRIP</p>
              <Ticket data={displayData} from={from} />
            </div>
          )}
        </>
      ) : (
        <div className="loader">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
