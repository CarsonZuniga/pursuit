import React from 'react';
import { Container, Col, Row, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import NavBar from './components/NavBar';
import AppService from './AppService';

interface IProps {
}

interface IState {
}

class App extends React.Component <IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <NavBar />
                {/* <Button onClick={() => {this.setState({logged_in: true})}}>Click Me!</Button> */}
            </>
        );
    }
}

export default App;
