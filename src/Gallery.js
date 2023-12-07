import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import Tag from './Tag';

function Gallery() {
  const itemsPerPage = 5;

  // Stav pro uchování dat o obrazech
  const [allItems, setAllItems] = useState();
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Stav pro uchování dat o tagu
  const [tag, setTag] = useState(null);

  // Získání parametru tagalias z URL
  const { langId, tagalias, page } = useParams();

  // URL pro obrázky
  const imageUrl = 'http://localhost:80/shop/www/images/';

  // useEffect se spustí při změně tagalias nebo na začátku
  useEffect(() => {
    // Reset seznamu viditelných položek a currentPage při změně tagu  
    setVisibleItems([]);
    setCurrentPage(1);    
    fetchData(langId, tagalias, page); 
  }, [langId, tagalias, page]);

  // Funkce pro načítání dat
  const fetchData = async (langId, tagalias, page) => {
    try {
      // Volání API pro získání dat
      const response = await axios.get('http://localhost:80/shop/api/items', {
        params: {
          langId: langId,
          tagalias: tagalias,
          page: page,
        },
      });
  
      // Zpracování dat a aktualizace stavu
      const responseData = response.data && response.data.items ? Object.values(response.data.items) : [];
      setAllItems(responseData);
      setLastPage(response.data.lastpage);
          
      // Update the visible items with the new data
      updateVisibleItems(responseData);
    
      
    } catch (error) {
      // V případě chyby v konzoli vypíšeme chybovou zprávu
      console.error('Chyba při načítání dat', error);
    }
  };

  // Funkce pro obsluhu kliknutí na odkaz "Další"
  const handleNextPage = () => {     
    // Increase the currentPage
    const nextPage = currentPage + 1;

    // Fetch the next set of items only if the next page is less than or equal to the last page
    if (nextPage <= lastPage) {
      setCurrentPage(nextPage);
      fetchData(langId, tagalias, nextPage);
    }
  };

  // Funkce pro aktualizaci zobrazených položek podle aktuální stránky
  const updateVisibleItems = (allItems) => {
     
    // Přidat nové položky na konec stávajícího seznamu
    setVisibleItems((prevItems) => {
      
      const uniqueItems = new Set([...prevItems, ...allItems]);
      
      return [...uniqueItems];
    });
  };

  // Vykreslení komponenty
  return (
    <div className="Content">
    <Header  langId={ langId } />
    <Tag langId={ langId } />
      {tag && (
        <div className='w-full overflow-hidden mb-6 text-center'>
          <h1 className='text-white text-4xl'>{tag.name}</h1>
          <div className='text-stone-300 mt-6' dangerouslySetInnerHTML={{ __html: tag.shortContent }}></div>
        </div>
      )}
      {allItems && allItems.length > 0 && (
        <div className="columns-3 gap-3">
          {/* Mapování obrázků na jednotlivé komponenty */}
          {visibleItems.map((item) => (
            <div key={item.postId} className="post relative overflow-hidden mb-3">
              <Link to={`/api/pic/${item.langId}/${item.slug}`}>
                <div className="absolute bottom-4 left-4">
                  {/* Nadpis obrázku */}
                  <h2 className="title fs-12 fw-normal">{item.title}</h2>
                </div>
                {/* Zobrazení obrázku */}
                {item.image && (
                  <div className="image">
                    {item.topicMedia ? (
                      <img
                        className="wmax100"
                        src={`http://localhost:80/shop/www/images/w600-${item.topicMedia.replace('images/', '')}`}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        className="wmax100"
                        src={`http://localhost:80/shop/www/images/w600-${item.image.replace('images/', '')}`}
                        alt={item.name}
                      />
                    )}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
      
        <div className="text-center my-8">
          <button className="btn text-white leading-10 px-3 border-2 " onClick={handleNextPage}>
            Další obrázky
          </button>
        </div>
     
    </div>
  );
}

// Export komponenty
export default Gallery;
