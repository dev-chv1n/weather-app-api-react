import React, { useEffect, useState } from 'react'

//icon
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCalendarDay } from "react-icons/fa"
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6"

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

//asset
import Clear from '../assets/clear.png'
import Cloudy from '../assets/cloud.png'
import Drizzle from '../assets/drizzle.png'
import Rain from '../assets/rain.png'
import Snow from '../assets/snow.png'



function Weather() {
    const apiKey = import.meta.env.VITE_API_KEY
    const [searchValue, setSearchValue] = useState('Bangkok')
    const [data, setData] = useState(null)
    const [hour, setHour] = useState([])

    // สร้าง Object Mapping เพื่อเชื่อมโยง text กับรูปภาพ
    const weatherIcons = {
        Sunny: Clear,
        Clear: Clear,
        Cloudy: Cloudy,
        Drizzle: Drizzle,
        Rain: Rain,
        Snow: Snow
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=1&aqi=no&alerts=yes`)
        const json = await res.json()
        setData(json)
        const hour = json.forecast.forecastday[0].hour
        setHour(hour)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=1&aqi=no&alerts=yes`)
            const json = await res.json()
            setData(json)
            const hour = json.forecast.forecastday[0].hour
            setHour(hour)
        }

        fetchData()


    }, [])


    if (!data) {
        return <div className='h-screen flex justify-center items-center '><p className='text-9xl'>Loading...</p></div>;
    }

    //  format date time
    const dateString = data.location.localtime;
    const date = new Date(dateString)
    const formattedDateWeekDay = date.toLocaleDateString('en-GB', {
        weekday: 'long',
    })
    const formattedDateDay = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
    })

    return (

        <>

            <div className='container m-auto  md:h-screen flex justify-center items-center '>
                <div className="weather-con  bg-white rounded-4xl drop-shadow-xl w-full md:h-screen lg:h-fit max-sm:p-2 pt-8 px-8 pb-[104px] ">
                    {/* searchbar */}
                    <div className="search-bar w-full flex  items-center mb-6 ">
                        <div className="logo text-5xl text-amber-400  mr-2"><TiWeatherPartlySunny /> </div>
                        <p className='text-2xl text-sky-800 font-bold'>weather360</p>
                        <form onSubmit={handleClick} method="get" className='flex items-center sm:w-full lg:w-[30%] '>
                            <input className='bg-gray-200 focus-visible:outline-0  px-4 py-2 rounded-xl w-full mr-4 ml-4'
                                placeholder='Search location'
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)} />
                            <button type="submit" className='mr-4 cursor-pointer text-gray-500 hover:text-black'><FaSearch /></button>
                        </form>
                    </div>

                    {/* info */}
                    <div className="info  grid sm:grid-row-[_1fr_1fr]  lg:grid-cols-[_1fr_2fr] lg:gap-4 ">
                        {/* l info */}
                        <div className="l-info  lg:border-r-1 border-gray-200  lg:flex-col ">
                            <div className="h-full md:grid md:grid-cols-[_1fr_2fr] lg:flex lg:flex-col ">
                                <div className=" w-full flex justify-center">
                                    <img src={weatherIcons[data.current.condition.text]} className=' md:mb-0 lg:mb-6  lg:w-[200px]' />
                                </div>
                                <div className="  ">
                                    <div className=' text-gray-800 flex max-lg:justify-between max-lg:mb-10 lg:justify-center  lg:flex-col ' >
                                        <div className="todayweather">
                                            <p className="">{data.current.condition.text}</p>
                                            <p className='text-[5rem] flex'>{Math.round(data.current.temp_c)} <p className='text-3xl pt-6'>°C</p></p>
                                            <p className='text-2xl font-normal text-gray-400'>Feel like {Math.round(data.current.feelslike_c)}° </p>
                                        </div>
                                        <div className="date-location md:flex:flex-col:items-end">
                                            <p className='text-xl font-light mt-18 flex items-center'><FaCalendarDay className='text-xl mr-2' />{formattedDateWeekDay}, {formattedDateDay}, {data.location.localtime.split(' ')[1]}</p>
                                            <p className='text-xl font-light mt-5 flex items-center'><FaLocationDot className='text-xl mr-2' />{data.location.name}/{data.location.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* r info */}
                        <div className="r-info bg-sky-200 rounded-3xl p-6 ">
                            <p className='font-bold text-xl mb-2'>Today's Highlights</p>
                            <div className="grid max-sm:grid-cols-2  max-md:gap-6 grid-cols-4 md:grid-rows-2 md:gap-2 lg:gap-4 md:h-fit lg:h-fit">
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Max</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{Math.round(data.forecast.forecastday[0].day.maxtemp_c)}</p>
                                    <p className='text-right text-l font-light text-gray-400'>°C</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Min</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{Math.round(data.forecast.forecastday[0].day.mintemp_c)}</p>
                                    <p className='text-right text-l font-light text-gray-400'>°C</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Sunrise</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{data.forecast.forecastday[0].astro.sunrise.split(' ')[0]}</p>
                                    <p className='text-right text-l font-light text-gray-400'>am</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Sunset</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{data.forecast.forecastday[0].astro.sunset.split(' ')[0]}</p>
                                    <p className='text-right text-l font-light text-gray-400'>pm</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Humidity</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{data.current.humidity}</p>
                                    <p className='text-right text-l font-light text-gray-400'>%</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Pressure</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{data.current.pressure_mb}</p>
                                    <p className='text-right text-l font-light text-gray-400'>Mbar</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Windspeed</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{data.current.wind_kph}</p>
                                    <p className='text-right text-l font-light text-gray-400'>k/h</p>
                                </div>
                                <div className="bg-white rounded-2xl flex flex-col justify-between p-6 
                            md:h-[100px] md:p-2
                            lg:w-full lg:h-full  
                            ">
                                    <p className=' text-l font-light text-gray-400'>Rain</p>
                                    <p className='text-center  font-semibold md:text-2xl md:py-0 lg:text-4xl lg:py-2'>{data.forecast.forecastday[0].day.daily_chance_of_rain}</p>
                                    <p className='text-right text-l font-light text-gray-400'>%</p>
                                </div>

                            </div>

                            <p className='font-bold text-xl mb-2 mt-6 '>24-hour forecast</p>
                            <div className="for-con flex  max-sm:w-[80vw] max-md:w-[550px]  md:w-[650px] lg:w-[622px] xl:w-[822px] 2xl:w-[922px]">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={2}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        310: {
                                            slidesPerView: 4,
                                            spaceBetween: 10,
                                        },
                                        640: {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 5,
                                            spaceBetween: 20,
                                        },
                                        1024: {
                                            slidesPerView: 5,
                                            spaceBetween: 20,
                                        },
                                        1280: {
                                            slidesPerView: 5,
                                            spaceBetween: 40,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className=""
                                >
                                    {hour?.map((items, index) => {
                                        return (
                                            <SwiperSlide key={index} className="bg-white rounded-2xl  w-[200px]  flex flex-col justify-between items-center p-4 cursor-grab">
                                                <p className="time font-normal ">{items.time.split(' ')[1]}</p>
                                                <img src={weatherIcons[items.condition.text.split(' ')[0]]} className=' w-16' />
                                                <p className="temp font-normal text-gray-400">{items.temp_c} °</p>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>

                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Weather