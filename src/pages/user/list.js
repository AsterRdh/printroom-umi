import React from "react";
import ajax from "../../api/ajax";
import {Link} from "umi";
import {Button, Space, Table, Tag} from "antd";
import appCss from "../App.css";

export default class UserList  extends React.Component {
  state = {
    data: {},
  };

  constructor(props){
    super(props);
    this.getData().then(r => r);

  }

  getButton(record){
    let a=record.key
    console.log("record")
    console.log(record)
    switch (record.ban) {
      case '0':
        return<Button type="link" onClick={(e)=>this.closs(a,e)}>封禁用户</Button>
      case '-1':
        return<Button type="link" onClick={(e)=>this.open(a,e)}>解禁用户</Button>
    }
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
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
        className:"appCss.table-row",
        render: (text,record,index) => <Link  to={"/index/printer/card?id="+record.key}>{text}</Link>,
      },
      {
        title: '用户组',
        key: 'role',
        dataIndex: 'role',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = 'geekblue';

              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),

      },
      {
        title: '用户状态',
        dataIndex: 'ban',
        key: 'ban',
        render: tag =>
          {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          let value=""
          switch (tag) {
          case '0':
            color = 'green'
            value='正常'
            break;
          case '-1':
            color = 'volcano'
            value='封禁'
            break;
          }
          return (
            <Tag color={color} key={tag}>
              {value}
            </Tag>
          );
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record,index) => (
          <Space size="middle" >
            <Link  to={"/index/printer/card?id="+record.key}>详情</Link>
            {this.getButton(record)}
          </Space>
        ),
      },
    ];

    return(
      <div className={appCss.App}>
        <Table columns={columns}
               rowKey={(record) => {
                 return (record.pkUser + Date.now()) //在这里加上一个时间戳就可以了
               }}
               dataSource={this.state.data.obj} />
      </div>
    )
  }
}
