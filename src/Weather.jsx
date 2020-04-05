import React,{ useState,useEffect } from 'react';

import "./weather.css"
function Weather() {
    const [city,setCity] = useState("毕节");
    const changeCity = (e) =>{
        setCity(e.target.value)
    };
    return (
        <div className="weather">
            <div className="container">
                <div className="weather-side">
                    <div className="gradient"/>
                    <div className="date-container">
                        <h2 className="date-dayname" id="date-dayname">周二</h2>
                        <span className="date-day" id="date-day">2020-3-24</span>
                        <span className="iconfont" id="location">&#xe617;北京</span>
                    </div>
                    <div className="weather-conteiner">
                        <span className="iconfont" id="weather-l">&#xe61f;</span>
                        <div className="weather-temp" id="weather-temp">25℃</div>
                        <div className="waeather-desc" id="weather-desc">晴天</div>
                    </div>
                </div>
                <div className="info-side">
                    <div className="today-info-container">
                        <div className="today-info">
                            <div className="pm clear">
                                <span className="title">PM2.5</span>
                                <span className="value" id="pm">00</span>
                            </div>
                            <div className="humidity clear">
                                <span className="title">湿度</span>
                                <span className="value" id="humidity">00</span>
                            </div>
                            <div className="wind clear">
                                <span className="title">风速</span>
                                <span className="value" id="wind">00</span>
                            </div>
                        </div>
                    </div>

                    <div className="week-container">
                        <ul className="week-list">
                            <li className="active" id="day1">
                                <span className="iconfont">&#xe61f;</span>
                                <span className="day-name">星期二</span>
                                <span className="day-temp">25℃</span>
                            </li>

                            <li id="day2">
                                <span className="iconfont">&#xe61f;</span>
                                <span className="day-name">星期三</span>
                                <span className="day-temp">25℃</span>
                            </li>

                            <li id="day3">
                                <span className="iconfont">&#xe61f;</span>
                                <span className="day-name">星期四</span>
                                <span className="day-temp">25℃</span>
                            </li>

                            <li id="day4">
                                <span className="iconfont">&#xe61f;</span>
                                <span className="day-name">星期五</span>
                                <span className="day-temp">25℃</span>
                            </li>
                        </ul>
                    </div>

                    <div className="location-container">
                        <input type="text" placeholder="位置" onChange={changeCity} />
                            <button className="location-button" id="location-button">
                                <span className="iconfont">&#xe617;查询</span>
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;