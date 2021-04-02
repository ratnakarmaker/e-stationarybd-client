import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';

const CheckOut = () => {
    const { id } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://pumpkin-crumble-67893.herokuapp.com/selelctedProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.reverse());
            })
    })
    console.log(id)
    return (
        <div>
            {
                products.map((product, idx, id) => {
                    return (
                        <Card style={{ width: '16rem', marginBottom: '20px' }} className="bg-dark" key={idx}>
                            <Card.Img variant="top" src={product.imageUrl} style={{ height: '200px' }} />
                            <Card.Body>
                                <Card.Title className="text-center text-white">{product.title}</Card.Title>
                                <Card.Title className="text-center text-white">{product.price}</Card.Title>
                                {/* <Link className="ride_select" to={`/checkout/${product._id}`}>Buy Now</Link> */}
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    );
};

export default CheckOut;