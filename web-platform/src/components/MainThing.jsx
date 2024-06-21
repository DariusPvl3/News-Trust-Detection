import React from 'react'
import '../styles/App.css'
import '../styles/MainThing.css'
import Button from './Button'

export const MainThing = () => {
  return (
    <div className='main-container'>
        <h1>CHECK THE FAKE!</h1>
        <p>Verifică încrederea într-o ştire întâlnită!</p>
        <div className="main-btns">
          <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' href="/posts">
            Cum depistez singur o ştire falsă?
          </Button>
          <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large' href="/check">
            Verifică acum o ştire!
          </Button>
        </div>
    </div>
  )
}
