
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from '../context/UserContext'



const HeaderComponent = () => {
    const navigate = useNavigate()
 const handleLogout = () => {
    logout();
    navigate("/")
  };  
  const { user, logout } = useAuth();


  console.log("user", user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
            <Nav>
            {user? (
              <>        
              <NavDropdown title={`${user.FirstName} ${user.LastName}`} >
              <NavDropdown.Item  onClick={() => handleLogout()}>Logout</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to={`/balances/${user.id}`}>
                  <Nav.Link>My Balances</Nav.Link>
                </LinkContainer>
              <LinkContainer to={`/transactions/${user.id}`}>
                  <Nav.Link>My Transactions</Nav.Link>
                </LinkContainer>

              </>
            ) : (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>

              </>
            )}

          </Nav>

      </Container>
    </Navbar>
  );
}

export default HeaderComponent;