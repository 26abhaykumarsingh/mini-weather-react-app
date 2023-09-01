import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
const hotBg =
  "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
const coldBg =
  "https://images.unsplash.com/photo-1635420280816-c0dc0ee8a7a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(coldBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      console.log(data);

      //dynamic bg
      const threshold = units === "metric" ? 20 : 68;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      //code for enter key pressed
      setCity(e.currentTarget.value);
      e.currentTarget.blur(); //to lose focus on the input
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
