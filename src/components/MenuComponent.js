import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    // One way of writing a function component
    function RenderMenuItem({ dish, onClick }) {
        return(
            <Card>
                <Link to={`/menu/${dish.id}`} >
                    <CardImg width="100%" src={dish.image} alt = {dish.name}></CardImg>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
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
                    <RenderMenuItem dish = {dish} />
                </div>
            );
        });


        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

        


export default Menu;