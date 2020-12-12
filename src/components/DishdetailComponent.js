import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    function RenderDish({dish}) {
        return (
            <FadeTransform in
                transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }} >   
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }

    function RenderComments({comments, postComment, dishId}) {
        let options = { year : "numeric", month : "short", day : "numeric" };
        var commentList = comments.map(comment => {
            return (
                <Fade in>
                    <li key={comment.id} >
                        {comment.comment}
                        <br /><br />
                        -- {comment.author}, {new Date(comment.date).toLocaleDateString("en-IN", options) }
                        <br /><br />
                    </li>
                </Fade>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {commentList}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false,
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        render() {
            return(
                <React.Fragment>
                    <Button outline onClick = {this.toggleModal}><span className="fa fa-pencil fa-lg"> Submit Comment</span></Button>
                    <Modal isOpen={this.state.isModalOpen} onHide={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>

                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                <Row className="form-group col-12">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                        <option >1</option>
                                        <option >2</option>
                                        <option >3</option>
                                        <option >4</option>
                                        <option >5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group col-12">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors model=".author" className="text-danger" show="touched" 
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                    />
                                </Row>
                                <Row className="form-group col-12">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }


    class DishDetail extends Component {
        render() {
            console.log("DishdetailComponent render invoked");

            if(this.props.isLoading) {
                return (
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }

            else if(this.props.errMess) {
                return (
                    <div className="container">
                        <div className="row">
                            <h4>{this.props.errMess}</h4>
                        </div>
                    </div>
                );
            }

            else if (this.props.dish!=null) {
                return (
                    <React.Fragment>
                        <div className = "container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{this.props.dish.name}</h3>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-5 m-1">
                                    <RenderDish dish = {this.props.dish} />
                                </div>
                                <div className="col-12 col-md-5 m-1">
                                    <RenderComments comments = {this.props.comments}
                                        postComment = {this.props.postComment}
                                        dishId = {this.props.dish.id} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
            else {
                return (
                    <div></div>
                );
            }
        }
    }

export default DishDetail;