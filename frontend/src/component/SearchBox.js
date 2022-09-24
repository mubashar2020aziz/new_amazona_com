import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const [query, setQuery] = useState(' ');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <>
      <Form className="d-flex me-auto" onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search products"
            aria-label="Search Products"
            aria-describedby="button-search"
          ></FormControl>
          <Button variant="outline-primary" type="submit" id="button-search">
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchBox;
