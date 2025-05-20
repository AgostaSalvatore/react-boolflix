import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {


  return (
    <>
      <header>
        <h1>BoolFlix</h1>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <input type="text" placeholder="Cerca" className='form-control' />
          </div>
          <div className="col-12 col-md-4">
            <button className='btn btn-secondary'> Cerca </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
