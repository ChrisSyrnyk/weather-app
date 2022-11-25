import { render } from '@testing-library/react';
import React, {Component} from 'react';

class CurrentWeatherComponent extends Component{
    constructor(props){
        super(props)
    };

    //need to add function for determining icon based off weather
        //weather.weather.main give ex "Clouds"

    determineIcon(code){
        return 'http://openweathermap.org/img/wn/' + code + '@2x.png'
    }

    calculateTemp(temp){
        if (this.props.isCelcius){
            //return celcius
            return Math.round(temp-273.15);
        } else {
            //return farenheit
            return Math.round(((temp-273.15)*(9/5))+32);
        }
    }

    render(){
        if(this.props.weather != null){
            return(
                <div className = "current-card">
                {<img src= {this.determineIcon(this.props.weather.weather[0].icon)} className = "current-icon"/>}
                <div className = "current-temp">{this.calculateTemp(this.props.weather.main.temp) + '°'}</div>
                <div className = "current-description">
                    {'Feels like '+Math.round(this.calculateTemp(this.props.weather.main.feels_like)) +'°'}
                    </div>
                </div>
            )
        } else {
            return(
                <div className = "current-card">
                {/*<img src= {require("./img/cloud-icon.png")} className = "current-icon"/>*/}
                <div className = "current-temp"></div>
                <div className = "current-description"></div>
                </div>
            )
        }
    }
}


export default CurrentWeatherComponent;