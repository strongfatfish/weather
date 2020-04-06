import React, { useState, useEffect } from 'react';
import getData from "./utils/axios";
import "./style/weather.css"
import Icon from "./components/Icon";
import Loading from "./components/Loading";
function Weather() {
    const [city,setCity] = useState("毕节");
    const [data,setData] = useState({});
    const [loading,setLoading] =useState(true);
    const [weather,setWeather] = useState([]);
    const changeCity = (e) =>{
        setCity(e.target.value)
    };
    useEffect(() =>{
        //接口是jsonp的，用jsonp工具来处理
        getData.jsonp(`https://api.asilu.com/weather/?city=${city}&callback=weather`)
            .then(res => {
                setTimeout(()=>{
                    setData(res);
                    setWeather(res.weather.slice(1));
                    setLoading(false)
                },500)
            });
        // 天气查询接口有次数限制，用json-server将第一次请求的数据保存并开本地接口
        // fetch("http://localhost:53000/bijie").then(res =>res.json()).then(res =>{
        //     setTimeout(()=>{
        //         setData(res);
        //         setWeather(res.weather.slice(1));
        //         setLoading(false)
        //     },500)
        // })
    },[]);
    const handleGet = () =>{
        setLoading(true);
        getData.jsonp(`https://api.asilu.com/weather/?city=${city}&callback=weather`)
            .then(data => {
                setData(data);
                setCity("");
                setLoading(false)
            })
    };
    if (loading) {
        return <Loading/>
    }
    return (
        <div className="weather" >
            <div className="container">
                <div className="weather-side">
                    <div className="gradient"/>
                    <div className="date-container">
                        <h2 className="date-dayname">{data.date}</h2>
                        <span className="date-day">{data.weather[0].date.slice(0,3)}</span>
                        <span className="iconfont" id="location">
                            <Icon icon="dingwei-"/>
                            {data.city}
                        </span>
                    </div>
                    <div className="weather-conteiner">
                        <span className="iconfont" id="weather-l">
                            <Icon icon={data.weather[0].icon1.slice(4)}/>
                        </span>

                        <div className="weather-temp">{data.weather[0].temp}</div>
                        <div className="waeather-desc">{data.weather[0].weather}</div>
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
                                <span className="value">暂无</span>
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
                                weather && weather.map((item,index) => {
                                    return <li key={item.date}>
                                        <span className="iconfont">
                                            <Icon icon={item.icon1.slice(4)}/>
                                        </span>
                                        <span className="day-name">{item.date}</span>
                                        <span className="day-temp">{item.temp}</span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>

                    <div className="location-container">
                        <input type="text" placeholder="位置" value={city} onChange={changeCity} />
                        <button className="location-button" onClick={handleGet}>
                            <span className="iconfont">
                                <Icon icon="chaxun" />
                                查询
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;