import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Tag(props) {
  const { langId } = props;
  const [tagData, setTagData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    setVisibleItems([]);
    // Toto se spustí po načtení komponenty
    fetchTagData(langId);
  }, [langId]);  // Přidáno

  const fetchTagData = async (langId) => {
    try {
      // Získání dat z API, v tomto případě všechny položky menu
      const response = await axios.get(`http://localhost:80/shop/api/tag/?langId=${langId}`);
      
      // Zpracujte data
      const menuResponseData = response.data && response.data.tags ? Object.values(response.data.tags) : [];
      setTagData(menuResponseData);

    } catch (error) {
      console.error('Chyba při načítání dat menu', error);
    }
  };

  return (
    <div className="Menu">
     
      {tagData && (
        <div>
          <nav className='mb-6 overflow-hidden'>
          <ul className='columns-8 gap-1'>
            {/* Zde můžete zobrazit položky menu podle struktury dat */}
            {tagData.map((menuItem) => (
              <li key={menuItem.tagalias} className=''>
                <Link className='inline' to={`/api/gallery/${menuItem.langId}/${menuItem.tagalias}`}>
                  <img className="wmax100 mb-2"
                    src={`http://localhost:80/shop/www/images/crop-${menuItem.image}`}
                    alt={menuItem.name}
                  />
                </Link>
                <Link className='inline text-slate-700' to={`/api/gallery/${menuItem.langId}/${menuItem.tagalias}`}>
                  {menuItem.name}
                </Link>
              </li>
            ))}
          </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Tag;
