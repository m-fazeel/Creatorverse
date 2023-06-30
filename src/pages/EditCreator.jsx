import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../client';
import '../styles/EditCreator.css';

function EditCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios({
        method: 'patch',
        url: `${supabase.supabaseUrl}/rest/v1/creators?id=eq.${id}`,
        headers: {
          "apikey": supabase.supabaseKey,
          "Content-Type": "application/json"
        },
        data: {
          name: creator.name,
          url: creator.url,
          description: creator.description,
          imageURL: creator.imageURL
        }
      });

      navigate(`/${id}`);
    } catch (error) {
      console.error('Error updating creator', error);
    }
  }

  return creator ? (
    <>
      <h2>Editing "{creator.name}"</h2>

      <form onSubmit={handleSubmit} className='form-info' ref={ceratorContainerRef}>

        <h3>Name</h3>
        <input type="text" value={creator.name} onChange={(e) => setCreator({ ...creator, name: e.target.value })} required />

        <h3>Social Media Link</h3>
        <input type="url" value={creator.url} onChange={(e) => setCreator({ ...creator, url: e.target.value })} required />

        <h3>Description</h3>
        <textarea
          value={creator.description}
          onChange={(e) => setCreator({ ...creator, description: e.target.value })}
          required
        ></textarea>

        <h3>Image URL</h3>
        <input type="url" value={creator.imageURL} onChange={(e) => setCreator({ ...creator, imageURL: e.target.value })} />
        <button type="submit">Update Creator</button>
      </form>
    </>
  ) : (
    <p>Loading...</p>
  );

}

export default EditCreator;
