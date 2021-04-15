import React from "react";
import ajax from "../../api/ajax";
import BackButton from "../../components/BackButton";
import {Button, Col, Form, Input, Row, Select ,Upload, message, DatePicker,Divider } from "antd";
import { InboxOutlined } from '@ant-design/icons';


const { Dragger } = Upload;
import {Amap, Marker} from "@amap/amap-react";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


export default class AdCard  extends React.Component {
  state = {
    data: {},
    updateMod:false,
    imageURL:""
  };
  formRef = React.createRef();
  constructor(props){
    super(props);
  }

  cancel=()=>{
    this.setState({"updateMod":false})
    this.getData().then()
  }

  async getData(){
    let id=this.props.location.query.id
    ajax("/api/ad/getOne",{id},'GET').then(
      (q)=>{
        console.log("q")
        console.log(q)
        q.obj.dateRange[0]= moment(q.obj.dateRange[0]);
        q.obj.dateRange[1]= moment(q.obj.dateRange[1]);
        console.log(q.obj.dateRange)
        this.setState({"data":q,imageURL:q.obj.src})
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

  dragger =(info)=> {
    const { status } = info.file;
    if (status !== 'uploading') {

    }
    if (status === 'done') {
      console.log(this.state.data)
      this.setState({imageURL:info.file.response.obj.path})
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

  };

  setImage = file => {
    console.log("file")
    console.log(file)

  };


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
                    label={<div className={"input-text"}>广告状态</div>}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select disabled={!this.state.updateMod}>
                      <Option value="-1">已关闭</Option>
                      <Option value="0">启用</Option>
                      <Option value="1">审批中</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="supplier"
                    colon={false}
                    label={<div className={"input-text"}>供应商</div>}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input bordered={true}style={{"color": "#ffffff",backgroundColor:"#2b2b2b",borderColor:"#434343"}} disabled={!this.state.updateMod}/>
                  </Form.Item>

                  <Form.Item
                    name="dateRange"
                    colon={false}
                    label={<div className={"input-text"}>有效时间</div>}
                    rules={[
                      {
                        type: 'array',
                        required: true,
                        message: 'Please select time!',
                      },
                    ]}
                  >
                    <RangePicker/>
                  </Form.Item>
                  <Divider orientation="left" plain>审核信息</Divider>
                  <Form.Item
                    name="charge"
                    colon={false}
                    label={<div className={"input-text"}>负责人</div>}
                    rules={[
                      {

                      },
                    ]}
                  >
                    <Input bordered={true}style={{"color": "#ffffff",backgroundColor:"#2b2b2b",borderColor:"#434343"}} disabled={!this.state.updateMod}/>
                  </Form.Item>

                  <Form.Item
                    name="approver"
                    colon={false}
                    label={<div className={"input-text"}>审批人</div>}
                    rules={[
                      {

                      },
                    ]}
                  >
                    <Input bordered={true}style={{"color": "#ffffff",backgroundColor:"#2b2b2b",borderColor:"#434343"}} disabled={!this.state.updateMod}/>
                  </Form.Item>

                  <Form.Item
                    name="approvalTime"
                    colon={false}
                    label={<div className={"input-text"}>审批时间</div>}
                    rules={[
                      {

                      },
                    ]}
                  >
                    <DatePicker/>
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col flex="2">
              <div className={"map-box"}>
                <Dragger
                  name={'file'}
                  multiple = {false}
                  action= 'http://127.0.0.1:8080/PrintRoom/api/file/upload'
                  onChange={this.dragger}
                  maxCount={1}
                  disabled={!this.state.updateMod}
                >
                  <div style={{backgroundImage:"url("+this.state.imageURL+")"}} className={"upload-image-box"}>
                    <div className={"upload-text-box"}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">点击或将图片拖拽到这里</p>
                      <p className="ant-upload-hint">
                        支持单次上传，图片大小小于 50MB
                      </p>
                    </div>
                  </div>
                </Dragger>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
