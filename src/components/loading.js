import React from "react";
const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner" style={{ width: "500px", height: "500px", top: "50%", left:"50%", marginTop:"-250px", marginLeft:"-250px", position: "absolute", margin: "0 auto"}}>
        <img src={loadingImg} alt="Loading..." />
      </div>
    );
  }
}

export default Loading;