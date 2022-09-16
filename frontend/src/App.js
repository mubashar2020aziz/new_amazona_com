import './App.css';
import { useContext } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProuductScreen from './screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
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
                <Nav className="ms-auto">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                </Nav>
              </Container>
            </Navbar>
          </header>

          <main>
            <Container className="my-2">
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
