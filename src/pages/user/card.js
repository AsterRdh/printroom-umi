import React from 'react';
import ajax from '../../api/ajax';
import {
  Typography,
  Form,
  Button,
  Input,
  Select,
  Slider,
  InputNumber,
  Switch,
  DatePicker,
} from 'antd';
import BackButton from '../../components/BackButton';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

export default class UserCard extends React.Component {
  state = {
    data: {},
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);
  }

  async getData() {
    let id = this.props.location.query.id;
    ajax('/api/user/userInfo', { id }, 'GET').then((q) => {
      console.log('data');
      console.log(q.obj);
      this.setState({ data: q.obj });
      if (this.formRef.current) {
        this.formRef.current.setFieldsValue(q.obj);
      }
    });
  }

  renderToolBar() {
    if (this.state.updateMod) {
      return (
        <div className={'card-tool-bar'}>
          <BackButton />
          <Button
            style={{
              backgroundColor: '#00000000',
              color: '#ffffff',
              border: 0,
            }}
            onClick={this.save}
          >
            保存
          </Button>
          <Button
            style={{
              backgroundColor: '#00000000',
              color: '#ffffff',
              border: 0,
            }}
            onClick={this.cancel}
          >
            取消
          </Button>
        </div>
      );
    } else {
      return (
        <div className={'card-tool-bar'}>
          <BackButton />
          <Button
            style={{
              backgroundColor: '#00000000',
              color: '#ffffff',
              border: 0,
            }}
            onClick={() => this.setState({ updateMod: true })}
          >
            修改
          </Button>
        </div>
      );
    }
  }

  componentDidMount() {
    this.getData().then();
  }

  render() {
    console.log('render');
    console.log(this.state.data);
    return (
      <div>
        {this.renderToolBar()}
        <div className={'mid-box'}>
          <Title>用户</Title>
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 19 }}
            layout="horizontal"
            initialValues={this.state.data}
          >
            <Form.Item
              label={<div className={'input-text'}>用户名</div>}
              name="userBase"
              colon={false}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Group compact>
                <Form.Item name="userName" noStyle>
                  <Input
                    bordered={true}
                    style={{
                      color: '#ffffff',
                      backgroundColor: '#2b2b2b',
                      borderColor: '#434343',
                      width: '39.5%',
                    }}
                    disabled={!this.state.updateMod}
                  />
                </Form.Item>

                <Form.Item name="userGroup" style={{ height: 50 }} noStyle>
                  <Select
                    size={'large'}
                    bordered={true}
                    style={{
                      color: '#ffffff',
                      backgroundColor: '#2b2b2b',
                      borderColor: '#434343',
                      width: '10%',
                      marginLeft: '0.5%',
                    }}
                    disabled={!this.state.updateMod}
                  >
                    <Option value="1">管理员</Option>
                    <Option value="2">广告商</Option>
                    <Option value="3">普通用户</Option>
                    <Option value="5">技术员</Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item
              label={<div className={'input-text'}>经验值</div>}
              name="userXP"
              colon={false}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                size={'large'}
                bordered={true}
                style={{
                  color: '#ffffff',
                  backgroundColor: '#2b2b2b',
                  borderColor: '#434343',
                  width: '50%',
                  marginRight: 5,
                }}
                disabled={!this.state.updateMod}
              />
            </Form.Item>

            <Form.Item
              label={<div className={'input-text'}>手机号</div>}
              name="userTel"
              colon={false}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Group compact>
                <Form.Item name="userTel1" style={{ height: 50 }} noStyle>
                  <Select
                    size={'large'}
                    bordered={true}
                    style={{
                      color: '#ffffff',
                      backgroundColor: '#2b2b2b',
                      borderColor: '#434343',
                      width: '10%',
                      marginRight: '0.5%',
                    }}
                    disabled={!this.state.updateMod}
                  >
                    <Option value="1">+86</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="userTel2" noStyle>
                  <Input
                    bordered={true}
                    style={{
                      color: '#ffffff',
                      backgroundColor: '#2b2b2b',
                      borderColor: '#434343',
                      width: '39.5%',
                    }}
                    disabled={!this.state.updateMod}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item
              name="openID"
              colon={false}
              label={<div className={'input-text'}>微信openId</div>}
            >
              <Input
                bordered={true}
                style={{
                  color: '#ffffff',
                  backgroundColor: '#2b2b2b',
                  borderColor: '#434343',
                  width: '50%',
                }}
                disabled={!this.state.updateMod}
              />
            </Form.Item>

            <Form.Item
              name="ban"
              colon={false}
              label={<div className={'input-text'}>是否封禁</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch disabled={!this.state.updateMod} />
            </Form.Item>

            <Form.Item
              name="banInfo"
              colon={false}
              label={<div className={'input-text'}>封禁理由</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea
                rows={4}
                bordered={true}
                style={{
                  color: '#ffffff',
                  backgroundColor: '#2b2b2b',
                  borderColor: '#434343',
                  width: '50%',
                }}
                disabled={!this.state.updateMod}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
