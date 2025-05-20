import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const apiKey = '1aeffb0b3520785500a2dd89ea7e745f'

function App() {

  const [input, setInput] = useState('');

  const handleClick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`)
      .then((response) => {
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <header>
        <h1>BoolFlix</h1>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <input type="text" placeholder="Cerca" className='form-control' onChange={(e) => setInput(e.target.value)} />
          </div>
          <div className="col-12 col-md-4">
            <button className='btn btn-secondary' onClick={handleClick}> Cerca </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
