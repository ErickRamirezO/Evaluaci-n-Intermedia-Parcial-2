import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='Contenedor-princiapl'>
      <div>
        <form action="">
          <label htmlFor="">Ingrese la pregunta: </label>
          <input type="text" />
          <br/>
          <label htmlFor="">Opcion 1</label>
          <input type="text" />
          <br/>
          <button>Agregar </button>
          
        </form>
      </div>

      <div>
        Cuestionario
      </div>



    </div>
  )
}

