import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiSandstorm } from "react-icons/wi";
import { useState } from "react";
import api from "./api";

const apiKey = "8a644e3582d37c0d049c0cc0a519a51a";

function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha a localidade");
      return;
    }
    try {
      const response = await api.get(
        `https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=pt_br&q=${input}&appid=${apiKey}`
      );
      setCity(response.data);

      setInput("");
    } catch {
      alert("Ops, erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Confira o clima de uma localidade</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite aqui a localidade"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="button" onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      {Object.keys(city).length > 0 && (
        <main className="searchResult">
          <div className="cityArea">
            <IoLocationOutline size={30} color="#fff" />
            <span className="city">{city.name}</span>
          </div>
          <span className="temperature">{parseInt(city.main.temp)}°C</span>

          <div className="weatherArea">
            <span className="weather">{city.weather[0].description}</span>
            <img
              className="icon"
              src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
            ></img>
          </div>

          <div className="weatherDetails">
            <div>
              <p className="description">
                Umidade
                <WiHumidity
                  className="icon"
                  size={25}
                  color="var(--Dark-Blue)"
                />
              </p>
              <span className="humidityValue">{city.main.humidity} %</span>
            </div>
            <div>
              <p className="description">
                Sensação
                <WiThermometer size={25} color="var(--Dark-Blue)" />
              </p>
              <span className="feelsLikeValue">
                {parseInt(city.main.feels_like)} °C
              </span>
            </div>
            <div>
              <p className="description">
                Vento
                <WiSandstorm size={25} color="var(--Dark-Blue)" />
              </p>
              <span className="windValue">{city.wind.speed} km/h</span>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
