import "./LoadingButton.css";

const LoadingButton = ({ text = "Loading..." }) => {

  return (
    <div className="loading-button">

      <div className="spinner"></div>

      <span>{text}</span>

    </div>
  );

};

export default LoadingButton;