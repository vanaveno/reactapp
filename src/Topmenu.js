// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';


function Topmenu(props) {
  const { langId } = props;
  const [menuData, setMenuData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    
    // Toto se spustí po načtení komponenty
    fetchMenuData(langId);

  }, []);

  const fetchMenuData = async (langId) => {
    try {
      // Získání dat z API, v tomto případě všechny položky menu
      const response = await axios.get(`http://localhost:80/shop/api/topmenu/?langId=${langId}`);
      console.log(response.data.topmenu);
    
      // Zpracujte data
      const menuResponseData = response.data && response.data.topmenu ? Object.values(response.data.topmenu) : [];
      setMenuData(menuResponseData);

    } catch (error) {
      console.error('Chyba při načítání dat menu', error);
    }
  };  

  return (
    <>      
        {menuData && (
          <nav className=''>

            <ul className='mt-4'>
              {/* Top Menu */}
              {menuData.map((menuItem) => (
                <li key={menuItem.tagalias} className='inline-block px-3'>
                  {menuItem.image && (
                    <Link className='inline' to={`/api/items/${menuItem.lang_id}/${menuItem.tagalias}`}>
                      <img className="wmax100 mb-2"
                        src={`http://localhost:80/shop/www/images/ico-${menuItem.image}`}
                        alt={menuItem.name}
                      />
                    </Link>
                  )}
                  <Link className='inline text-slate-700 uppercase' to={`/api/items/${menuItem.lang_id}/${menuItem.tagalias}`}>
                    {menuItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
    </>
  );
}

export default Topmenu;
