import React, {Component} from 'react';
import DailyCardComponent from './DailyCardComponent';

class DailyWeatherComponent extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.weather != null){
            return(
                <div className = "daily-container">
                    <DailyCardComponent weather = {this.props.weather} isCelcius = {this.props.isCelcius}/>
                </div>
            )
        }
    }
}

export default DailyWeatherComponent