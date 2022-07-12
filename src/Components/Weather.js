import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "antd";

const Weather = () => {
  const [wData, setWData] = useState(null);
  const [searchData, setSearchData] = useState("kathmandu");
  const fetchWeather = async () => {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=f52036c99b9f4b05953a370587f5b692&units=metric`
      );
      setWData(weatherData.data);
      // console.log(weatherData.data);
    } catch (error) {
      console.log("Err");
    }
  };
  //--------------------------------------------------------//

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, [searchData]);

  return (
    <>
      <div className="mainBody">
        {!wData ? (
          <h1>Not Found</h1>
        ) : (
          <div className="appBody">
            <div className="searchBar">
              <input
                type="search"
                placeholder="Search Location"
                onKeyPress={fetchWeather}
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
              />
            </div>
            <br />
            {wData.name && wData.sys ? (
              <Badge.Ribbon text={wData.sys.country} color="#4ca771">
                <p className="cityname">{wData.name}</p>
              </Badge.Ribbon>
            ) : (
              <p className="cityname">NULL</p>
            )}

            {wData.main ? (
              <p className="tempNow">{wData.main.temp.toFixed()}&#176;C</p>
            ) : (
              <p className="tempNow">NULL</p>
            )}
            {wData.weather ? (
              <p className="weather">{wData.weather[0].main}</p>
            ) : (
              <p className="weather">NULL</p>
            )}
            {wData.weather ? (
              <p className="weatherDesc">{wData.weather[0].description}</p>
            ) : (
              <p className="weatherDesc">NULL</p>
            )}
            <div className="tableCon">
              <table>
                <tbody>
                  <tr>
                    <th>Min</th>
                    <th>Humidity</th>

                    <th>Max</th>
                  </tr>
                  <tr>
                    {wData.main ? (
                      <td>{wData.main.temp_min.toFixed()}&#176;C</td>
                    ) : (
                      <td>NULL</td>
                    )}
                    {wData.main ? (
                      <td>{wData.main.humidity.toFixed()}%</td>
                    ) : (
                      <td>NULL</td>
                    )}
                    {wData.main ? (
                      <td>{wData.main.temp_max.toFixed()}&#176;C</td>
                    ) : (
                      <td>NULL</td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="weatherDescOPy">&copy; Roshan Pradhan</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
