import { useContext, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { DenainaLocation } from "../types";
import { ThemeContext } from "../context/ThemeContext";

const FullScreenInfo = ({
  location,
  isOpen,
  onClose,
}: {
  location: DenainaLocation | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [playAudio, setPlayAudio] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  if (location === null || isOpen === false) return null;

  const toggleAudio = () => {
    setPlayAudio((prev) => !prev);
  };

  // function to get YouTube embedded video URL
  const getYouTubeEmbedUrl = (videoUrl: string, autoplay = 1) => {
    const videoId = videoUrl.split("v=")[1].split("&")[0]; // Ensure you only get the video ID
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&controls=1&showinfo=0&rel=0`;
  };

  // function to load media type: returns either image or video
  const loadMedia = (item: string) => {
    let temp: string[] = item.split(".");
    if (temp[1] === "jpg" || temp[1] === "png")
      return (
        <img
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "10px",

          }}
          src={item}
        />
      );
    else if (location.videoUrl)
      return (
        <iframe
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            minHeight: "450px"
          }}
          src={getYouTubeEmbedUrl(location.videoUrl)}
          title={location.title}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
  };

  return (
    // div styling for the pop-up window
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: darkTheme ? "#2C3930" : "#DCD7C9",
        color: darkTheme ? "#DCD7C9" : "#2C3930",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        overflowY: "auto",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* Headers
        <h1> is reserved for the English Location Title Name
        <h2> is reserved for the Dena'ina Name and Dena'ina Meaning
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
          borderBottom: "5px solid rgba(0, 0, 0, 0.8)",
        }}
      >
        <h1>{location.title}</h1>
        <h2>
          {location.denainaName ?? "No Dena'ina Name available."} -{" "}
          {location.denainaMeaning ?? "No Dena'ina Meaning available."}
          {location.videoUrl && (
            <button
              onClick={toggleAudio}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                fontSize: "16px",
                backgroundColor: "#66785F",
                color: "White",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {playAudio ? "Stop" : "Play"}
            </button>
          )}
          {playAudio && location.audioUrl && (
            <iframe
              width="0"
              height="0"
              src={getYouTubeEmbedUrl(location.audioUrl, 1)}
              title={`${location.title} Audio`}
              frameBorder="0"
              allow="autoplay"
              style={{ display: "none" }}
            />
          )}
        </h2>
      </div>

      <div>
        {/* div style paragraph text inside scrollable container */}
        <div
          style={{
            flex: "1 1 400px",
            //width: "96vw",
            width: "auto",
            //maxWidth: "600px",
            backgroundColor: darkTheme ? "#394D3D" : "#fff",
            padding: "14px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            height: "5vh",
            minHeight: "30vh",
            overflow: "auto",
            marginTop: "20px",
            //marginRight: "10px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              marginBottom: "1rem",
            }}
          >
            {location.description ?? "No description found."}
          </p>
          <p>{location.culture ?? "No cultural description found."}</p>
        </div>

        {/* react-bootstrap carousel */}
        <div>
          <Carousel
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              marginBottom: "80px",
              //width: "96vw",
              width: "100%", 
              maxHeight: "65vh",
              boxSizing: "border-box",
            }}
            interval={null}
          >
            {location.media.map((item: any, i: any) => (
              <Carousel.Item key={i}>{loadMedia(item)}</Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      {/* react-bootstrap button */}
      <Button
        variant="success"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10pt",
          backgroundColor: "grey",
          borderColor: "grey",
        }}
      >
        &#x2715;
      </Button>
    </div>
  );
};

export default FullScreenInfo;
