import { useState, useEffect, SetStateAction} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Modal } from "react-bootstrap"; 


function NavigationBar() {
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const toggleMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    document.body.style.backgroundColor = darkMode ? "#273B09" : "#DCD7C9";
    document.body.style.color = darkMode ? "white" : "#273B09";
  }, [darkMode]);

  const handleShowModal = (content: SetStateAction<string>) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar expand="md" style={{ backgroundColor: darkMode ? "#273B09" : "#DCD7C9", fontWeight: "800", padding: "5px 50px" }}>
        <Navbar.Brand style={{ color: darkMode ? "white" : "#273B09", cursor: "pointer" }} onClick={() => handleShowModal("Dena'ina Place Names is in development. Stay tuned!")}>
          Dena'ina Place Names
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="w-100 d-flex align-items-center" style={{ gap: "30px", fontSize: "20px", fontWeight: "800", overflow: "auto" }}>
            <Nav.Link onClick={() => handleShowModal("Home is in development. Stay tuned!")} style={{ color: darkMode ? "white" : "#273B09", cursor: "pointer" }}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleShowModal("Maps feature is in development. Stay tuned!")} style={{ color: darkMode ? "white" : "#273B09", cursor: "pointer" }}>
              Maps
            </Nav.Link>
            <Nav.Link onClick={() => handleShowModal("About section is in development. Stay tuned!")} style={{ color: darkMode ? "white" : "#273B09", cursor: "pointer" }}>
              About
            </Nav.Link>
            <Nav.Link onClick={() => handleShowModal("FAQ feature is in development. Stay tuned!")} className="flex-grow-1" style={{ color: darkMode ? "white" : "#273B09", cursor: "pointer" }}>
              FAQ
            </Nav.Link>
            <Button variant="outline-light" onClick={toggleMode} style={{ fontSize: "20px", color: darkMode ? "white" : "#273B09", border: "none" }}>
              {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
            </Button>
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
