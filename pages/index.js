import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import Forecast from "../components/Forecast"
import Loader from "../components/Loader"

export default function Home() {
  const [data, setData] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [savedCities, setSavedCities] = useState([])
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("savedCities")
    if (stored) setSavedCities(JSON.parse(stored))
    const theme = localStorage.getItem("theme")
    if (theme === "dark") { document.documentElement.classList.add("dark"); setDark(true) }
  }, [])

  useEffect(() => { localStorage.setItem("savedCities", JSON.stringify(savedCities)) }, [savedCities])

  const fetchWeather = async city => {
    try {
      setLoading(true); setError(""); setData(null); setForecast(null)
      const key = process.env.NEXT_PUBLIC_OWM_API_KEY
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
      if (!res.ok) throw new Error("City not found")
      const json = await res.json()
      setData(json)
      const resF = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`)
      const jsonF = await resF.json()
      setForecast(jsonF.list)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleSave = () => {
    if (!data) return
    const city = data.name
    if (savedCities.includes(city)) setSavedCities(savedCities.filter(c => c !== city))
    else setSavedCities([...savedCities, city])
  }

  const toggleTheme = () => {
    const next = !dark; setDark(next)
    if (next) { document.documentElement.classList.add("dark"); localStorage.setItem("theme", "dark") }
    else { document.documentElement.classList.remove("dark"); localStorage.setItem("theme", "light") }
  }

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <button onClick={toggleTheme} className="button">{dark ? "Light" : "Dark"} Mode</button>
      </div>
      <SearchBar onSearch={fetchWeather} />
{savedCities.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-4">
    {savedCities.map(city => (
      <button key={city} onClick={() => fetchWeather(city)} className="button">{city}</button>
    ))}
  </div>
)}

      {loading && <Loader />}
      {error && <div className="mt-6 text-red-400">{error}</div>}
      {data && <WeatherCard data={data} onSave={toggleSave} saved={savedCities.includes(data.name)} />}
      {forecast && <Forecast list={forecast} />}
    </main>
  )
}
