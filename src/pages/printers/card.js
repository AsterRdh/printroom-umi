import React from "react";
import '../App.css'
import { Amap, Marker } from '@amap/amap-react';
import {Row, Col, Typography, Button, Form, Select, Input} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import ajax from "../../api/ajax";
import { LeftCircleOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
import { history } from 'umi';
import BackButton from "../../components/BackButton";

export default class Card  extends React.Component {
  state = {
    data: {},
    updateMod:false
  };
  formRef = React.createRef();
  constructor(props){
    super(props);

  }

  async getData(){
    let id=this.props.location.query.id
    ajax("/api/printer/getOne",{id},'GET').then(
      (q)=>{
        this.setState({"data":q.obj})
        debugger
        if(this.formRef.current){
          this.formRef.current.setFieldsValue(q.obj)
        }
      }
    )
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };

  }

  componentDidMount() {
    this.getData().then()
  }

  cancel=()=>{
    this.setState({"updateMod":false})
    this.getData().then()
  }

  save=()=>{
    let a=this.formRef.current.getFieldsValue()
    a["pk_printer"]=this.state.data.pk_printer
    ajax("/api/printer/update",a,'POST')
    this.setState({"updateMod":false})
    this.getData().then()
  }


  renderToolBar(){
    if(this.state.updateMod){
      return (
        <div className={"card-tool-bar"}>
          <BackButton />
          <Button style={{backgroundColor: "#00000000", color: "#ffffff", border: 0}} onClick={this.save}>保存</Button>
          <Button style={{backgroundColor: "#00000000", color: "#ffffff", border: 0}} onClick={this.cancel}>取消</Button>
        </div>
      )
    }else {
      return(
        <div className={"card-tool-bar"}>
          <BackButton />
          <Button style={{backgroundColor: "#00000000", color: "#ffffff", border: 0}} onClick={()=>this.setState({"updateMod":true})}>修改</Button>
        </div>
      )
    }
  }

    render() {
        return(
          <div>
            {this.renderToolBar()}
            <div className={"mid-box"}>
              <Row>
                <Col flex="3" >
                  <div className={"card-form"} >
                  <Form
                    ref={this.formRef}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 19 }}
                    layout="horizontal"
                    initialValues={this.state.dataf}
                  >
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input size="large" bordered={false} style={{"color": "#ffffff",fontSize:24}} disabled={!this.state.updateMod}/>

                    </Form.Item>
                    <Form.Item
                      name="state"
                      colon={false}
                      label={<div className={"input-text"}>网点状态</div>}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select disabled={!this.state.updateMod}>
                        <Option value="-1">关闭站点</Option>
                        <Option value="0">正常</Option>
                        <Option value="1">异常</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="info"
                      colon={false}
                      label={<div className={"input-text"}>网点详情</div>}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TextArea rows={4}  bordered={true}style={{"color": "#ffffff",backgroundColor:"#2b2b2b",borderColor:"#434343"}} disabled={!this.state.updateMod}/>

                    </Form.Item>
                    <Form.Item
                      name="error_info"
                      colon={false}
                      label={<div className={"input-text"}>网点报错信息</div>}
                    >
                      <TextArea rows={4}  bordered={true}style={{"color": "#ffffff",backgroundColor:"#2b2b2b",borderColor:"#434343"}} disabled={!this.state.updateMod}/>
                    </Form.Item>

                  </Form>
                  </div>
                </Col>
                <Col flex="2">
                  <div className={"map-box"}>
                    <Amap
                      mapStyle="amap://styles/whitesmoke"
                      zoom={15}
                      center={[this.state.data.x?this.state.data.x:0,this.state.data.y?this.state.data.y:0]}
                    >
                      <Marker
                        position={[this.state.data.x?this.state.data.x:0,this.state.data.y?this.state.data.y:0]}
                      />
                    </Amap>
                  </div>

                </Col>
              </Row>

            </div>
          </div>
        )
    }

}
