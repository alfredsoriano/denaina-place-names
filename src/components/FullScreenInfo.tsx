import { useContext, useState, useRef } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { DenainaLocation } from "../types";
import { ThemeContext } from "../context/ThemeContext";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import "./FullScreenInfo.css";

const FullScreenInfo = ({
  location,
  isOpen,
  onClose,
}: {
  location: DenainaLocation | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const nameAudioRef = useRef<HTMLAudioElement>(null);
  const storyAudioRef = useRef<HTMLAudioElement>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  if (location === null || isOpen === false) return null;

  //function that resets carousel index upon closing a pop-up window
  const handleClose = () => {
    setActiveIndex(0);
    onClose();
  };

  // updated function to load media type: returns image, video, or embedded YouTube video
  const loadMedia = (item: string) => {
    const ext = item.split(".").pop()?.toLowerCase();
    const isImage = ext === "jpg" || ext === "jpeg" || ext === "png";
    const isVideo = ext === "mp4" || ext === "mov" || ext === "webm";

    if (isImage) {
      return (
        <img
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "10px",
          
          }}
          src={item}
          alt="location media"
        />
      );
    }

    if (isVideo) {
      return (
        <video
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        >
          <source src={item} type={`video/${ext}`} />
          ERROR cant play video
        </video>
      );
    }

    // if there is a youtube video play that instead
    if (item.includes("youtube.com") || item.includes("youtu.be")) {
      const getYouTubeEmbedUrl = (url: string) => {
        const videoId = url.includes("v=")
          ? url.split("v=")[1].split("&")[0]
          : url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&showinfo=0&rel=0`;
      };

      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <iframe
            src={getYouTubeEmbedUrl(item)}
            title="YouTube Video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return null;
  };

  // main code block for fullscreeninfo
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100dvh",
        width: "100vw",
        backgroundColor: darkTheme ? "#2C3930" : "#E3E4DB",
        color: darkTheme ? "#DCD7C9" : "#2C3930",
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        overflowY: "auto",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* Headers
        <h1> is reserved for the English Location Title Name
        <h2> is reserved for the Dena'ina Name and Dena'ina Meaning (audio)
        <h3> is reserved for the Description
        <h2> is reserved for the Dena'ina Place Name story and audio
      */}

      {/* Styling for the background for the title */}
      <div
        style={{
          width: "100%",
          minHeight: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundImage: `url(${location.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#DCD7C9",
            textShadow: "1px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          {location.title}
        </h1>
      </div>

      <div>
        {/* div style paragraph text inside scrollable container */}
        <div
          style={{
            flex: "1 1 400px",
            width: "auto",
            backgroundColor: darkTheme ? "#394D3D" : "#fff",
            padding: "14px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            height: "auto",
            overflow: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* div style for the dena name and audio */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: darkTheme ? "#3C493F" : "#EFEFEF",
              padding: "10px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h2
              onClick={() => {
                if (location.audioUrl) {
                  const audio = nameAudioRef.current;
                  if (audio) {
                    if (audio.paused) {
                      audio.play();
                    } else {
                      audio.pause();
                      audio.currentTime = 0; //Reset audio to the start
                    }
                  }
                }
              }}
              style={{
                margin: 0,
                fontSize: "1.5rem",
                cursor: location.audioUrl ? "pointer" : "default",
                textDecoration: location.audioUrl ? "underline" : "none",
              }}
            >
              {location.denainaName ?? "No Dena'ina Name available."}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "1.0rem",
                fontStyle: "italic",
              }}
            >
              {location.denainaMeaning ?? "No meaning available."}
            </p>

            {location.audioUrl && (
              <audio ref={nameAudioRef} style={{ display: "none" }}>
                <source src={location.audioUrl} type="audio/mp3" />
                <source src={location.audioUrl} type="audio/mp4" />
                No Audio found.
              </audio>
            )}
          </div>

          {/* div for the description box*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              textAlign: "left",
              backgroundColor: darkTheme ? "#3A4F41" : "#EFEFEF",
              padding: "20px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <div style={{ marginBottom: "0.3rem" }}>
              <h3
                style={{
                  marginBottom: "0.1rem",
                  fontSize: "1.5rem",
                }}
              >
                Local Description
              </h3>
            </div>
            <p>
              <span
                dangerouslySetInnerHTML={{
                  __html: location.description
                    ? location.description.join(" ")
                    : "No local description found.",
                }}
              />
            </p>
          </div>

          {/* div for the culture/story box*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "left",
              backgroundColor: darkTheme ? "#4B5842" : "#EFEFEF",
              padding: "20px 20px",
              borderRadius: "8px",
            }}
          >
            <div style={{ marginBottom: "0.3rem" }}>
              <h4
                onClick={() => {
                  if (location.audioUrlculture) {
                    const audio = storyAudioRef.current;

                    if (audio) {
                      if (audio.paused) {
                        audio.play();
                      } else {
                        audio.pause();
                        audio.currentTime = 0; // Optional: Reset audio to the start
                      }
                    }
                  }
                }}
                style={{
                  cursor: location.audioUrlculture ? "pointer" : "default",
                  textDecoration: location.audioUrlculture
                    ? "underline"
                    : "none",
                  fontSize: "1.5",
                }}
              >
                Place Name Story
              </h4>

              {location.audioUrlculture && (
                <audio ref={storyAudioRef} style={{ display: "none" }}>
                  <source src={location.audioUrlculture} type="audio/mp3" />
                  <source src={location.audioUrlculture} type="audio/mp4" />
                  No Audio Found.
                </audio>
              )}
            </div>
            <span
              dangerouslySetInnerHTML={{
                __html: location.culture
                  ? location.culture.join(" ")
                  : "No cultural description found.",
              }}
            />
          </div>
        </div>

        {/* react-bootstrap carousel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <Button
            variant="light"
            onClick={() => setShowFullscreen(true)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "1px solid #ccc",
              padding: "4px 4px",
            }}
          >
            <HiOutlineArrowsExpand size={25} />
          </Button>

          <Carousel
            className="custom-carousel"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            interval={null}
            activeIndex={activeIndex}
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            controls={location.media.length > 1}
          >
            {location.media.map((item: any, i: any) => (
              <Carousel.Item key={i}>{loadMedia(item)}</Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Modal
          show={showFullscreen}
          onHide={() => setShowFullscreen(false)}
          centered
          size="xl"
          fullscreen
        >
          <Modal.Header closeButton style={{ backgroundColor: darkTheme ? "#2C3930" : "#E3E4DB"}}></Modal.Header>
          <Modal.Body style={{ backgroundColor: darkTheme ? "#2C3930" : "#E3E4DB"}}>{loadMedia(location.media[activeIndex])}</Modal.Body>
        </Modal>
      </div>

      <div
        style={{
          paddingBottom: "30px",
        }}
      >
        <p
          style={{
            color: darkTheme ? "#DCD7C9" : "#2C3930",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {location.citations?.[activeIndex] || "Source not found."}
        </p>
      </div>

      {/* react-bootstrap button */}
      <Button
        variant="success"
        onClick={handleClose}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = darkTheme
            ? "#AEBD93"
            : "#8B786D";
          e.currentTarget.style.borderColor = darkTheme ? "#AEBD93" : "#8B786D";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = darkTheme
            ? "#596F62"
            : "#D2BBA0";
          e.currentTarget.style.borderColor = darkTheme ? "#596F62" : "#D2BBA0";
        }}
        style={{
          position: "fixed",
          top: "70px",
          right: "10pt",
          backgroundColor: darkTheme ? "#596F62" : "#D2BBA0",
          borderColor: darkTheme ? "#596F62" : "#D2BBA0",
          color: darkTheme ? "white" : "#2C3930",
          fontWeight: "bold",
          zIndex: 1000,
        }}
      >
        &#x2715;
      </Button>
    </div>
  );
};

export default FullScreenInfo;
