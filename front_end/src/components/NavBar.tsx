import React from "react"
import { Container, Navbar, Nav, NavDropdown, OverlayTrigger, Popover, Button, InputGroup, Form} from "react-bootstrap"
import AppService from "../AppService";
import { sha256 } from 'js-sha256';
import "../styles/NavBar.css"

const left_right_margin = "10px";

interface IProps {
}

interface IState {
    create_user: boolean;
    username : string;
    password : string;
    logged_in : boolean;
    show_pass : boolean;
}

function hash (string:string) {
    return sha256(string);
}

class NavBar extends React.Component <IProps, IState> {
    appService : AppService;

    constructor(props: IProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            create_user: true,
            logged_in: false,
            show_pass: false
        }
        this.appService = new AppService();
    }
    createUser = () => {
        this.appService.createUser([this.state.username, hash(this.state.password)]).then((res : any) => {
            if (!res.success)
                alert(res.error);
            else {
                alert(res.message);
            }
        });
    }

    login = () => {
        this.appService.login([this.state.username, hash(this.state.password)]).then((res : any) => {
            if (!res.success)
                alert(res.error);
            else {
                alert(res.message);
                this.setState({logged_in: true})
            }
        });
    }
    render() {
        const renderDropdown = () => {
            return (
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                        Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                        Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                </NavDropdown>
            );
        }
        const renderLogin = () => {
            return (
                this.state.create_user ? 
                <OverlayTrigger
                    trigger="click"
                    placement={"bottom"}
                    overlay={
                        <Popover id={`popover-positioned-bottom`}>
                        <Popover.Header as="h3">{"Create Profile"}</Popover.Header>
                        <Popover.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e:any) => {this.setState({username: e.target.value})}}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    onChange={(e:any) => {this.setState({password: e.target.value})}}
                                    type={this.state.show_pass ? "Password" : ""}
                                />
                                <InputGroup.Text id="basic-addon1">
                                    <i onClick={() => {this.setState({show_pass: !this.state.show_pass})}} className={this.state.show_pass ? "far fa-eye" : "fa fa-eye-slash"} id="togglePassword"></i>
                                </InputGroup.Text>  
                            </InputGroup>
                            <Button onClick={this.createUser}>Create User</Button>
                            <Button onClick={() => {this.setState({create_user: false})}}>Already A User?</Button>
                        </Popover.Body>
                        </Popover>
                    }
                    >
                    <Button variant="secondary" style={{marginRight: left_right_margin}}>Log In</Button>
                </OverlayTrigger>
                :
                <OverlayTrigger
                    trigger="click"
                    placement={"bottom"}
                    overlay={
                        <Popover id={`popover-positioned-bottom`}>
                        <Popover.Header as="h3">{"Login"}</Popover.Header>
                        <Popover.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e:any) => {this.setState({username: e.target.value})}}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    onChange={(e:any) => {this.setState({password: e.target.value})}}
                                    type={this.state.show_pass ? "Password" : ""}
                                />
                                <InputGroup.Text id="basic-addon1">
                                    <i onClick={() => {this.setState({show_pass: !this.state.show_pass})}} className={this.state.show_pass ? "far fa-eye" : "fa fa-eye-slash"} id="togglePassword"></i>
                                </InputGroup.Text>  
                            </InputGroup>
                            <Button onClick={this.login}>Log In</Button>
                            <Button onClick={() => {this.setState({create_user: true})}}>Create A New User</Button>
                        </Popover.Body>
                        </Popover>
                    }
                    >
                    <Button variant="secondary" style={{marginRight: left_right_margin}}>Log In</Button>
                </OverlayTrigger>
            );
        }
        return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container style={{maxWidth: "100%"}}>
                <Navbar.Brand href="#home" style={{marginLeft: left_right_margin}}>Pursuit</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        {/* {
                            this.state.logged_in ? renderDropdown() : <Nav.Link href="#link">Log In</Nav.Link>
                        } */}
                    </Nav>
                    {renderLogin()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {this.state.logged_in ? "Logged In" : "Logged Out"}
        </>
        );
    }
}

export default NavBar;