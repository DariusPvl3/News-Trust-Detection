import React from 'react'
import '../styles/Cards.css'
import CardItem from './CardItem'

export const Cards = () => {
  return (
    <div className='cards'>
      <h1>Cum verifici daca o stire este falsa sau nu?</h1>
      <div className="cards-container">
        <div className="cards-wrapper">
            <ul className="cards-items">
                <CardItem src='src/assets/home-background.png' text='Verifică informaţia în surse multiple' label='Surse multiple' path='/surse'/>
                <CardItem src='src/assets/home-background.png' text='Verifică sursa ştirii de care eşti nesigur' label='Sursă articol' path='/surse'/>
            </ul>
        </div>
      </div>
    </div>
  )
}