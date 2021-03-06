import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckOut = (props) => {
    const { id } = useParams();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`https://pumpkin-crumble-67893.herokuapp.com/selectedProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data.reverse());
            })
    })
    console.log(id)
    return (
        <div className="container bg-light">
            <table className="w-100">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map((event, idx, id) => {
                            return (
                                <tr key={idx}>
                                    <td>1</td>
                                    <td>{event.title}</td>
                                    <td>1</td>
                                    <td>{event.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="float-right mt-5">
                {
                    events.map((event, idx, id) => {
                        return (

                            <Link to={`/order/${event._id}`} className="ride_select"><Button>Proceed to Checkout</Button></Link>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CheckOut;