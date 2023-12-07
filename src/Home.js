// Gallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Tag from './Tag';

function Home() {
  const [data, setData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const { langId, tagalias } = useParams();
  const imageUrl = 'http://localhost:80/shop/www/images/';

  useEffect(() => {
    console.log(langId);
    fetchData(langId, tagalias);
   
  }, [langId, tagalias]);

  const fetchData = async (langId, tagalias) => {
    try {
      const response = await axios.get('http://localhost:80/shop/api/items');
      
      const responseData = response.data && response.data.pics ? Object.values(response.data.pics) : [];
      setData(responseData);
    } catch (error) {
      console.error('Chyba při načítání dat', error);
    }
  };

  return (
    <>
    <Header  langId={ langId } />
    <Tag />
    <div className="Content columns-3 gap-3">
      {data && (
        <div>
          {data.map((pic) => (
            <div key={pic.postId} className="post relative overflow-hidden my-3">
              <div className="absolute bottom-4 left-4">
                <h2 className="title fs-12 fw-normal">                 
                    {pic.title}                 
                </h2>
              </div>

              {pic.image && (
                <div className="image w-full">
                 
                    {pic.topicMedia ? (
                      <img
                        className="wmax100"
                        src={`http://localhost:80/shop/www/images/w600-${pic.topicMedia.replace('images/', '')}`}
                        alt={pic.name}
                      />
                    ) : (
                      <img
                        className="wmax100"
                        src={`http://localhost:80/shop/www/images/w600-${pic.image.replace('images/', '')}`}
                        alt={pic.name}
                      />
                    )}
                  
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Home;
