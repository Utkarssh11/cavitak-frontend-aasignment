import { useState } from "react"

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("")
  const submit = e => {
    e.preventDefault()
    if (city.trim()) onSearch(city.trim())
  }
  return (
    <form onSubmit={submit} className="flex gap-2 w-full">
      <input type="text" placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} className="input flex-1" />
      <button type="submit" className="button">Search</button>
    </form>
  )
}
