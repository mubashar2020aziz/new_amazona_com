import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProuductScreen from './screen/ProductScreen';

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Link to="/">amazona</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProuductScreen />}></Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
