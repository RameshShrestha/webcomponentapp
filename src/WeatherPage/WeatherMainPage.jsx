import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import forcastData from './WeatherForcastdata.json';
import weatherDataBengaluru from './WeatherBengaluru.json';
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { useEffect, useState } from "react";
import { FlexBox, FlexBoxWrap, FlexBoxJustifyContent } from "@ui5/webcomponents-react";
function WeatherMainPage() {
    const [weatherData, setWeatherData] = useState(forcastData.list);
    const [todayWeather, setTodayWeather] = useState(weatherDataBengaluru);
    // useEffect(() => {
    //     let weatherDataReturned = forcastData.list.map((item) => {
    //         item.main.temp = (item.main.temp - 273.15).toFixed(2);
    //         item.main.temp_max = (item.main.temp_max - 273.15).toFixed(2);
    //         item.main.temp_min = (item.main.temp_min - 273.15).toFixed(2);
    //         item.main.feels_like = (item.main.feels_like - 273.15).toFixed(2);
    //         console.log(item);
    //         return item;
    //     });
    //     setWeatherData(weatherDataReturned);
    // }, []);

    // console.log(weatherData);
    return <>
        <div style={{ background: "#2b3f68", margin: "20px", color: "white", }}>
            <div >
                <div style={{ marginLeft: " 10px", fontSize: "20px", fontWeight: "bold" }}>Bengaluru ,Karnataka , India</div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ textAlign: "center" }}>
                        <div><img height={100} src={`https://openweathermap.org/img/w/${todayWeather.weather[0].icon}.png`} /></div>
                        <div style={{ fontWeight: "bold" }}>{todayWeather.weather[0].main} </div>
                    </div>
                    <div style={{ fontSize: "50px", display: "flex", alignItems: "center" }}>{todayWeather.main.temp} °C</div>
                    <div>
                        <div>Wind : {todayWeather.wind.speed} Kmph</div>
                        <div>pressure : {todayWeather.main.pressure} mb</div>
                        <div>humidity : {todayWeather.main.humidity}</div>
                        <div>Sunrise : {new Date(todayWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                        <div>Sunset:  {new Date(todayWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                        <div>Date:  {new Date(todayWeather.dt * 1000).toLocaleDateString('en-Us',
                            {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }
                        )}
                        </div>
                    </div>


                </div>
                <div style={{ display: "flex", gap: "4rem", margin: "20px" }}>
                    {weatherData && weatherData.map((item) => {
                        return <div>
                            <div> {new Date(item.dt_txt).toLocaleDateString('en-En', { weekday: 'short' })} </div>
                            <div><img height={50} src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} /></div>
                            <div>{item.main.temp} °C</div>

                        </div>

                    })}
                </div>

            </div>
            {/* <div style={{ color: "white", fontSize: "25px", textAlign: "center", background: "#3e4e62" }}> Forcast for Next 5 days</div>

            <LineChart
                dataset={weatherData}
                dimensions={[
                    {
                        accessor: 'dt_txt',
                        formatter: function _a(dateText) {
                            let dateValue = new Date(dateText);
                            let dayString = dateValue.toLocaleDateString('en-En', { weekday: 'short' });
                            let timeString = dateValue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                            return dayString + " , " + timeString
                        },
                    }
                ]}
                measures={[
                    {
                        accessor: 'main.feels_like',
                        label: 'Temparature',
                        color: '#4556a2',
                        width: 2
                    }
                ]}
                onClick={function _a() { }}
                onDataPointClick={function _a() { }}
                onLegendClick={function _a() { }}
            /> */}
        </div>

    </>
}
export default WeatherMainPage;