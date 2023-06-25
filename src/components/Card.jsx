import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css'
import {BsInfoCircle} from 'react-icons/bs'



function Card({ creator }) {
  return (
    <Link to={`/${creator.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card">
        <div className="card-image">
          <img src={creator.imageURL} alt={creator.name} />
        </div>
        <div className="card-content">
          <h2 className="card-title">{creator.name}</h2>

          <p className="card-description">{creator.description}</p>
          <div className='bottom-line'>
          <a href={creator.url} className="card-link" target="_blank" rel="noopener noreferrer" onClick={creator.url}>
            Visit Creator's Social Media
            </a>
            <BsInfoCircle className="info-icon" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
