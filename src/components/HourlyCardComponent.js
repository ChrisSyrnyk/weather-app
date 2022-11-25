import React, {Component} from 'react';

class HourlyCardComponent extends Component{
    constructor(props){
        super(props)
    }

    dailyWeatherList = this.props.weather.list;

    determineListLength(){
        let dailyWeatherListLength = this.props.weather.list.length;
        let i = 0;
        while (i<dailyWeatherListLength){
            console.log(this.props.weather.list[i].main.temp);
            i++;
        }
    }


    //time given is UTC which is 7 hours ahead of mst
    //could check current time. 


    convertTimeZone(utcTime){
        let timeString = String(utcTime);
        switch(timeString){
            case '00':
                return '5pm';
            case '03':
                return '8pm';
            case '06':
                return '11pm';
            case '09':
                return '2am';
            case '12':
                return '5am';
            case '15':
                return '8am';
            case '18':
                return '11am';
            case '21':
                return '2pm';
        }
    }

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
        return(
            <>
                {this.props.weather.list.map((day) =>{
                        return(
                            <div key={day.dt} className="hourly-whitespace">
                            <div className = "hourly-card">
                                <div className="hourly-topbar">
                                    {<img src= {this.determineIcon(day.weather[0].icon)} className = "hourly-icon"/>}
                                    <div className = "hourly-time">{this.convertTimeZone(day.dt_txt.slice(11,13))}</div>
                                </div>
                                <div className = "hourly-temp">{this.calculateTemp(day.main.temp) + '°'}</div>
                                <div className = "hourly-description">{'Feels like '+ Math.round(this.calculateTemp(day.main.feels_like)) + '°'}</div>
                            </div>
                            <div className = "hourly-divider"></div>
                            </div>
                        )
                    
                })}
            </>
            
        )
    }
}

export default HourlyCardComponent