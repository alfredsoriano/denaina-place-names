import { DenainaLocation } from "..";

const FullScreenInfo = ({
  location,
  isOpen,
  onClose,
}: {
  location: DenainaLocation | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (location === null || isOpen === false) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "90vw",
        height: "100vh",
        backgroundColor: "#FFF1DB",
        color: "#543310",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <h1>{location.title}</h1>
      <h2>
        {location.denainaName ?? "No Dena'ina Name available."} -{" "}
        {location.denainaMeaning ?? "No Dena'ina Meaning available."}
      </h2>
      <p>{location.description ?? "No description available."}</p>

      {location.videoUrl ? (
        <iframe
          width="80%"
          height="300"
          src={`https://www.youtube.com/embed/${
            location.videoUrl.split("v=")[1]
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            borderRadius: "10px",
          }}
        />
      ) : location.imageUrl ? (
        <img
          src={location.imageUrl}
          alt={location.title}
          style={{
            width: "80%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ) : (
        <p>No media available.</p>
      )}

      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "10px",
          right: "10pt",
          marginTop: "1px",
          padding: "5px 10px",
          fontSize: "20px",
          borderRadius: "90%",
          backgroundColor: "#E18AAA",
          color: "White",
          border: "none",
          cursor: "pointer",
        }}
      >
        &#x2715;
      </button>
    </div>
  );
};

export default FullScreenInfo;

