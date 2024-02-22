import React from 'react';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import Categories from './components/Categories/Categories';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Categories />
      <Footer />
    </div>
  );
}

export default App;
