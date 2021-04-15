import React from "react";
import ajax from "../../api/ajax";
import appCss from "../App.css";
import {Space, Table, Tag} from "antd";
import {Link} from "umi";

export default class AdList  extends React.Component {

  state = {
    data: {},
  };

  constructor(props){
    super(props);
    this.getData().then(r => r);

  }

  async getData(){
    ajax("/api/ad/getAll",{},'GET').then(
      (q)=>{
        this.setState({"data":q})
      }
    )
  }

  render() {
    const columns = [
      {
        title: '广告名称',
        dataIndex: 'name',
        key: 'name',
        className:"appCss.table-row",
        render: (text,record,index) => <Link  to={"/index/ad/card?id="+record.key}><img src={record.src} style={{width:100,marginRight:3}}/>{text}</Link>,
      },
      {
        title: '开始时间',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        key: 'endDate',
      },
      {
        title: '广告状态',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              switch (tag) {
                case '异常':
                  color = 'volcano'
                  break;
                case '正常':
                  color = 'green'
                  break;
                case '关闭':
                  color = 'geekblue'
                  break;
              }
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
        title: '操作',
        key: 'action',
        render: (text, record,index) => (
          <Space size="middle" >
            <Link  to={"/index/ad/card?id="+record.key}>详情</Link>
            <Link  to={"/index/ad/card?id="+record.key}>删除</Link>
          </Space>
        ),
      },
    ];

    return(
      <div className={appCss.App}>
        <Table columns={columns}  dataSource={this.state.data.obj} />
      </div>
    )
  }
}
