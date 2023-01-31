import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TokenContext } from "../AppContext";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";

function MyNavbar() {
  const [token, setToken] = useContext(TokenContext);

  return (
    <Navbar bg="dark" variant="dark" className="d-flex align-items-center">
      <Container>
        <Navbar.Brand href="#home">PokerLy</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {token === "EMPTY" ? renderLoginButtons() : renderWelcome(token)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  function renderLoginButtons() {
    return (
      <div>
        <Link to="login">
          <Button className="mx-2">Log In</Button>
        </Link>
        <Button>Sign Up</Button>
      </div>
    );
  }

  function renderWelcome() {
    return (
      <div className="d-flex align-items-center">
        <p className="text-light m-1 mx-2">Welcome: {jwt(token).username}</p>
        <Link to="/">
          <Button
            onClick={() => {
              setToken("EMPTY");
            }}
          >
            Log Out
          </Button>
        </Link>
      </div>
    );
  }
}

export default MyNavbar;
