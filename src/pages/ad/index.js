import React from "react";

export default class ad  extends React.Component {
  render() {
    return(
      <div>
        {
          this.props.children
        }
      </div>

    )
  }
}
