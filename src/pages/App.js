import './App.css';
import 'antd/dist/antd.css';
import { Row, Col, Divider, Button, Input, Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import imageLogo from '../img/logo.png';
import ajax from '../api/ajax';
import cookie from 'react-cookies';

import { config as AmapReactConfig } from '@amap/amap-react';
AmapReactConfig.version = '2.0';
AmapReactConfig.key = '556a2aa6fb38d97a2a33789a4896df90';
AmapReactConfig.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
import { history } from 'umi';

class LoginPage extends React.Component {
  async getFormValue(values) {
    const result = await ajax(
      '/api/login/p?username=' +
        values.username +
        '&password=' +
        values.password,
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
      'POST',
    ).then();
    if (result.status == 'success') {
      debugger;
      cookie.save('JSESSIONID', result.msg.JSESSIONID);
      cookie.save('userName', result.msg.userName);
      cookie.save('userId', result.msg.userId);
      cookie.save('userRule', result.msg.userRule);
      history.push('/index');
    } else {
    }
  }

  render() {
    return (
      <div className="App">
        <Row className="App-header">
          <Col flex="auto">
            <div style={{ height: 500, padding: 50 }}>
              <img src={imageLogo} style={{ height: 200 }} />
              <h1 style={{ color: '#ffffff' }}>无人打印室</h1>
            </div>
          </Col>
          <Col flex="450px" className="Login-box">
            <div style={{ marginBottom: 50, textAlign: 'left' }}>登录</div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.getFormValue}
              action="http://localhost:8080/PrintRoom/login/p"
              method="post"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default LoginPage;
