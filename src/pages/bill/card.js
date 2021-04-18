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
  Divider,
  DatePicker,
  Upload,
} from 'antd';
import BackButton from '../../components/BackButton';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
const { RangePicker } = DatePicker;

export default class BillCard extends React.Component {
  state = {
    data: {},
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);
  }

  async getData() {
    let id = this.props.location.query.id;
    ajax('/api/bills/getOne', { id }, 'GET').then((q) => {
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
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 19 }}
            layout="horizontal"
            initialValues={this.state.dataf}
          >
            <Form.Item>
              <Input.Group compact>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    bordered={false}
                    style={{ color: '#ffffff', fontSize: 24 }}
                    disabled={!this.state.updateMod}
                  />
                </Form.Item>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  style={{ verticalAlign: 'bottom' }}
                >
                  <Input
                    size="large"
                    bordered={false}
                    style={{ color: '#ffffff', fontSize: 18, flex: 0 }}
                    disabled={!this.state.updateMod}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item
              name="state"
              colon={false}
              label={<div className={'input-text'}>广告状态</div>}
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
              label={<div className={'input-text'}>供应商</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                bordered={true}
                style={{
                  color: '#ffffff',
                  backgroundColor: '#2b2b2b',
                  borderColor: '#434343',
                }}
                disabled={!this.state.updateMod}
              />
            </Form.Item>

            <Form.Item
              name="dateRange"
              colon={false}
              label={<div className={'input-text'}>有效时间</div>}
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: 'Please select time!',
                },
              ]}
            >
              <RangePicker />
            </Form.Item>
            <Divider orientation="left" plain>
              审核信息
            </Divider>
            <Form.Item
              name="charge"
              colon={false}
              label={<div className={'input-text'}>负责人</div>}
              rules={[{}]}
            >
              <Input
                bordered={true}
                style={{
                  color: '#ffffff',
                  backgroundColor: '#2b2b2b',
                  borderColor: '#434343',
                }}
                disabled={!this.state.updateMod}
              />
            </Form.Item>

            <Form.Item
              name="approver"
              colon={false}
              label={<div className={'input-text'}>审批人</div>}
              rules={[{}]}
            >
              <Input
                bordered={true}
                style={{
                  color: '#ffffff',
                  backgroundColor: '#2b2b2b',
                  borderColor: '#434343',
                }}
                disabled={!this.state.updateMod}
              />
            </Form.Item>

            <Form.Item
              name="approvalTime"
              colon={false}
              label={<div className={'input-text'}>审批时间</div>}
              rules={[{}]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
