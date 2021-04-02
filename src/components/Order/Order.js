import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../../App';

const CheckOut = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { id } = useParams();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`https://pumpkin-crumble-67893.herokuapp.com/selectedProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data.reverse());
            })
    })
    let date_ob = new Date();
    return (
        <div className="container bg-light">
                  <h1 className="text-center">User Details</h1>
                  <hr/>
            <table className="w-100">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{loggedInUser.name}</td>
                        <td> {loggedInUser.email}</td>
                        <td> {date_ob.getMonth() + '/' + date_ob.getDate() + '/' + date_ob.getFullYear()}</td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <table className="w-100 mt-5">
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
            <div>
                <Button className="btn btn-success float-right mt-5">Order Now</Button>
            </div>
        </div>
    );
};

export default CheckOut;