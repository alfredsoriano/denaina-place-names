import { useContext, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { DenainaLocation } from "../types";
import { ThemeContext } from "../context/ThemeContext";
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
  const [playAudio, setPlayAudio] = useState(false);
  const [playAudio2, setPlayAudio2] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  if (location === null || isOpen === false) return null;

  const toggleAudio = () => {
    setPlayAudio((prev) => !prev);
  };

  const toggleAudio2 = () => {
    setPlayAudio2((prev) => !prev);
  };

  // function to get YouTube embedded video URL
  const getYouTubeEmbedUrl = (videoUrl: string, autoplay = 0) => {
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
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={item}
        />
      );
    else if (location.videoUrl)
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "10px",
            overflow: "hidden",
            //maxWidth: "800px",
          }}
        >
          <iframe
            src={getYouTubeEmbedUrl(location.videoUrl)}
            title={location.title}
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              //maxWidth: "1500px",
              //maxHeight: "500px",
            }}
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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
        padding: "30px",
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
        <h1 style={{ marginBottom: "10px" }}>{location.title}</h1>
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
            height: "auto",
            overflow: "auto",
            marginTop: "20px",
            //marginRight: "10px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* div style for the dena name and audio */}
          <div
            style={{
              display: "flex",
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
            <div>
              <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                {location.denainaName ?? "No Dena'ina Name available."}
              </h2>
              <p style={{ margin: 0, fontStyle: "italic" }}>
                {location.denainaMeaning ?? "No Dena'ina Meaning available."}
              </p>
            </div>

            {location.audioUrl && (
              <>
                <button
                  onClick={toggleAudio}
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                    backgroundColor: "#66785F",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {playAudio ? "Stop Audio" : "Play Audio"}
                </button>

                {playAudio && (
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
              </>
            )}
          </div>

          {/* div for the description box*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              textAlign: "left",
              backgroundColor: darkTheme ? "#3A4F41" : "#EFEFEF",
              padding: "10px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <div style={{ marginBottom: "0.3rem" }}>
              <h3 style={{ marginBottom: "0.1rem" }}>Local Description</h3>
            </div>
            <p><span
                dangerouslySetInnerHTML={{
                  __html: location.description
                    ? location.description.join(" ")
                    : "No local description found.",
                }}
              /></p>
          </div>

          {/* div for the culture/story box*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              textAlign: "left",
              backgroundColor: darkTheme ? "#4B5842" : "#EFEFEF",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <div style={{ marginBottom: "0.3rem" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>
                Place Name Story
                {location.audioUrlculture && (
                  <>
                    <button
                      onClick={toggleAudio2}
                      style={{
                        padding: "6px 12px",
                        fontSize: "14px",
                        backgroundColor: "#66785F",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {playAudio2 ? "Stop Audio" : "Play Audio"}
                    </button>

                    {playAudio2 && (
                      <iframe
                        width="0"
                        height="0"
                        src={getYouTubeEmbedUrl(location.audioUrlculture, 1)}
                        title={`${location.title} Audio`}
                        frameBorder="0"
                        allow="autoplay"
                        style={{ display: "none" }}
                      />
                    )}
                  </>
                )}
              </h4>
            </div>
            <p>
              <span
                dangerouslySetInnerHTML={{
                  __html: location.culture
                    ? location.culture.join(" ")
                    : "No cultural description found.",
                }}
              />
            </p>
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
            marginBottom: "80px",
          }}
        >
          <Carousel
          className = "custom-carousel"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
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
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = darkTheme ? "#AEBD93" : "#8B786D";
          e.currentTarget.style.borderColor = darkTheme ? "#AEBD93" : "#8B786D";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = darkTheme? "#596F62" : "#D2BBA0";
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
          zIndex: 1000
        }}
        
      >
        &#x2715;
      </Button>
    </div>
  );
};

export default FullScreenInfo;
