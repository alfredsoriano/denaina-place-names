import { useState, useEffect, SetStateAction, useContext} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Modal } from "react-bootstrap"; 
import { ThemeContext } from "../context/ThemeContext";

<>
</>

function NavigationBar() {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkTheme ? "dark" : "light");
    document.body.style.backgroundColor = darkTheme ? "#273B09" : "#DCD7C9";
    document.body.style.color = darkTheme ? "white" : "#273B09";
  }, [darkTheme]);

  const handleShowModal = (content: SetStateAction<string>) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar expand="md" style={{ fontWeight: "900", padding: "5px 50px" }}>
        <Navbar.Brand style={{ color: darkTheme ? "white" : "#273B09", cursor: "pointer", marginRight: "30px" }} onClick={() => handleShowModal("Dena'ina Place Names is in development. Stay tuned!")}>
          Dena'ina Place Names
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="w-100 d-flex align-items-center" style={{ gap: "30px", fontSize: "20px", fontWeight: "800", overflow: "auto" }}>
            <Nav.Link onClick={() => handleShowModal("About section is in development. Stay tuned!")} style={{ color: darkTheme ? "white" : "#273B09", cursor: "pointer" }}>
              About
            </Nav.Link>
            <Nav.Link onClick={() => handleShowModal("FAQ feature is in development. Stay tuned!")}  style={{ color: darkTheme ? "white" : "#273B09", cursor: "pointer" }}>
              FAQ
            </Nav.Link>
            <div className="flex-grow-1" style={{textAlign: 'right'}}>
            <Button variant="outline-light" onClick={toggleTheme} style={{ fontSize: "20px", color: darkTheme ? "white" : "#273B09", border: "none" }}className="float-right">
              {darkTheme ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
            </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>In Development</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavigationBar;
