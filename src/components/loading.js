import React from "react";
const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner" style={{display: "block", margin: "auto"}}>
        <img src={loadingImg} alt="Loading..." />
      </div>
    );
  }
}

export default Loading;