import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../client';
import '../styles/AddCreator.css';

function AddCreator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log('Submitting data: ', { name, url, description, imageURL });

    try {
      await axios({
        method: 'post',
        url: `${supabase.supabaseUrl}/rest/v1/creators`,
        headers: {
          "apikey": supabase.supabaseKey,
          "Content-Type": "application/json"
        },
        data: [{ name, url, description, imageURL }],
      });

      console.log('Data submitted successfully.');
      navigate('/');

    } catch (error) {
      console.error('Error submitting data: ', error);
    }
  }

  return (
    <>
      <h1 className='add_creator_heading'>Add Creator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Social Media Link" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
        <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="Image URL" />
        <button type="submit">Add Creator</button>
      </form>
    </>
  );
}

export default AddCreator;
