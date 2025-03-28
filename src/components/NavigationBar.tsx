import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() {
  return (
    <Navbar style={{ backgroundColor: "#273B09", padding: "5px 50px", maxHeight: "100vh", maxWidth: "100vw"}}>
      <Nav className="w-100 d-flex align-items-center" style={{ gap: "30px", fontSize: "20px", fontWeight: "800", overflow: "auto"}}>
        <Nav.Link href="#home" style={{ color: "white" }}>Dena'ina Place Names</Nav.Link>
        <Nav.Link href="#maps" style={{ color: "white" }}>Maps</Nav.Link>
        <Nav.Link href="#about" style={{ color: "white" }}>About/About us</Nav.Link>
        <Nav.Link href="#FAQ" style={{ color: "white" }}>FAQ</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;