// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';


function Language() {
  const [langData, setLangData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
 
  useEffect(() => {
    
    fetchLangData();

  }, []);


  const fetchLangData = async () => {
    try {
      // Získání dat z API, v tomto případě všechny položky menu
      const response = await axios.get('http://localhost:80/shop/api/langmenu');

      // Zpracujte data
      const langResponseData = response.data && response.data.langmenu ? Object.values(response.data.langmenu) : [];
      setLangData(langResponseData);
      
    } catch (error) {
      console.error('Chyba při načítání dat menu', error);
    }
  };

  return (
    <>

        {langData && (
          <div>
            <ul className='w-full text-right'>
              {/* Language Menu */}
              {langData.map((langItem) => (
                <li key={langItem.tagalias} className='inline-block px-3'>
                  {langItem.image && (
                    <Link className='inline' to={`/${langItem.prefix}`}>
                      <img className=" h-[20px]"
                        src={`http://localhost:80/shop/www/${langItem.image}`}
                        alt={langItem.name}
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>

          </div>
        )}
        
    </>
  );
}

export default Language;
