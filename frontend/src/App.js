import './App.css';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProuductScreen from './screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column site-container">
          <ToastContainer position="bottom-center" limit={1} />
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
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-drowpdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
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
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
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
