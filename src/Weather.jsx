import React, {useState, useEffect, useMemo, useRef} from 'react';
import getData from "./util/axios";
import "./weather.css"
function Weather() {
    const [city,setCity] = useState("毕节");
    const [data,setData] = useState({});
    const [loading,setLoading] =useState(true);
    const [weather,setWeather] = useState([]);
    const onref = useRef(null);
    const changeCity = (e) =>{
        setCity(e.target.value)
    };
    function weatherIcon(type){
        if(type ==="yin"){
            return "&#xe624;";
        }
        if(type === "duoyun"){
            return "&#xe618;";
        }
        if(type === "qing"){
            return "&#xe61f;";
        }
        if(type === "xiaoyu"){
            return "&#xe622;";
        }
        if(type === "zhongyu"){
            return "&#xe685;";
        }
        if(type === "dayu" || type ==="baoyu") {
            return "&#xe644;";
        }
        if(type === "zhenyu"){
            return "&#xe642";
        }
    }
    const icon = ["&#xe642;","&#xe644;"]
    useEffect(() =>{
        // getData.jsonp("http://localhost:53000/bijie")
        //     .then(res => {
        //         setTimeout(()=>{
        //             setData(res);
        //             setWeather(res.weather.slice(1));
        //             setLoading(false)
        //         },500)
        //     });
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
        <div className="weather" >
            <div className="container">
                <div className="weather-side">
                    <div className="gradient"/>
                    <div className="date-container">
                        <h2 className="date-dayname">{}</h2>
                        <span className="date-day">{data.weather[0].date.slice(0,3)}</span>
                        <span className="iconfont">&#xe617;{data.city}</span>
                    </div>
                    <div className="weather-conteiner">
                        <span className="iconfont" id="weather-l">&#xe644;</span>
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
                                        <span className="iconfont">&#xe61f;</span>
                                        <span className="day-name">{item.date}</span>
                                        <span className="day-temp">{item.temp}</span>
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