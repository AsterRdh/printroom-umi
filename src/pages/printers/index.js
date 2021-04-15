import React from "react";

export default class PrinterList  extends React.Component {
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
