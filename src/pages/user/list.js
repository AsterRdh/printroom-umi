import React from "react";
import ajax from "../../api/ajax";

export default class UserList  extends React.Component {
  state = {
    data: {},
  };

  constructor(props){
    super(props);
    this.getData().then(r => r);

  }

  async getData(){
    ajax("/api/user/getAll",{},'GET').then(
      (q)=>{
        console.log("data")
        console.log(q)
        this.setState({"data":q})
      }
    )
  }

  render() {
    return(
      <div>user list</div>
    )
  }
}
