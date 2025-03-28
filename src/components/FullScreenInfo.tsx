import { useState } from "react";
import { Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

const FullScreenInfo = ({
  location,
  isOpen,
  onClose,
}: {
  location: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (location === null || isOpen === false) return null;

  //const [showVideo, setShowVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const toggleAudio = () => {
    setPlayAudio((prev) => !prev);
  };

  //const handleImageClick = () => {
    //if (location.videoUrl) {
     // setShowVideo(true);
    //}
 // };

  //function to get YouTube embedded video URL
  const getYouTubeEmbedUrl = (videoUrl: string) => {
    const videoId = videoUrl.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0`;
  };

  //function to load media type: returns either image or video
  const loadMedia = (item: string) => {
      let temp: string[] = item.split('.');
      if (temp[1] == "jpg" || temp[1] == "png")
        return <img
            style = {{
              width: "100%",
              height: "36cqh",
              objectFit: "cover"
            }}
            src={item}
          />
      else
        return <iframe
            style={{
              display: "cover",
              width: "100%",
              height: "36cqh"
            }}
            src={getYouTubeEmbedUrl(location.videoUrl)}
            title={location.title}
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
  }

  return (
    // div styling for the pop-up window
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh", 
        width: "100vw",
        backgroundColor: "#2C3930",
        color: "#DCD7C9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        overflowY: "hidden", 
        padding: "20px", 
        zIndex: 1000,
      }}
    >
      
      {/* Headers
      <h1> is reserved for the English Location Title Name
      <h2> is reserved for the Dena'ina Name and Dena'ina Meaning
       */}
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
            {playAudio ? "Pause Audio" : "Play Audio"}
          </button>
        )}
        {playAudio && location.audioUrl && (
          <iframe
            width="0%"
            height="0"
            src={getYouTubeEmbedUrl(location.audioUrl, playAudio ? 1 : 0)}
            title={`${location.title} Audio`}
            frameBorder="0"
            allow="autoplay"
            style={{ marginTop: "20px", display: "block" }} 
          />
        )}
      </h2>


      {/* div style for scrollable container */}
      <div style = {{
        height: "40vh",
        minHeight: "30vh",
        overflow: "auto", 
        marginTop: "20px",
        marginBottom: "20px"}
      }>
      {/* div style paragraph text inside scrollable container */}
        <p style={{
          marginLeft: "5%", 
          marginRight: "5%", 
          marginTop: "1%" 
        }}>
          {location.description ?? "No description found."} <br></br>
          <br></br> {location.culture ?? "No cultural description found."}
        </p>
      </div>

      {/* react-bootstrap carousel */}
      <Carousel style={{
        width: "80vw",
        maxHeight: "36vh",
        borderRadius: "10px",
        overflow: "hidden"}}
        interval = {null} // react-bootstrap: disable auto scrolling
        >
        
        {/* map images and videos and display in carousel */}
        {location.media.map((item: any, i: any) => (
          <Carousel.Item key={i}>
            { loadMedia(item) }
          </Carousel.Item>
        ))}
      </Carousel>

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
