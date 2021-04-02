import './Home.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Home(props) {
  
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pumpkin-crumble-67893.herokuapp.com/events`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setEvents(data.reverse());
      })
  })

  return (
    <div className="Home">
      <div className="container">
        { isLoading &&
          <div className="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        }
        <div className="row">
          {
            events.map((event, idx, id)=> {
              return(
                <div className="col-md-3">
                  <Card className="h-75" key={idx}>
                    <Card.Img variant="top" className="card_pic h-50" src={event.imageUrl} />
                    <Card.Body className="text-center">
                      <Card.Title className="title_color">{event.title}</Card.Title>
                      <Card.Title className="title_color">{event.price}</Card.Title>
                      <Link to={`/checkout/${event._id}`}><p className="text-white btn_color">Buy Now</p></Link>
                    </Card.Body>
                  </Card>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home