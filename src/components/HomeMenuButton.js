import React from "react";

import { history } from 'umi';


export default class HomeMenuButton  extends React.Component {

    state = {
        mouseOn: false,
        isActive:false
    };

    mouseIn=()=>{
        this.setState({mouseOn:true})
    }
    mouseOut=()=>{
        this.setState({mouseOn:false})
    }

    onClick=()=>{
      debugger
      history.push(this.props.tar)
    }

    getButtonState=()=>{
      let str=history.location.pathname
      if(str.indexOf(this.props.tar)!=-1) {
        return true
      } else {
        return this.state.mouseOn
      }
    }


  render() {

        return (
            <div className={this.getButtonState()?"slider-button-active":"slider-button"} onMouseOut={this.mouseOut} onMouseOver={this.mouseIn} onClick={this.onClick}>
                <img src={this.props.icon} className={"slider-icon"}/>
                <div>{this.props.text}</div>
            </div>
        )
    }
}
