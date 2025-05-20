import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const apiKey = '1aeffb0b3520785500a2dd89ea7e745f'

function App() {

  const [input, setInput] = useState('');
  const [film, setFilm] = useState([]);

  const handleClick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`)
      .then((response) => {
        setFilm(response.data.results);
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
        <div className="row mt-4">
          {film.map(movie => (
            <div key={movie.id} className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p>{movie.original_title}</p>
                  <p>{movie.original_language}</p>
                  <p>{movie.vote_average}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
