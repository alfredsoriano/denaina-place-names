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
      <h1>{location.id}</h1>
      <p>{location.title ?? 'No description available.'}</p>
      <button onClick={onClose} style={{
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: 'white',
        color: 'black',
        border: 'none',
        cursor: 'pointer'
      }}>
        Close
      </button>
    </div>
  );
};

export default FullScreenInfo;
