import React from "react";

export default class Bill  extends React.Component {
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
