import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


function App() {

  const [input, setInput] = useState('');
  const [film, setFilm] = useState([]);

  const handleClick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1aeffb0b3520785500a2dd89ea7e745f&query=${input}`)
      .then((response) => {
        setFilm(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
  }



  return (
    <>
      <header className='py-3 mb-4'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-3 text-center text-md-start mb-2 mb-md-0">
              <h1 className="text-white m-0">BoolFlix</h1>
            </div>
            <div className="col-12 col-md-7">
              <input type="text" placeholder="Titolo" className='form-control' onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="col-12 col-md-2 mt-2 mt-md-0 text-center">
              <button className='btn btn-secondary w-100' onClick={handleClick}> Cerca </button>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row mt-4">
          {film.map(movie => (
            <div key={movie.id} className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top img-fluid"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p>{movie.original_title}</p>
                  <p><b>Language:</b> {movie.original_language}</p>
                  <p><b>Vote:</b> {movie.vote_average}</p>
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
