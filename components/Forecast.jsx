export default function Forecast({ list }) {
  if (!list || list.length === 0) return null
  const days = {}
  list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString()
    if (!days[date]) days[date] = item
  })
  const daily = Object.entries(days).slice(0,5)
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {daily.map(([date, item]) => (
          <div key={date} className="text-center">
            <div className="text-sm text-gray-400">{date}</div>
            <div className="text-xl font-semibold">{Math.round(item.main.temp)}°C</div>
            <div className="text-sm capitalize">{item.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
