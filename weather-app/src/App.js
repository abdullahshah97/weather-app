import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Weather from "./components/Weather";
import {useEffect, useState} from "react";

function App() {

    const api_key = process.env["REACT_APP_WEATHER_KEY"]
    const base_url = process.env["REACT_APP_API_URL"]
    const [coordinates, setCoordinates] = useState(
        {
            "lat": 0,
            "lon": 0
        }
    )
    const [apiData, setApiData] = useState({
        weather: [{
            main: ''
        }]
    });

    useEffect(() => {
            const fetchData = async () => {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude
                    const lon = position.coords.longitude
                    setCoordinates({
                        lat,
                        lon
                    })
                });
                try {
                    const response = await fetch(`${base_url}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api_key}`)
                    const data = await response.json()
                    setApiData(data)
                    console.log(data)
                } catch (error) {
                    console.error(error)
                }
            }
            fetchData()
        }
        , [coordinates.lat, coordinates.lon])

    function handleSubmitCoordinate(e) {
        e.preventDefault();
        const newCoordinates = {
            "lon": parseFloat(e.target.lon.value),
            "lat": parseFloat(e.target.lat.value)
        }
        setCoordinates(newCoordinates);
    }

    return (
        <div className="App">
            {(typeof apiData.main != 'undefined') ? (
                <Weather weatherData={apiData}/>
            ): (
                <div></div>
            )}
        </div>

    );
}

export default App;
