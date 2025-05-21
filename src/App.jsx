import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ReactCountryFlag from 'react-country-flag';


function App() {

  const [input, setInput] = useState('');
  const [film, setFilm] = useState([]);
  const [series, setSeries] = useState([]);

  // Funzione per convertire i codici lingua in codici paese
  const getCountryCode = (languageCode) => {
    // Mappatura solo per italiano e inglese
    const map = {
      'en': 'GB',  // Inglese -> Gran Bretagna
      'it': 'IT',  // Italiano -> Italia
    };

    // Controlla se è italiano o inglese
    if (map[languageCode]) {
      return map[languageCode];
    }

    // Per tutte le altre lingue, restituisci null
    return null;
  };

  const handleClickFilm = () => {
    // Reset serie TV quando cerchiamo film
    setSeries([]);

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1aeffb0b3520785500a2dd89ea7e745f&query=${input}`)
      .then((response) => {
        setFilm(response.data.results);
        console.log("Film trovati:", response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleClicktv = () => {
    // Reset film quando cerchiamo serie TV
    setFilm([]);

    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=1aeffb0b3520785500a2dd89ea7e745f&query=${input}`)
      .then((response) => {
        setSeries(response.data.results);
        console.log("Serie TV trovate:", response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleClickReset = () => {
    setFilm([]);
    setSeries([]);
    setInput('');
  }




  return (
    <>
      <header className='py-3 mb-4'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-3 text-center text-md-start mb-2 mb-md-0">
              <a href="#" onClick={handleClickReset} className='text-decoration-none'> <h1 className="text-danger m-0">BoolFlix</h1> </a>
            </div>
            <div className="col-12 col-md-6">
              <input
                type="text"
                placeholder="Titolo"
                className='form-control'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-1 mt-2 mt-md-0 text-center">
              <button className='btn btn-secondary w-100' onClick={handleClickFilm}>Film</button>
            </div>
            <div className="col-12 col-md-1 mt-2 mt-md-0 text-center">
              <button className='btn btn-secondary w-100' onClick={handleClicktv}>TV</button>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        {film.length > 0 && (
          <>
            <h2 className="text-danger mt-4 mb-3">Film</h2>
            <div className="row">
              {film.map(movie => (
                <div key={movie.id} className="col-6 col-md-4 col-lg-3 mb-3">
                  <div className="card h-200">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                        className="card-img-top img-fluid"
                        alt={movie.title}
                      />
                    ) : (
                      <div className="card-img-top d-flex justify-content-center align-items-center bg-secondary img-placeholder">
                        <div className="text-center p-3">
                          <i className="fa-solid fa-image fa-3x mb-3"></i>
                          <p>Immagine non disponibile</p>
                        </div>
                      </div>
                    )}
                    <div className="card-body position-absolute h-100 w-100">
                      <h5 className="card-title text-danger">{movie.title}</h5>
                      <p>{movie.original_title}</p>
                      <p><b>Language:</b> {
                        getCountryCode(movie.original_language) ?
                          <ReactCountryFlag
                            countryCode={getCountryCode(movie.original_language)}
                            svg
                          /> :
                          movie.original_language.toUpperCase()
                      }</p>
                      <p><strong>Voto:</strong> {[1, 2, 3, 4, 5].map((number) => {
                        const vote = Math.ceil(movie.vote_average / 2);
                        if (number <= vote) {
                          return <span key={number}><i className="fa-solid fa-star star-color"></i></span>;
                        } else {
                          return <span key={number}><i className="fa-regular fa-star star-color"></i></span>;
                        }
                      })}
                      </p>
                      <p>
                        <strong>Overview:</strong> {movie.overview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {series.length > 0 && (
          <>
            <h2 className="text-danger mt-4 mb-3">Serie TV</h2>
            <div className="row">
              {series.map(serie => (
                <div key={serie.id} className="col-6 col-md-4 col-lg-3 mb-3">
                  <div className="card h-100">
                    {serie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}
                        className="card-img-top img-fluid"
                        alt={serie.name}
                      />
                    ) : (
                      <div className="card-img-top d-flex justify-content-center align-items-center bg-secondary img-placeholder">
                        <div className="text-center p-3">
                          <i className="fa-solid fa-image fa-3x mb-3"></i>
                          <p>Immagine non disponibile</p>
                        </div>
                      </div>
                    )}
                    <div className="card-body position-absolute h-100 w-100">
                      <h5 className="card-title text-danger">{serie.name}</h5>
                      <p>{serie.original_name}</p>
                      <p><b>Language:</b> {
                        getCountryCode(serie.original_language) ?
                          <ReactCountryFlag
                            countryCode={getCountryCode(serie.original_language)}
                            svg
                          /> :
                          serie.original_language.toUpperCase()
                      }</p>
                      <p><strong>Voto:</strong> {[1, 2, 3, 4, 5].map((number) => {
                        const vote = Math.ceil(serie.vote_average / 2);
                        if (number <= vote) {
                          return <span key={number}><i className="fa-solid fa-star star-color"></i></span>;
                        } else {
                          return <span key={number}><i className="fa-regular fa-star star-color"></i></span>;
                        }
                      })}
                      </p>
                      <p>
                        <strong>Overview:</strong> {serie.overview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
