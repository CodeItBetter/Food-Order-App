import React,{ useContext } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Meals from './components/Meals/Meals';
import {AuthContext} from './components/store/AuthContext';

function App() {
    const ctx = useContext(AuthContext);

  return (
    <div className="App">  
        {ctx.toggle && <Cart /> }
        <Header />
        <Meals />
    </div>
  );
}

export default App;
