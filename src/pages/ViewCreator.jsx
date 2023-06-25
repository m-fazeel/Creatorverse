import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../client';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import '../styles/ViewCreator.css';

function ViewCreator() {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const ceratorContainerRef = React.useRef(null);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  useEffect(() => {
    if (ceratorContainerRef.current) {
      ceratorContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [creator]);

  async function fetchCreator() {
    try {
      const response = await axios({
        method: 'get',
        url: `${supabase.supabaseUrl}/rest/v1/creators?id=eq.${id}`,
        headers: {
          "apikey": supabase.supabaseKey,
          "Content-Type": "application/json"
        }
      });

      if (response.data && response.data.length > 0) {
        setCreator(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching creator', error);
    }
  }

  async function handleDelete() {

    const confirm = window.confirm('Are you sure you want to delete this creator?');

    if (!confirm) {
      return;
    }

    try {
      await axios({
        method: 'delete',
        url: `${supabase.supabaseUrl}/rest/v1/creators?id=eq.${id}`,
        headers: {
          "apikey": supabase.supabaseKey,
          "Content-Type": "application/json"
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting creator', error);
    }
  }

  async function handleEdit() {
    navigate(`/edit/${id}`);
  }


  return (
    <div ref={ceratorContainerRef} className="creator-container">
      {creator && (
        <div className="creator-content">
          <div className="creator-image-container">
            {creator.imageURL && <img className="creator-image" src={creator.imageURL} alt={creator.name} />}
          </div>
          <div className="creator-info">
            <h1 className="creator-title">{creator.name}</h1>
            <p className="creator-description">{creator.description}</p>
            <a className="creator-link" href={creator.url} target="_blank" rel="noopener noreferrer">
              Visit Creator's Social Media
            </a>
          </div>
        </div>
      )}
      <div className="creator-actions">
        <button className="action-button delete" onClick={handleDelete}>
          <FiTrash2 />
        </button>
        <button className="action-button edit" onClick={handleEdit}>
          <FiEdit />
        </button>
      </div>
    </div>
  );
}

export default ViewCreator;
