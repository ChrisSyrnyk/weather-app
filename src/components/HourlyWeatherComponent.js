import React, {Component} from 'react';
import HourlyCardComponent from './HourlyCardComponent';

class HourlyWeatherComponent extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.weather != null){
            return(
                <div className = "hourly-container">
                    
                    <HourlyCardComponent weather = {this.props.weather} isCelcius = {this.props.isCelcius}/>
                    
                </div>
            )
        }    
    }

}

export default HourlyWeatherComponent