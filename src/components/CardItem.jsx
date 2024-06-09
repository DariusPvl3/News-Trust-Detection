import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Cards.css'

function CardItem(props){
  return (
    <>
        <li className='cards-item'>
            <Link className='cards-item-link' to={props.path}>
                <figure className='cards-item-pic-wrap' data-category={props.label}>
                    <img src={props.src} className='cards-item-img'></img>
                </figure>
                <div className="cards-item-info">
                    <h5 className="cards-item-text">{props.text}</h5>
                </div>
            </Link>
        </li>
    </>
  )
}

export default CardItem;