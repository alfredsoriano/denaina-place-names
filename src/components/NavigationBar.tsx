import { useState, useEffect, SetStateAction, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";


function NavigationBar() {
  const {darkTheme, toggleTheme} = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkTheme ? "dark" : "light");
    document.body.style.backgroundColor = darkTheme ? "#273B09" : "#DCD7C9";
    document.body.style.color = darkTheme ? "white" : "#273B09";
  }, [darkTheme]);

  const handleShowModal = (title: string, content: SetStateAction<string>) => {
    setModalTitle(title)
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar
        expand="md"
        style={{
          fontWeight: "900",
          padding: "5px 40px",
          paddingRight: "calc(50px - 40px)",
          width: "100vw",
        }}
      >
        <Navbar.Brand
          style={{
            color: darkTheme ? "white" : "#273B09",
            cursor: "pointer",
            marginRight: "30px",
            textAlign: "center",
          }}
          onClick={() =>
            window.location.reload()
          }
        >
          Dena'ina Place Names
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav
            className="w-100 d-flex align-items-center"
            style={{
              gap: "30px",
              fontSize: "20px",
              fontWeight: "800",
              overflow: "auto",
            }}
          >
            <Nav.Link
              onClick={() =>
                handleShowModal("About", 
                `This interactive map and web application is aimed to 
                provide users with historical and cultural information about Dena'ina places within 
                Anchorage and the greater southcentral area. The goal is to provide a user-friendly 
                experience to learn about Dena'ina place names and their historical and cultural significance. 
                It targets the imporantance for the heritage and culture revitalization efforts in Alaska. 
                This project will focus specifically on the Upper Cook Inlet Dena'ina region, with the target dialect 
                of the Upper Cook Inlet Dena'ina Dene.  

                <br/><br/>

                This application was made by Alfred Soriano, Chris Yang, and Jiwon Bae from the University of Alaska Anchorage (UAA).
                Working alongside us are local cultural heritage initiative professors Dr. Maria Williams and Dr. Jessica Ross from UAA,
                with technical mentorship from Dr. Pradeeban Kathiravelu.`)
              }
              style={{
                color: darkTheme ? "white" : "#273B09",
                cursor: "pointer",
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                handleShowModal("Credits", 
                `For the audios recordings we would like to give special thanks to:
                <br/><br/>
                Angeleen Waskey <br/>
                Donita Slawson <br/>
                Hna'estał Edna Standifer <br/>
                Jessica Ross <br/>
                Zachary Milliman
                <br/><br/>
                For the photos and videos taken by our friends and contributors, we give thanks to:
                <br/><br/>
                Maria Williams <br/>
                Zachary Lane <br/>
                Mee Xiong <br/>
                Adam Leggett <br/>
                Eklutna, Inc. 
                <br/><br/>
                Thank you to all our friends and family for their valuable feedback.`)
              }
              style={{
                color: darkTheme ? "white" : "#273B09",
                cursor: "pointer",
              }}
            >
              Credits
            </Nav.Link>
            <div className="flex-grow-1" style={{ textAlign: "right" }}>
              <Button
                variant={darkTheme ? "outline-dark" : "outline-light"}
                onClick={toggleTheme}
                style={{
                  fontSize: "20px",
                  color: darkTheme ? "white" : "#273B09",
                  border: "none",
                }}
                className="float-right"
              >
                {darkTheme ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div dangerouslySetInnerHTML={{ __html: modalContent }} /></Modal.Body>
      </Modal>
    </>
  );
}

export default NavigationBar;
