export default function WeatherCard({ data, onSave, saved }) {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{data.name}, {data.sys.country}</h2>
        <button onClick={onSave} className="text-yellow-400 text-2xl">{saved ? "★" : "☆"}</button>
      </div>
      <p className="capitalize">{data.weather[0].description}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-3xl font-bold">{Math.round(data.main.temp)}°C</div>
          <div className="text-sm text-gray-400">Temperature</div>
        </div>
        <div>
          <div className="text-xl">{data.main.humidity}%</div>
          <div className="text-sm text-gray-400">Humidity</div>
        </div>
        <div>
          <div className="text-xl">{Math.round(data.wind.speed)} m/s</div>
          <div className="text-sm text-gray-400">Wind Speed</div>
        </div>
      </div>
    </div>
  )
}
