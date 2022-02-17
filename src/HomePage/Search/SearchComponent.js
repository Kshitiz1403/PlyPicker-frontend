import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
      {suggestions && suggestions.map((suggestion, i) => <div
        style={{ cursor: 'pointer' }}
        key={suggestion._id}
        onClick={() => suggestionHandler(suggestion.Product_Name)} >{suggestion.Product_Name}
      </div>)}
    </div>
  )
}

export default SearchComponent