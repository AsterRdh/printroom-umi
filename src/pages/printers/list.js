import appCss from '../App.css';
import {request } from 'umi';
import React from "react";
import { Table, Tag, Space,Button } from 'antd';
import ajax from "../../api/ajax";
import { Link } from 'umi';
import { history } from 'umi';

export default class List  extends React.Component {

    state = {
      data: {},
    };

    constructor(props){
        super(props);
        this.getData().then(r => r);

    }

    async getData(){
        ajax("/api/printer/test",{},'GET').then(
            (q)=>{
                this.setState({"data":q})
            }
        )
    }

    closs=(id,e)=>{
      console.log(id)
      ajax("/api/printer/enable",{"state":"-1","id":id}).then(this.getData().then)

    }
    open=(id,e)=>{
      console.log(id)
      ajax("/api/printer/enable",{"state":"0","id":id}).then(this.getData().then)
    }

    getButton(record){
      let a=record.key
        switch (record.tags[0]) {
            case '异常':
                return<Button type="link" onClick={(e)=>this.closs(a,e)}>关闭站点</Button>
            case '正常':
                return<Button type="link" onClick={(e)=>this.closs(a,e)}>关闭站点</Button>
            case '关闭':
                return<Button type="link" onClick={(e)=>this.open(a,e)}>启用站点</Button>
        }
    }

    render() {
        const columns = [
            {
                title: '站点名称',
                dataIndex: 'name',
                key: 'name',
                className:"appCss.table-row",
                render: (text,record,index) => <Link  to={"/index/printer/card?id="+record.key}>{text}</Link>,
            },
            {
                title: '站点地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '站点状态',
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
                         return (record.key + Date.now()) //在这里加上一个时间戳就可以了
                        }}
                       dataSource={this.state.data.obj} />
            </div>
        )
    }

}
