import React, {Component} from 'react';

class DailyCardComponent extends Component{
    constructor(props){
        super(props)
    }

    /*
    if the time >= 7 its a new day display info collected for that day
    */

    tempArray = [];
    date = "undefined"; //will hold current date
    icon = "undefined"; //will hold current icon
    pop = [];    //holds possibilt of precipitation
    windspeed = []; //holds daily windspeed

    displayDayInfo(time){
        let timeSlotA = time.slice(11,12);
        let timeSlotB = time.slice(12,13);
        if (timeSlotA == "0"){
            if(timeSlotB >= "7"){
                return true
            }
        }
    }

    setDate(date){
        this.date = date;
    }

    setIcon(iconCode){
        this.icon = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
    }

    addToTempArray(temp){
        this.tempArray = this.tempArray.concat(temp);
    }

    resetTempArray(){
        this.tempArray = [];
    }

    returnHighTemp(){
        let highest = this.tempArray[0]
        let i = 1;
        while (i< this.tempArray.length){
            if (this.tempArray[i] > highest){
                highest = this.tempArray[i]
            }
            i++;
        }
        return highest
    }

    returnLowTemp(){
        let lowest = this.tempArray[0]
        let i = 1;
        while (i< this.tempArray.length){
            if (this.tempArray[i] < lowest){
                lowest = this.tempArray[i]
            }
            i++;
        }
        return lowest
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

    addToPop(currentpop){
        this.pop = this.pop.concat(currentpop);
    }

    resetPop(){
        this.pop = [];
    }

    determinePop(){
        let totalpop = 0;
        let i = 0;
        while (i<this.pop.length){
            totalpop += (this.pop[i]/this.pop.length);
            i++;
        }
        totalpop = Math.round(totalpop*100);
        return totalpop;
    }

    addToWind(wind){
        this.windspeed = this.windspeed.concat(wind);
    }

    resetWind(){
        this.windspeed = [];
    }

    determineMaxWind(){
        let maxwind = this.windspeed[0];
        let i = 1;
        while(i<this.windspeed.length){
            if (this.windspeed[i] > maxwind){
                maxwind = this.windspeed[i]
            }
            i++;
        }
        return maxwind;
    }

    calculateWind(wind){
        //windspeed given in meters per second
        let kph = (wind*1000)/3600
        if (this.props.isCelcius){
            return Math.round(kph) + 'kph'
        } else{
            let mph = kph/1.609
            return Math.round(mph) + 'mph'
        }
        
    }

    convertDate(dateString){
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        switch(month){
            case 0:
                month = 'January';
                break;
            case 1:
                month = 'February';
                break;
            case 2:
                month = 'March';
                break;
            case 3:
                month = 'April';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'June';
                break;
            case 6:
                month = 'July';
                break;
            case 7:
                month = 'August';
                break;
            case 8:
                month = 'September';
                break;
            case 9:
                month = 'October';
                break;
            case 10:
                month = 'November';
                break;
            case 11:
                month = 'December';
                break;
            default:
                month = '';      
        }



        return month + ' ' + day
    }





    render(){
        return(
            <>
                {this.resetTempArray()}
                {this.props.weather.list.map((day) =>{
                        this.addToTempArray(day.main.temp);
                        this.addToPop(day.pop);
                        this.addToWind(day.wind.speed);
                    if (this.displayDayInfo(day.dt_txt)){
                        this.setDate(day.dt_txt.slice(0,10));
                        this.setIcon(day.weather[0].icon);
                        return(
                            <div key={day.dt}>
                                <div className="daily-card">
                                    <div className='daily-header'>
                                        <div className = "daily-info">
                                            {this.convertDate(this.date)}
                                        </div>
                                    </div>
                                    <div className='daily-body'>
                                        <div className = "daily-icon">
                                            {<img src= {this.icon}/>}
                                        </div>
                                        <div className='high-low'>
                                            <div className = "daily-info">
                                                {'High: ' + this.calculateTemp(this.returnHighTemp()) + '°'}
                                            </div> 
                                            <div className = "daily-info">
                                                {'Low: ' + this.calculateTemp(this.returnLowTemp())+ '°'}
                                            </div>
                                        </div>
                                        <div className = "daily-info">
                                            {'POP: ' + this.determinePop() + '%'}
                                        </div>
                                        <div className = "daily-info">
                                            {'Wind: ' + this.calculateWind(this.determineMaxWind())}
                                        </div>
                                    </div>
                                </div>
                                <div className="daily-divider"></div>
                                {/*reset arrays for next days weather*/}
                                {this.resetTempArray()}
                                {this.resetPop()}
                                {this.resetWind()}
                            </div>
                        )
                    } else {
                        //call function to add info to arrays
                    }
                })}
            </>
        )
    }
}

export default DailyCardComponent;