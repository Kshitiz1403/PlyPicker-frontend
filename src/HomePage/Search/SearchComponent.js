import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PORT } from '../../App'

const SearchComponent = () => {
  const [value, setValue] = useState('')
  const [products, setProducts] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(`${PORT}/products`)
      setProducts(response.data)
    }
    loadProducts()
  }, [])

  const suggestionHandler = (value) => {
    setValue(value)
    setSuggestions([])
  }

  const onChangeHandler = (value) => {
    let matches = []
    if (value.length > 0) {
      matches = products.filter(product => {
        const regex = new RegExp(`${value}`, "gi")
        return product.Product_Name.match(regex)
      })
    }
    setSuggestions(matches)
    setValue(value)
  }


  const SuggestItem = ({ suggestion }) => {
    const [activeSuggestion, setActiveSuggestion] = useState(false)
    return (
      <div
        style={{ cursor: 'pointer', fontWeight: activeSuggestion ? 'bold' : 'inherit' }}
        onMouseOver={() => setActiveSuggestion(true)}
        onMouseLeave={() => setActiveSuggestion(false)}
        onClick={() => suggestionHandler(suggestion.Product_Name)} >
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/productdetails?${suggestion._id}`}>
          {suggestion.Product_Name}
        </Link>
      </div>
    )
  }

  return (
    <div>
      <input
        placeholder="Enter Post Title"
        type="text"
        onChange={event => onChangeHandler(event.target.value)}
        value={value}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([])
          }, 1000);
        }}
      />
      {suggestions && suggestions.map((suggestion, i) => <SuggestItem suggestion={suggestion} key={suggestion._id}/>)}
    </div>
  )
}

export default SearchComponent