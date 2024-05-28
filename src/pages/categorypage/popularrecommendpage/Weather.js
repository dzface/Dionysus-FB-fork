import React, { useState, useEffect } from "react";
import styled from "styled-components";

const getBackgroundColor = (weatherCategory) => {
  switch (weatherCategory) {
    case "맑음":
      return "#ffa500";
    case "흐림":
      return "#808080";
    case "눈":
      return "#87ceeb";
    case "비":
      return "#4682b4";
    default:
      return "#121212";
  }
};


const TodayWeather = styled.div`
  width: 327px;
  height: 240px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ weatherCategory }) =>
    getBackgroundColor(weatherCategory)};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;
  opacity: 0.9;
  /* z-index: 1; */
  position: absolute;
`;

const Text = styled.p`
  font-size: x-large;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 24px;
  color: #ffffff;
`;

const IconBox = styled.div`
  width: 327px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid black;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(0.9);
  }
`;

const DisplayWeather = (props) => {
  const cityValue = props.inptLocation;
  const key = "0ff7f6cfb7b7c06333e16f6974fc0453";
  const [apiValue, setApiValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const [showRe2, setShowRe2] = useState(false);

  const handleWeather = () => {
    setShowRe2(true);
  };
  const handleCloseWeather = () => {
    setShowRe2(false);
  };

  function currentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(
            `Current location: Latitude(${latitude}), Longitude(${longitude})`
          );
          resolve({ latitude, longitude });
        },
        (error) => {
          reject("error");
        }
      );
    });
  }

  const getWeather = async () => {
    try {
      const { latitude, longitude } = await currentLocation();
      const responseFirst = fetch(
        `https://api.openweathermap.org/data/2.5/weather?${
          cityValue ? "q=" + cityValue : "lat=" + latitude + "&lon=" + longitude
        }&appid=${key}&units=metric&lang=KR`
      );

      const [data1] = await Promise.all([responseFirst]);
      const result1 = await data1.json();
      console.log("Weather API response:", result1);

      const offset = 1000 * 60 * 60 * 9;
      const today = new Date().getTime() + offset;
      setTodayDate(new Date(today).toLocaleDateString());

      console.log("Weather API response:", result1);
      setApiValue(result1);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
      props.turnBack();
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getWeatherCategory = (description) => {
    if (description.includes("Clear")) return "맑음";
    if (
      description.includes("Thunderstorm") ||
      description.includes("Drizzle") ||
      description.includes("Atmosphere") ||
      description.includes("Clouds")
    )
      return "흐림";
    if (description.includes("Rain")) return "비";
    if (description.includes("Snow")) return "눈";
    return "";
  };

  return (
    <>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <TodayWeather
          weatherCategory={
            apiValue && apiValue.weather
              ? getWeatherCategory(apiValue.weather[0].main)
              : ""
          }
        >
          <IconBox>
            <IconImg
              src={`${process.env.PUBLIC_URL}/weather/${ getWeatherCategory(apiValue.weather[0].main)}.gif`}
            />
          </IconBox>
          <Text>{getWeatherCategory(apiValue.weather[0].main)}/{apiValue.main.temp}</Text>
          
        </TodayWeather>
      )}
    </>
  );
};

export default DisplayWeather;
