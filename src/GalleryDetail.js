import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GalleryDetail() {
  // Stav pro uchování dat o položce
  const [item, setItem] = useState(null);
  // Získání parametru postId z URL
  const { slug, langId } = useParams();

  // URL pro obrázky
  const imageUrl = 'http://localhost:80/shop/www/images/';

  // useEffect se spustí při změně postId
  useEffect(() => {
    
    fetchData(langId, slug);
             
  }, [langId, slug]);

  // Funkce pro načítání dat
  const fetchData = async (langId, slug) => {
    try {
      // Volání API pro získání dat
      const response = await axios.get('http://localhost:80/shop/api/gallerydetail', {
        params: {
          langId: langId,
          slug: slug,
          
        },
      });
     
      // Zpracování dat a aktualizace stavu
      const responseDatar = response.data && response.data.item ? response.data.item : null;
      setItem(responseDatar);
      
    } catch (error) {
      // V případě chyby v konzoli vypíšeme chybovou zprávu
      console.error('Chyba při načítání dat', error);
    }
  };

  // Vykreslení komponenty
  return (
    <div className="ItemDetail w-90 m-auto">
      {item && (
        <div className="item-container">
          {/* Nadpis a obsah položky */}
          <div className="content">
            <h1 className="title text-white text-3xl text-center py-6">
              {item.title}
              </h1>
              <div className='text-stone-300' dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
          {/* Zobrazení galerie */}
          {item.gallery && (
            <article className="gallery overflow-hidden py-6 w-full text-center grid justify-items-center gap-2">
              {Object.values(item.gallery).map((image) => (
                <div key={image.meId} className='item relative'>
                  <img
                    key={image.id}
                    src={`http://localhost:80/shop/www/images/w980-${image.file.replace('images/', '')}`}
                    alt={`Image ${image.id}`}
                  />
                </div>
              ))}
            </article>
          )}
        </div>
      )}

    </div>
  );
}

// Export komponenty
export default GalleryDetail;
