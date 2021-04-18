import React from 'react';
import ajax from '../../api/ajax';
import { Space, Table, Tag, Typography } from 'antd';
import { Link } from 'umi';
const { Text } = Typography;
import DatePicker from 'antd/es/date-picker';
import moment from 'moment';

export default class BillList extends React.Component {
  state = {
    data: {},
  };

  constructor(props) {
    super(props);
    this.getData().then((r) => r);
  }

  async getData() {
    ajax('/api/bills/getAll', {}, 'GET').then((q) => {
      console.log('data');
      console.log(q);
      this.setState({ data: q });
    });
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'code',
        key: 'code',
        className: 'appCss.table-row',
      },
      {
        title: '订单名称',
        dataIndex: 'name',
        key: 'name',
        className: 'appCss.table-row',
        render: (text, record, index) => (
          <Link to={'/index/bill/card?id=' + record.pkBill}>{text}</Link>
        ),
      },
      {
        title: '订单金额',
        dataIndex: 'amount',
        key: 'amount',
        className: 'appCss.table-row',
        render: (text, record, index) => <>{text} ￥</>,
      },
      {
        title: '下单日期',
        dataIndex: 'startDate',
        key: 'startDate',
        className: 'appCss.table-row',
        render: (text, record, index) => (
          <>{moment(text).format('yyyy-MM-DD')}</>
        ),
      },
      {
        title: '下单人',
        dataIndex: 'pkUser',
        key: 'pkUser',
        className: 'appCss.table-row',
      },
      {
        title: '下单网点',
        dataIndex: 'pkPrinter',
        key: 'pkPrinter',
        className: 'appCss.table-row',
      },

      {
        title: '订单状态',
        dataIndex: 'state',
        key: 'state',
        render: (tag) => {
          let color = 'green';
          let value = '';
          switch (tag) {
            case '0':
              color = 'gold';
              value = '待付款';
              break;
            case '-1':
              color = 'geekblue';
              value = '已关闭';
              break;
            case '1':
              color = 'green';
              value = '已完成';
              break;
            case '2':
              color = 'cyan';
              value = '排队中';
              break;
            case '3':
              color = 'blue';
              value = '打印中';
              break;
            case '4':
              color = 'lime';
              value = '待取件';
              break;
          }
          return (
            <Tag color={color} key={tag}>
              {value}
            </Tag>
          );
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <Space size="middle">
            <Link to={'/index/bill/card?id=' + record.pkBill}>详情</Link>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Table
          columns={columns}
          rowKey={(record) => {
            return record.pkBill + Date.now(); //在这里加上一个时间戳就可以了
          }}
          dataSource={this.state.data.obj}
          summary={(pageData) => {
            let totalMoney = 0;

            pageData.forEach(({ amount }) => {
              totalMoney += amount;
            });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell>合计</Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text type="danger">{totalMoney} ￥</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
    );
  }
}
