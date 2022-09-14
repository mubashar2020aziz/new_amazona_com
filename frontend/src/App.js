import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProuductScreen from './screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column site-container">
          <header>
            <Navbar bg="dark" variant="dark">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>amazona</Navbar.Brand>
                </LinkContainer>
              </Container>
            </Navbar>
          </header>

          <main>
            <Container>
              <Routes>
                <Route
                  path="/product/:slug"
                  element={<ProuductScreen />}
                ></Route>
                <Route path="/" element={<HomeScreen />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <p className="text-center">All right reserved</p>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
