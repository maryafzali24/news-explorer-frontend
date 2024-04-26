import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="circle-preloader__container">
      <div className="circle-preloader"></div>
      <p className="circle-preloader__description">Searching for news...</p>
    </div>
  );
};

export default Preloader;
