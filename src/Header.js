// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';


function Header(props) {
  const { langId } = props;
  const [menuData, setMenuData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
 
  useEffect(() => {
    
    // Toto se spustí po načtení komponenty
    fetchMenuData(langId);
    fetchLangData();

  }, [langId]);

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
    <header className='py-8 overflow-hidden'>
      <div className='text-5xl py-4 text-gray-800 float-left'>
        <Link to="/">
          Gallery<span className='text-rose-700'>4</span>U
        </Link>
      </div>
      <div className='float-right'>
        {langData && (
          <div>
            <ul className='w-full text-right'>
              {/* Language Menu */}
              {langData.map((langItem) => (
                <li key={langItem.tagalias} className='inline-block px-3'>
                  {langItem.image && (
                    <Link className='inline' to={`/${langItem.prefix}/`}>
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
        {menuData && (
          <div className='float-right'>

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
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
