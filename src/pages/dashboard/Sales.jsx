import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SearchLoader from "../../components/shared/loaders/SearchLoader";

const Sales = () => {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useSelector((state) => state.charts);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isLoading && !isError && chartData?.length > 0) {
      setData(chartData);
    }
  }, [chartData?.length > 0]);

  if (isLoading) {
    return <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    return <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && chartData?.length === 0) {
    return <div>No data found</div>;
  }

  const convertTime = (unixTimestamp) => {
    const dateObject = new Date(parseInt(unixTimestamp));
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  };

  const revenue = data?.reduce((accumulator, currentData) => {
    const convertedTime = convertTime(currentData.timestamp);

    const existingEntry = accumulator.find(
      (entry) => entry.timestamp === convertedTime
    );

    if (existingEntry) {
      existingEntry.price += currentData.price;
    } else {
      accumulator.push({
        timestamp: convertedTime,
        price: currentData.price,
        email: currentData.email,
      });
    }
    return accumulator;
  }, []);

  const users = data?.reduce((accumulator, currentData) => {
    const convertedTime = convertTime(currentData.timestamp);

    const existingEntry = accumulator.find(
      (entry) => entry.timestamp === convertedTime
    );

    if (existingEntry) {
      existingEntry.count += 1; // Increment the count by 1
    } else {
      accumulator.push({
        timestamp: convertedTime,
        count: 1, // Set count to 1 for the first occurrence of a date
        email: currentData.email,
      });
    }
    return accumulator;
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-2xl font-bold text-black">Revenue</h4>
            <p className="text-blackSemi mt-2">See revenue by date</p>
          </div>
          <div className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                data={revenue}
                margin={{
                  top: 5,
                  right: 5,
                  bottom: 5,
                  left: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="gradientColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="10%" stopColor="#F3BDB6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F3BDB6" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff" />
                <XAxis dataKey="timestamp" tick={{ angle: 0, dy: 10 }}>
                  <Label angle={-45} position="insideBottom" />
                </XAxis>
                <YAxis dataKey="price">
                  <Label angle={-45} position="insideBottom" />
                </YAxis>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="url(#gradientColor)"
                  stroke="#F3BDB6"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-2xl font-bold text-black">Users Acquisition</h4>
            <p className="text-blackSemi mt-2">See users by date</p>
          </div>
          <div className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                data={users}
                margin={{
                  top: 5,
                  right: 5,
                  bottom: 5,
                  left: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="gradientColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="10%" stopColor="#F3BDB6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F3BDB6" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff" />
                <XAxis dataKey="timestamp" tick={{ angle: 0, dy: 10 }}>
                  <Label angle={-45} position="insideBottom" />
                </XAxis>
                <YAxis dataKey="count">
                  <Label angle={-45} position="insideBottom" />
                </YAxis>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  fill="url(#gradientColor)"
                  stroke="#F3BDB6"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sales;
