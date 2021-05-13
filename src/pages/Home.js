import './App.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button, Typography } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import imageLogo from '../img/logo_s.png';
import icon_Ad from '../img/icon_ad.png';
import icon_Bill from '../img/icon_bill.png';
import icon_Printer from '../img/icon_printer.png';
import icon_User from '../img/icon_user.png';
const { Text, Link } = Typography;
import PrinterList from './printers/list';
import ajax from '../api/ajax';

import HomeMenuButton from '../components/HomeMenuButton';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './welcome';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends React.Component {
  state = {
    collapsed: false,
    page: 0,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  printerClick = () => {
    this.setState({ page: 1 });
  };

  componentDidMount() {}
  getUserName = () => {
    let a = Cookies.get('userName');
  };

  render() {
    const { collapsed } = this.state;
    debugger;
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#1f1f1f' }}>
        <Sider
          collapsible={false}
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          collapsedWidth={100}
          style={{ backgroundColor: '#1f1f1f' }}
        >
          <div className="logo-box" onClick={this.onClictR}>
            <img src={imageLogo} style={{ height: 100 }} />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            style={{ backgroundColor: '#1f1f1f' }}
          >
            <HomeMenuButton
              icon={icon_Printer}
              text={'站点管理'}
              tar={'/index/printer'}
            />
            <HomeMenuButton
              icon={icon_Ad}
              text={'广告管理'}
              tar={'/index/ad'}
            />
            <HomeMenuButton
              icon={icon_User}
              text={'用户管理'}
              tar={'/index/user'}
            />
            <HomeMenuButton
              icon={icon_Bill}
              text={'订单管理'}
              tar={'/index/bill'}
            />
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ backgroundColor: '#000000' }}>
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: '#141414',
              color: '#ffffff',
              height: 115,
            }}
          >
            <div className={'userMiniDiv'}>
              <Text>欢迎 {Cookies.get('userName')}</Text>
            </div>
            <h1
              style={{
                color: '#ffffff',
                fontSize: 36,
                marginTop: 15,
                marginLeft: 20,
              }}
            >
              无人打印室
            </h1>
          </Header>
          <Content style={{ color: '#ffffff' }}>
            <div
              style={{
                color: '#ffffff',
                backgroundColor: '#3c3f41',
                fontSize: 14,
              }}
            >
              <Breadcrumb></Breadcrumb>
            </div>
            <div style={{ padding: 24, minHeight: 360, color: '#ffffff' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              backgroundColor: '#1f1f1f',
              color: '#ffffff',
            }}
          >
            Self-service Printing room ©2021 Created by Aster
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
