import React, {useState, useEffect, useMemo} from 'react';
import getData from "./util/axios";
import "./weather.css"
function Weather() {
    const [city,setCity] = useState("毕节");
    const [data,setData] = useState({});
    const [loading,setLoading] =useState(true);
    const [weather,setWeather] = useState([]);
    const changeCity = (e) =>{
        setCity(e.target.value)
    };
    useEffect(() =>{
        // getData.jsonp("http://localhost:53000/bijie")
        //     .then(data => setData(data))
        fetch("http://localhost:53000/bijie").then(res =>res.json()).then(res =>{
            setTimeout(()=>{
                setData(res);
                setWeather(res.weather.slice(1));
                setLoading(false)
            },500)
        })
    },[]);
    const handleGet = () =>{
        getData.jsonp(`https://api.asilu.com/weather/?city=${city}&callback=weather`)
            .then(data => setData(data))
    };
    if (loading) {
        return <h1>正在加载中</h1>
    }
    return (
        <div className="weather">
            <div className="container">
                <div className="weather-side">
                    <div className="gradient"/>
                    <div className="date-container">
                        <h2 className="date-dayname">{}</h2>
                        <span className="date-day">{data.weather[0].date.slice(0,3)}</span>
                        <span className="iconfont">&#xe617;{data.city}</span>
                    </div>
                    <div className="weather-conteiner">
                        <span className="iconfont" id="weather-l">&#xe61f;</span>
                        <div className="weather-temp" id="weather-temp">{data.weather[0].temp.slice(0,3)}℃</div>
                        <div className="waeather-desc" id="weather-desc">{data.weather[0].weather}</div>
                    </div>
                </div>
                <div className="info-side">
                    <div className="today-info-container">
                        <div className="today-info">
                            <div className="pm clear">
                                <span className="title">PM2.5</span>
                                <span className="value">{data.pm25}</span>
                            </div>
                            <div className="humidity clear">
                                <span className="title">湿度</span>
                                <span className="value">"暂无"</span>
                            </div>
                            <div className="wind clear">
                                <span className="title">风速</span>
                                <span className="value">{data.weather[0].wind}</span>
                            </div>
                        </div>
                    </div>
                    <div className="week-container">
                        <ul className="week-list">
                            {
                                weather && weather.map((item) => {
                                    return <li key={item.date}>
                                        <span className="iconfont">&#xe61f;</span>
                                        <span className="day-name">{item.date}</span>
                                        <span className="day-temp">{item.temp}℃</span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>

                    <div className="location-container">
                        <input type="text" placeholder="位置" onChange={changeCity} />
                        <button className="location-button" id="location-button" onClick={handleGet}>
                            <span className="iconfont">&#xe617;查询</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;