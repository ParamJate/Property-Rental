import "../styles/Slide.scss"
import video from "../landingvideo.mp4" 


const Slide = () => {
  return (
    <>
    <div className="slide">
      <h1>
        Welcome Home! Anywhere you roam <br /> Stay in the moment. Make your
        memories
      </h1>
      <video autoPlay loop muted >
            <source src={video} type="video/mp4" />
      </video>
    </div>
    </>
  );
};

export default Slide;
