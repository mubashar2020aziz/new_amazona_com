import React, { useContext, useEffect, useReducer } from 'react';
//import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useNavigate, useParams } from 'react-router-dom';
//import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Store } from '../Store';
import { getError } from '../utls';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Card, Row, Col } from 'react-bootstrap';
//import LoadingBox from '../component/LoadingBox';
//mport { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrderScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ order }, dispatch] = useReducer(reducer, {
    order: {},
  });

  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  // function createOrder(data, actions) {
  //   return actions.order
  //     .create({
  //       purchase_units: [
  //         {
  //           amount: { value: order.totalPrice },
  //         },
  //       ],
  //     })
  //     .then((orderID) => {
  //       return orderID;
  //     });
  // }
  // function onApprove(data, actions) {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       dispatch({ type: 'PAY_REQUEST' });
  //       const { data } = await axios.put(
  //         `/api/order/${order._id}/pay`,
  //         details,
  //         {
  //           headers: { authorization: `Bearer ${userInfo.token}` },
  //         }
  //       );
  //       dispatch({ type: 'PAY_SUCCESS', payload: data });
  //       toast.success('order is paid');
  //     } catch (err) {
  //       dispatch({ type: 'PAY_FAIL', payload: getError(err) });
  //       toast.error(getError(err));
  //     }
  //   });
  // }
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/order/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
      // } else {
      //   const loadPayPalScript = async () => {
      //     const { data: clientId } = await axios.get('/api/keys/paypal', {
      //       headers: { authorization: `Bearer ${userInfo.token}` },
      //     });
      //   paypalDispatch({
      //     type: 'resetOptions',
      //     value: {
      //       'client-id': clientId,
      //       currency: 'USD',
      //     },
      //   });
      //   paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      // };
      // loadPayPalScript();
    }
  }, [order, userInfo, orderId, navigate]);
  return (
    <>
      <div>
        <Helmet>
          <title>Order {orderId}</title>
        </Helmet>
        <h2 className="my-3">Order {orderId}</h2>
        <Row>
          <Col md={6} sm={4}>
            {/* <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {order.shippingAddress.fullame} <br />
                  <strong>Address</strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </Card.Text>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </Card.Body>
            </Card> */}
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {order.paymentMethod}
                </Card.Text>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>

            {/* <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          />
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>
                          <span>${item.price}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card> */}
          </Col>
          <Col md={4}>
            {/* <Card className="mb-3">
              <Card.Body>
                <Card.Title>Order Summery</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Order Total</Col>
                      <Col>${order.totalPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            {!order.isPaid && (
              <ListGroup.Item>
                {isPending ? (
                  <LoadingBox />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApproval={onApprove}
                    ></PayPalButtons>
                  </div>
                )}
              </ListGroup.Item>
            )} */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderScreen;
