import { PureComponent } from "react";
import { connect } from 'dva';
import {Divider} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getUserId, getUserName } from "../../utils/authority";
import BindDataQueryTable from '../BindDataQueryTable';
import { getItems } from '@/utils/masterData';
import QueryCommand from '@/components/QueryTable/QueryCommand';






@connect(({ uniComp }) => ({
    uniComp,
}))

class Configuration extends PureComponent {
    state = {
        selectedRow: {},
        modalVisible: false,
        columnSchemas: {},
        configList:{}
    }
    //render之前调用接口得到响应结果存在state的list中
    componentWillMount() {
        const statusList = getItems('common', 'status');// 状态
        const { dispatch } = this.props;
        const {configList} = this.state;
        const {envId,publicGatewayUrl,privateGatewayUrl,agentUrl,envName,
            status,fileServerUrl,ifSelected} = configList
        const columnSchemas = {
            tableName:'config',
            key: 'envId',
            name: 'envId',
            columnDetails: [
                { name: 'envId', title: 'envId', add: true },
                { name: 'publicGatewayUrl', title: 'publicGatewayUrl', add: true,  detailFlag:1},
                { name: 'privateGatewayUrl', title: 'privateGatewayUrl', add: true, },
                { name: 'agentUrl', title: 'agentUrl', add: true, },
                { name: 'envName', title: 'envName', add: true, query: true,},
                { name: 'status', title: 'status', add: true, enumData: statusList,query: true,},
                { name: 'fileServerUrl', title: 'fileServerUrl', add: true, },
                { name: 'ifSelected', title: 'ifSelected', add: true, },
            ]

        };

        this.setState({ columnSchemas });
        dispatch({
            type: 'uniComp/config',
            callback: (resp) => {
                console.log(resp.records, "resp");
                this.setState({ configList: resp.records });
            }
        });
        console.log("configList");


    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {

        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys });
    };


    handleModalVisible = (row, flag) => {
        this.setState({
            modalVisible: flag,
            selectedRow: row,

        });
    };

    handleAdd = (fields) => {
        console.log('上传成功', fields);
        this.handleModalVisible(null, false);
    };

    handleRef = (ref) => {
        this.child = ref
      }
    render() {
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,

        };

        const { configList, selectedRows, selectedRowKeys, modalVisible, selectedRow, columnSchemas } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderWrapper showBreadcrumb style={{ height: '50px' }}>
                <BindDataQueryTable
                columnSchemas={columnSchemas}
                onRef={this.handleRef}
                size='middle'
                onRow={(record) => {
                    return {
                      // onClick: (event) => {message.success("1")},       // 点击行
                      // onDoubleClick: (event) => {},
                      // onContextMenu: (event) => {},
                      onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
                      // onMouseLeave: (event) => {console.log(12)}
                    };
                  }}>
                   
                </BindDataQueryTable>
            </PageHeaderWrapper>
        )
    }
}
export default Configuration;

// <Card bordered={false}>
//                     <Table
//                         dataSource={configList}
//                         columns={columns}
//                         pagination={paginationProps}
//                         selectedRows={selectedRows}
//                         rowSelection={rowSelection} />;
//                         <CreateForm
//                         {...parentMethods}
//                         modalVisible={modalVisible}
//                         selectedRow={selectedRow}
//                         columnSchemas={columnSchemas}
//                     />
//                 </Card>