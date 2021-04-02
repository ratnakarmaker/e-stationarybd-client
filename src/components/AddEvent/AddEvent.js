import './AddEvent.css';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';

function AddEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://pumpkin-crumble-67893.herokuapp.com/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.reverse());
      })
  })

  const history = useHistory();
  const [imgUrl, setImgUrl] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const eventData = {
      title: data.eventTitle,
      price: data.eventPrice,
      imageUrl: imgUrl
    }

    fetch(`https://pumpkin-crumble-67893.herokuapp.com/addEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then(res => history.push('/'))
  };

  // Delete product
  const deleteProduct = (id) => {
    fetch(`https://pumpkin-crumble-67893.herokuapp.com/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        if (result) {

        }
      })
  };

  const handleImageUplaod = event => {
    const imageData = new FormData();
    imageData.set('key', 'cb6956f473cc2ad7cdb82dade8c6ea70');
    imageData.append('image', event.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(res => setImgUrl(res.data.data.display_url))
      .catch(error => console.log(error));
  }

  return (
    <div className="AddEvent">
      <div className="container mt-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Add Product</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Manage Product</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Edit Product</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card style={{ maxWidth: '600px', margin: '50px auto' }}>
                    <Card.Body>
                      <h4 className="text-center">Create New Product</h4>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                          <Form.Label>Product Title</Form.Label>
                          <Form.Control type="text" name="eventTitle" placeholder="Product  Title" ref={register({ required: true, maxLength: 30 })} />
                          {errors.eventTitle ? <span className="text-danger">maximum character is 20</span> : <span className="text-info">maximum caracter is 20</span>}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Product Price</Form.Label>
                          <Form.Control type="text" name="eventPrice" placeholder="price" ref={register({ required: true })} />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Product Thumbnail</Form.Label>
                          <Form.Control type="file" name="eventImageUrl" ref={register({ required: true })} onChange={handleImageUplaod} />
                          {errors.eventImageUrl ? <span className="text-danger">Product need an image</span> : <span className="text-info">select an imgage</span>}
                        </Form.Group>
                        {imgUrl === '' ?
                          <Button variant="primary" type="submit" disabled>Submit</Button> :
                          <Button variant="primary" type="submit">Submit</Button>
                        }
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        events.map((event) => {
                          return (
                            <tr>
                              <td>1</td>
                              <td>{event.title}</td>
                              <td>{event.price}</td>
                              <td><button onClick={() => deleteProduct(event._id)}>Delete</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h1>This is Edit Product Tab</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  )
}

export default AddEvent;
