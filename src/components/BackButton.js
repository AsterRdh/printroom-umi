import React from "react";

import { history } from 'umi';
import {Button} from "antd";

export default class BackButton  extends React.Component {



  render() {
    return (
        <Button style={{backgroundColor:"#00000000",color:"#ffffff",border:0,fontSize:18}} onClick={history.goBack}>返回</Button>
    )
  }
}
