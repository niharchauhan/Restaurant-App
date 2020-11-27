import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

    // One way of writing a functiona component
    function RenderMenuItem({ dish, onClick }) {
        return(
            <Card onClick={()=> onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt = {dish.name}></CardImg>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        );
    }

    // Another way of writing functional component
    // Can also be written as function Menu(props)
    const Menu = (props) => {
        // iterating through every dish in the dishes array
        const menu = props.dishes.map((dish) => {
            return(
                // key is used to uniquely identify items in an array
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish = {dish} onClick={props.onClick} />
                </div>
            );
        });


        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

        


export default Menu;