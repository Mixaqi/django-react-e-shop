import React from 'react';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import Categories from './components/Categories/Categories';
import CategoriesSlider from './components/CategoriesSlider/CategoriesSlider';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Categories />
      <CategoriesSlider />
      <Footer />
    </div>
  );
}

export default App;
