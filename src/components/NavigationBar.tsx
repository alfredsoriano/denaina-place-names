import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

function NavigationBar() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    document.body.style.backgroundColor = darkMode ? "#273B09" : "#DCD7C9";
    document.body.style.color = darkMode ? "white" : "#273B09";
  }, [darkMode]);

  return (
    <Navbar
      style={{
        backgroundColor: darkMode ? "#273B09" : "#DCD7C9",
        padding: "5px 50px",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Nav
        className="w-100 d-flex align-items-center"
        style={{
          gap: "30px",
          fontSize: "20px",
          fontWeight: "800",
          overflow: "auto",
        }}
      >
        <Nav.Link href="#home" style={{ color: darkMode ? "white" : "#273B09"}}>
          Dena'ina Place Names
        </Nav.Link>
        <Nav.Link href="#maps" style={{ color: darkMode ? "white" : "#273B09"}}>
          Maps
        </Nav.Link>
        <Nav.Link href="#about" style={{ color: darkMode ? "white" : "#273B09"}}>
          About
        </Nav.Link>
        <Nav.Link href="#FAQ" style={{ color: darkMode ? "white" : "#273B09"}}>
          FAQ
        </Nav.Link>
      </Nav>

      <Button
        variant="outline-light"
        onClick={toggleMode}
        style={{ color: darkMode ? "white" : "#273B09", border: "none" }}
      >
        {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
      </Button>
    </Navbar>
  );
}

export default NavigationBar;
