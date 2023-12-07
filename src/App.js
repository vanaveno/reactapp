// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Footer from './Footer';
import Gallery from './Gallery';
import Home from './Home';
import GalleryDetail from './GalleryDetail';

function App() {
  const imageUrl = 'http://localhost:80/shop/www/images/';
  const tagalias = 'photo';

  return (
    <div className="App container m-auto">
      <Router>

        <Switch>
          {/* Další routy zde */}


          <Route path="/api/gallery/:langId/:tagalias" component={Gallery} exact />
          <Route path="/api/pic/:langId/:slug" component={GalleryDetail} exact />
          <Route path="/:langId/" index component={Home} />
          <Redirect to="/cz/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
