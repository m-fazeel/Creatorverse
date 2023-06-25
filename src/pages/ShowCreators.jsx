import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../styles/ShowCreators.css'
import { supabase } from '../client';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    try {
      const response = await axios({
        method: 'get',
        url: supabase.supabaseUrl + '/rest/v1/creators',
        headers: {
          "apikey": supabase.supabaseKey,
          "Content-Type": "application/json"
        }
      });

      if (response.data) {
        setCreators(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching creators', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creators-grid">
      {creators.length > 0 ? (
        creators.map((creator) => <Card key={creator.id} creator={creator} />)
      ) : (
        <p>No creators found</p>
      )}
    </div>
  );
}

export default ShowCreators;
