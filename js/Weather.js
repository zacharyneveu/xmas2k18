import React from 'react';
import Axios from 'axios';
import { styles } from './styles';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "Boston",
            baseurl: "http://api.openweathermap.org/data/2.5/weather?q=",
            apikey: "&appid=0c8ecba5ef77c965665734a9ee893e63",
            units: "&units=imperial",
            desc: "",
            weather: {
                "coord": { "lon": -122.09, "lat": 37.39 },
                "sys": { "type": 3, "id": 168940, "message": 0.0297, "country": "US", "sunrise": 1427723751, "sunset": 1427768967 },
                "weather": [{ "id": 800, "main": "Clear", "description": "Sky is Clear", "icon": "01n" }],
                "base": "stations",
                "main": { "temp": 285.68, "humidity": 74, "pressure": 1016.8, "temp_min": 284.82, "temp_max": 286.48 },
                "wind": { "speed": 0.96, "deg": 285.001 },
                "clouds": { "all": 0 },
                "dt": 1427700245,
                "id": 0,
                "name": "Mountain View",
                "cod": 200
            },
        }
        this.getWeather = this.getWeather.bind(this);

        this.getWeather();
    }

    getWeather() {
        Axios.get(this.state.baseurl + this.state.city + this.state.apikey + this.state.units)
            .then((response) => {
                let weather = response.data;
                //console.log(weather);
                let desc = weather.weather[0].description;
                desc += " landscape snow";
                
                //console.log("new desc: ", desc)
                //console.log("old desc: ", this.state.desc)
                if (desc != this.state.desc) {
                    this.props.onChange(desc);
                }
                this.setState({ weather: weather, desc: desc });
                //console.log("Weather: ", desc)
            })
            .catch((err) => {
                console.log(err);
            })
        setTimeout(this.getWeather
            , 10000);
    }

    render() {
        let sty = { color: this.props.color };
        return (
            <div style={Object.assign({}, styles.weather, sty)}>
                <div style={styles.weather_inner}>
                    &nbsp;{Math.round(this.state.weather.main.temp)}°F&nbsp;
                </div>
            </div>
        );
    }
}