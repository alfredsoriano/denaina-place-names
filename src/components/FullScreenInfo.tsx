import { DenainaLocation } from "..";

const FullScreenInfo = ({ location, isOpen, onClose }: {
  location: DenainaLocation | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (location === null || isOpen === false) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '90vw',
      height: '100vh',
      // backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backgroundColor: 'white',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
    <div style={{
      position: 'absolute',
      top: '25px',
      left: '25px',
      padding: '20px 20px',
      fontSize: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      fontWeight: 'bold',
      color: 'White',
    }}>
      {location.title}
    </div>

    <p>{location.description ?? 'No description available.'}</p>
    {location.imageUrl && <img src={location.imageUrl} alt={location.title} style={{ width: '80%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} />}
      
    <button
      onClick={onClose}
      style={{
        position: 'fixed',
        top: '10px',
        right: '10pt',
        marginTop: '1px',
        padding: '5px 10px',
        fontSize: '20px',
        borderRadius: '90%', // Make it circular
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'White',
        border: 'none',
        cursor: 'pointer',
      }}>
        X
      </button>
    </div>
  );
};

export default FullScreenInfo;
