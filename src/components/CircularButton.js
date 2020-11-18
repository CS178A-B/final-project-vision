import React from 'react';

class CircularButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  /*
   - Props is a JS Object that holds any "variables" that were passed into the component
   - Ex.  type, submit, change are the props and their associated values
     <Condition type={this.props.type} submit={this.handleSubmit} change={this.handleChange} />
     props = {
       type: value
       submit: fun,
       change: fn
     }

  */

  // helper functions here
  handleClick = () => {

  }

  render() {
    // destructure the props object
    //   propz = {
    //     text: "try vision for free",
    //     rounded: false,
    //   };
    // const x = propz.text;

  const { text, type } = this.props;
  // return is where you write your JSX

    // == vs ===
    return (
      <div>
        {type === "button" ? (
        <button>
          {text}
        </button>
        ) : (
          <input />
        )}
      </div>
    );
  }

  // ternary if's
  // if (x) do this else do that
  // x ? this : that

    

}

export default CircularButton;