import React, { PureComponent } from 'react';
import styles from './Index.less';
import moment from 'moment';

import { ChartCard, MiniBar, WaterWave,MiniProgress,Bar,TimelineChart,Pie,yuan,MiniArea,TagCloud,Gauge  } from '../../../components/Charts';
// import ReactEcharts from 'echarts';
import ReactEcharts from "echarts-for-react";
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Avatar,
  Button,
  Divider,
  Badge,
} from 'antd';
import numeral from "numeral";
import Trend from '../../../components/Trend';

const TabPane = Tabs.TabPane;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const operations = (
<span>
  <Button className={styles.chart_ex_button}>今日</Button>
  <Button className={styles.chart_ex_button}>本周</Button>
  <Button className={styles.chart_ex_button}>本月</Button>
  <Button className={styles.chart_ex_button}>全年</Button>
  <RangePicker onChange={onChange}/>
</span>
);

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default class Index extends PureComponent {
  constructor() {
    super();
    this.state={
      tx_amount:"9,999.00",
      tx_count:"2001800",
      tx_srate:78,
      amount_chart_dt:[
        {
          mounth:"1",
          amount:55000,
        },
        {
          mounth:"2",
          amount:11000,
        },
        {
          mounth:"3",
          amount:30000,
        },
        {
          mounth:"4",
          amount:50000,
        },
        {
          mounth:"5",
          amount:66000,
        },
        {
          mounth:"6",
          amount:20000,
        },
        {
          mounth:"7",
          amount:15000,
        },
        {
          mounth:"8",
          amount:30000,
        },
        {
          mounth:"9",
          amount:36879,
        },
        {
          mounth:"10",
          amount:45600,
        },
        {
          mounth:"11",
          amount:30000,
        },
        {
          mounth:"12",
          amount:30000,
        },
      ],
      txcount_chart_dt:[
        {
          mounth:"1",
          amount:55000,
        },
        {
          mounth:"2",
          amount:11000,
        },
        {
          mounth:"3",
          amount:30000,
        },
        {
          mounth:"4",
          amount:50000,
        },
        {
          mounth:"5",
          amount:66000,
        },
        {
          mounth:"6",
          amount:20000,
        },
        {
          mounth:"7",
          amount:15000,
        },
        {
          mounth:"8",
          amount:30000,
        },
        {
          mounth:"9",
          amount:36879,
        },
        {
          mounth:"10",
          amount:45600,
        },
        {
          mounth:"11",
          amount:30000,
        },
        {
          mounth:"12",
          amount:30000,
        },
      ],
      compare_chart_dt:[
        {
          date:"2018-07-24 18:00:00",
          data1:10,
          data2:50,
        },
        {
          date:"2018-07-24 20:00:00",
          data1:30,
          data2:25,
        },
        {
          date:"2018-07-24 21:00:00",
          data1:35,
          data2:100,
        },
        {
          date:"2018-07-24 22:00:00",
          data1:20,
          data2:25,
        },
        {
          date:"2018-07-24 23:00:00",
          data1:300,
          data2:125,
        },
      ],

      amount_rank_chart_dt:[],
      txcount_rank_chart_dt:[],
      tx_channel_dt:[
        {
          x: '线上',
          y: 119980.00,
        },
        {
          x: '线下',
          y: 17000.00,
        },
      ],

      dev1_dt:[
        {
          date:"2018-07-10",
          data:20,
        },
        {
          date:"2018-07-11",
          data:10,
        },
        {
          date:"2018-07-12",
          data:1,
        },
        {
          date:"2018-07-13",
          data:50,
        },
        {
          date:"2018-07-14",
          data:13,
        },
      ],
      dev2_dt:[
        {
          date:"2018-07-23",
          data:20,
        },
        {
          date:"2018-07-24",
          data:30,
        },
      ],
      dev_all_dt:[],
      rank_list:[
        {
          rank:"1",
          type:"自助终端",
          devid:"A0001",
          txcount:"18990",
          amount:"199,899.00",
        },
        {
          rank:"2",
          type:"自助终端",
          devid:"17820",
          txcount:"999",
          amount:"99,899.00",
        },
        {
          rank:"3",
          type:"自助终端",
          devid:"A0001",
          txcount:"12000",
          amount:"9,899.00",
        },{
          rank:"4",
          type:"自助终端",
          devid:"A0001",
          txcount:"10020",
          amount:"9,299.00",
        },{
          rank:"5",
          type:"自助终端",
          devid:"A0001",
          txcount:"9980",
          amount:"9,001.00",
        },
      ],

      //页面内部state
      _amount_chart_dt:[],
      _txcount_chart_dt:[],
      _compare_chart_dt:[],
      _dev1_dt:[],
      _dev2_dt:[],
      _dev_all_dt:[],



    }
  }
  componentWillMount() {
    //数据组织
    if(this.state.amount_chart_dt!=undefined && this.state.amount_chart_dt!=null){
      let tempdt=[];
      let dt=this.state.amount_chart_dt;
      for (let i = 0; i < dt.length; i++) {
        tempdt.push({
          x: `${dt[i].mounth}月`,
          y: dt[i].amount,
        });
      }
      this.setState({_amount_chart_dt:tempdt});
    }

    //数据组织
    if(this.state.txcount_chart_dt!=undefined && this.state.txcount_chart_dt!=null){
      let tempdt=[];
      let dt=this.state.txcount_chart_dt;
      for (let i = 0; i < dt.length; i++) {
        tempdt.push({
          x: `${dt[i].mounth}月`,
          y: dt[i].amount,
        });
      }
      this.setState({_txcount_chart_dt:tempdt});
    }

    //数据组织
    if(this.state.compare_chart_dt!=undefined && this.state.compare_chart_dt!=null) {
      let tempdt = [];
      let dt=this.state.compare_chart_dt;
      for (let i = 0; i < dt.length; i++) {
        tempdt.push({
          x: this.getDateFormat(dt[i].date),
          // x: (new Date().getTime()) + (1000 * 60 * 30 * i),
          y1: dt[i].data1,
          y2: dt[i].data2,
        });
      }
      this.setState({_compare_chart_dt:tempdt});
    }

    //数据组织
    if(this.state.dev1_dt!=undefined && this.state.dev1_dt!=null) {
      let tempdt = [];
      let dt=this.state.dev1_dt;
      for (let i = 0; i < dt.length; i++) {
        tempdt.push({
          x: moment(dt[i].date).format('YYYY-MM-DD'),
          y: dt[i].data,
        });
      }
      this.setState({_dev1_dt:tempdt});
    }

    //数据组织
    if(this.state.dev2_dt!=undefined && this.state.dev2_dt!=null) {
      let tempdt = [];
      let dt=this.state.dev2_dt;
      for (let i = 0; i < dt.length; i++) {
        tempdt.push({
          x: moment(dt[i].date).format('YYYY-MM-DD'),
          y: dt[i].data,
        });
      }

      this.setState({_dev2_dt:tempdt});
    }
  }

  getDateFormat(str) {
    str = str.replace("/-/g", "/");
//// str =  str.replace("T"," ");
    let dt = new Date(str);
    return dt;
  }

  componentDidMount() {
    let cardHeads=document.getElementsByClassName("ant-card-head");
    for(let i=0;i<cardHeads.length;i++){
      cardHeads[i].style.backgroundColor="#494a4c";
    }

    let cardHeadsTitle=document.getElementsByClassName("ant-card-head-title");
    for(let i=0;i<cardHeadsTitle.length;i++){
      cardHeadsTitle[i].style.color="#fff";
    }

  }

  render() {
    let data = [{
      fixed: true,
      x:250,//myChart.getWidth() / 2,
      y:250,//myChart.getWidth() / 2,
      symbolSize: 50,
      // id: '-1',
      name:'服务器',
      color:'#00ddff',
      itemStyle: {
        color: '#12dd00',
        shadowBlur: 10,
        shadowColor: '#333',
      },

    },{
      // id:'0',
      symbolSize: 60,
      name:'设备ABM001',
      itemStyle: {
        color: '#00ddff',
      },

    },{
      // id:'1',
      symbolSize: 60,
      name:'设备ABM002',
      itemStyle: {
        color: '#00ddff',
        shadowBlur: 10,
        shadowColor: '#333',
      },
    },{
      // id:'2',
      symbolSize: 60,
      name:'设备ABM003',
      itemStyle: {
        color: '#00ddff',
      },
    },{
      // id:'3',
      symbolSize: 60,
      name:'设备ABM004',
      itemStyle: {
        color: '#00ddff',
      },
    },{
      // id:'4',
      symbolSize: 60,
      name:'设备ABM005',
      itemStyle: {
        color: '#00ddff',
      },
    },{
      // id:'5',
      symbolSize: 60,
      name:'设备ABM006',
      itemStyle: {
        color: '#00ddff',
      },
    },
    ];

    const dt={
      tooltip:{
        formatter:function(obj,fc){
          if(obj.dataType=="node"){
            // return obj.name;
            return `<span style="background-color: #2f54eb">${obj.name}</span>`;
          }
          console.log(obj);
        },
      },
      series: [{

        type: 'graph',
        layout: 'force',
        animation: true,
        roam: true,
        data: data,
        force: {
          repulsion:[0, 500],
          edgeLength: [0, 200],
          layoutAnimation:false,
          //initLayout:'circle',
          gravity:0,
        },
        // edges: [

        //     ],
        links: [{
          source: '服务器',
          target: '设备ABM001',
        },
          {
            source: '服务器',
            target: '设备ABM002',
          },
          {
            source: '服务器',
            target: '设备ABM003',
          },
          {
            source: '服务器',
            target: '设备ABM004',
          },
          {
            source: '服务器',
            target: '设备ABM005',
          },
        ],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20,
            },
          },
        },
        markArea:{
          animation:true,
          silent:false,
          label:{
            show:true,
          },
        },
        markPoint:{
          symbol: 'arrow',
        },
        markLine:{
          symbol: 'arrow',
          precision:50,
        },
        lineStyle: {
          normal: {
            opacity: 1.0,
            width: 2,
            curveness: 0.1,
            color:"#00ddff",
          },
        },

        label: {
          normal: {
            show:true,
            formatter:  function( data ) {
              return '{gray|' + data.name + '}';
            },
            rich: {
              gray: {
                color: '#000000',
              },
              green: {
                color: 'green',
              },
            },
          },
        },
      }],
    };

    const columns = [{
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      render: text => <span>{text}</span>,
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '设备编号',
      dataIndex: 'devid',
      key: 'devid',
    }, {
      title: '交易量',
      dataIndex: 'txcount',
      key: 'txcount',
    }, {
      title: '交易金额',
      dataIndex: 'amount',
      key: 'amount',
    }];

    const tags = [];
    for (let i = 0; i < 50; i += 1) {
      tags.push({
        name: `交易类型-${i}`,
        value: Math.floor((Math.random() * 50)) + 20,
      });
    }

    return (
      //Main
      <div className={styles.gutter_example}>
        {/*头部Card*/}
        <Row gutter={16}>
          {/*Card:总金额*/}
          <Col span={8}>
            <Card title="总金额" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#ffb1b5"}}>
              <div className={styles.top_card}>
                <span>
                <img className={styles.top_card_icon} src="./src/assets/amount.png"/>
              </span>
                <span className={styles.top_card_txt}>
                {this.state.tx_amount}
              </span>
              </div>
              <Divider dashed />
              <div>
                <span className={styles.top_card_trend}><label>与上周比：</label><Trend flag="up">12%</Trend></span>
                <span className={styles.top_card_trend}><label>与上月比：</label><Trend flag="down" style={{ marginLeft: 8 }}>11%</Trend></span>
              </div>
            </Card>
          </Col>
          {/*Card:总交易量*/}
          <Col span={8}>
            <Card title="总交易量" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#dfe56d9e"}}>
              <div className={styles.top_card}>
                <span>
                <img className={styles.top_card_icon} src="./src/assets/count.png"/>
              </span>
                <span className={styles.top_card_txt}>
                {this.state.tx_count}
              </span>
              </div>
              <Divider dashed />
              <div>
                <span className={styles.top_card_trend}><label>与上周比：</label><Trend flag="up">12%</Trend></span>
                <span className={styles.top_card_trend}><label>与上月比：</label><Trend flag="down" style={{ marginLeft: 8 }}>11%</Trend></span>
              </div>
            </Card>
          </Col>
          {/*Card:对账成功率*/}
          <Col span={8}>
            <Card title="对账成功率" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#b5f8c67d"}}>
              <div className={styles.top_card}>
                <span>
                <img className={styles.top_card_icon} src="./src/assets/srate.png"/>
              </span>
                <span className={styles.top_card_txt}>
                {this.state.tx_srate}%
              </span>
              </div>
              <Divider dashed />
              <MiniProgress percent={this.state.tx_srate} strokeWidth={12} target={100} color={"#40a000"}/>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row gutter={24}>
          {/*Card:设备状态*/}
          <Col span={12}>
            <Card title="设备状态" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}
            //       extra={
            //   <div>
            //     <Badge count={5} style={{ backgroundColor: '#52c41a'}} className={styles.dev_ok_badge}>
            //       <span style={{"color":"#52c41a","marginRight":"10px"}}>正常设备</span>
            //     </Badge>
            //     <Badge count={0} showZero>
            //       <span style={{"color":"#ff055e","marginRight":"10px"}}>故障设备</span>
            //     </Badge>
            //   </div>
            // }
            >
              <ReactEcharts option={dt}/>
              {/*<Tabs type="card">*/}
                {/*<TabPane tab={<Badge count={5} style={{ backgroundColor: '#52c41a'}} className={styles.dev_ok_badge}>*/}
                  {/*<span style={{"color":"#52c41a","marginRight":"10px"}}>正常设备</span>*/}
                {/*</Badge>}*/}
                         {/*key="1">*/}
                  {/*<p>Content of Tab Pane 1</p>*/}
                  {/*<p>Content of Tab Pane 1</p>*/}
                  {/*<p>Content of Tab Pane 1</p>*/}
                {/*</TabPane>*/}
                {/*<TabPane tab={<Badge count={0} showZero>*/}
                  {/*<span style={{"color":"#ff055e","marginRight":"10px"}}>故障设备</span>*/}
                {/*</Badge>}*/}
                         {/*key="2">*/}
                  {/*<p>Content of Tab Pane 2</p>*/}
                  {/*<p>Content of Tab Pane 2</p>*/}
                  {/*<p>Content of Tab Pane 2</p>*/}
                {/*</TabPane>*/}
              {/*</Tabs>*/}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="设备高频数据" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}>
              <TagCloud
                data={tags}
                height={300}
              />
            </Card>
          </Col>
        </Row>
        <br/>
        {/*Card:服务器资源*/}
        <Row>
          <Card title="服务器资源" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}>
            <Row gutter={16}>
              <Col span={8}>
                <Gauge  height={160}
                        title="CPU"
                        percent={50}
                        color={"#fff400"}
                        bgColor={"#14282e"}
                />
              </Col>
              <Col span={8}>
                <Gauge  height={160}
                        title="内存"
                        percent={75}
                        color={"#ff055e"}
                        bgColor={"#14282e"}
                />
              </Col>
              <Col span={8}>
                <Gauge  height={160}
                        title="存储"
                        percent={25}
                        color={"#2db800"}
                        bgColor={"#14282e"}
                />
              </Col>
            </Row>
          </Card>
        </Row>
        <br/>
        <Row gutter={24}>
          <Col span={12}>
            <Card title="设备端排行" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}>
              <Row gutter={32}>
                <Col span={12}>
                  <MiniArea
                    line
                    color="#cceafe"
                    height={45}
                    data={this.state._dev1_dt}
                  />
                </Col>
                <Col span={12}>
                  <MiniArea
                    line
                    color="#cceafe"
                    height={45}
                    data={this.state._dev2_dt}
                  />
                </Col>
              </Row>
              <Table columns={columns} dataSource={this.state.rank_list} size="small"
                     pagination={{
                       style: { marginBottom: 0 },
                       pageSize: 5,
                     }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="交易渠道" bordered={true}  hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}
                  extra={<Button.Group size="small">
              <Button type="primary">
                全部渠道
              </Button>
              <Button type="primary">
                线上渠道
              </Button>
              <Button type="primary">
                线下渠道
              </Button>
            </Button.Group>}>
              <div style={{"position":"relative"}}>
                <Pie
                  hasLegend
                  title=""
                  subTitle=""
                  data={this.state.tx_channel_dt}
                  valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                  height={310}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row>
          <Card title="数据趋势" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}>
          <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
            <TabPane tab={<span><Icon type="pay-circle" />金额</span>} key="1">
              <Bar
                height={200}
                title="金额趋势"
                data={this.state._amount_chart_dt}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="area-chart" />交易额</span>} key="2">
              <Bar
                height={200}
                title="交易额趋势"
                data={this.state._txcount_chart_dt}
              />
            </TabPane>
          </Tabs>
          </Card>
        </Row>
        <br/>
        <Row>
          <Card title="数据对比" bordered={true} hoverable={true} bodyStyle={{"backgroundColor":"#e6f7ff"}}>
          <TimelineChart
            height={200}
            data={this.state._compare_chart_dt}
            titleMap={{ y1: '线上交易笔数', y2: '线下交易笔数' }}
          />
          </Card>
        </Row>
      </div>
    );
  }

  componentWillUnmount() {

  }
}
