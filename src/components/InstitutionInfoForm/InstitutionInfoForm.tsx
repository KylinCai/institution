import './InstitutionInfoForm.less';
import zhCN from 'antd/es/locale/zh_CN'; 
import { DoubleRightOutlined, StepBackwardOutlined, SyncOutlined, SmileOutlined } from '@ant-design/icons';
import { Typography, Table, Tag, Timeline, ConfigProvider, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import style from '../../global.less';
import { useState } from 'react';

const parentCode=11111
const parentName="东南大学"
const insResponsibility = "机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责 \
机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责 \
机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责 \
机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责机构职责"
const tableData = [
  {key: '11111', name: '胡歌', director: '负责人', status: '0'}, 
  {key: '12222', name: '胡歌', director: '负责人', status: '0'}, 
  {key: '13333', name: '胡歌', director: '负责人', status: '0'}]
const columns = [
  {title: '科室机构编号', dataIndex: 'key', key: 'key'}, 
  {title: '科室名称', dataIndex: 'name', key: 'name'}, 
  {title: '科室负责人', dataIndex: 'director', key: 'director', render: (text: string) => <a>{text}</a>},
  {title: '科室状态', dataIndex: 'status', key: 'status', render: (status: Number) => (<>{status === 0 ? <Tag color={style.green0}>现行</Tag> : <Tag color={style.green0}>现行</Tag>}</>)}]

const meetingInfo = {time: '2018-10-10', name: '会议名称', part: '第一期', isImportant: true}

const timeLineData = [
  {color: 'blue', 
  children: <p>
    <span className='top-code'>{meetingInfo.time}</span>
    <a className='tiny-block'>{meetingInfo.name} </a>
    <span className='tiny-block'>{meetingInfo.part} </span>
    {meetingInfo.isImportant ? <Tag className='tiny-block' color='blue'>决定性会议</Tag> : <></>}
    </p>,
  position: 'right'},
  {color: 'red', children: '我是内容', position: 'right'},
  {color: 'green', children: '我是内容', position: 'right'},
  {color: 'gray', children: '我是内容', position: 'right'}
]

const showTotal = (total: number) => `共计${total}条`

const paginationConfig = {position: ['bottomCenter'], size: 'small', showSizeChanger: true, showQuickJumper: true, total: 500, showTotal:{showTotal}}
let innerPageSize = 5
let currentPage = 1
function tableChange(page: number, pageSize: number) {
  innerPageSize = pageSize
  currentPage = page
}

export default function Page() {
  const [showRelatedIns, setShowRelatedIns] = useState(false)
  const openAffiliatedInstitution = () => {
    setShowRelatedIns(!showRelatedIns)
  }
  return (
    <div className='form-main'>
      <div className='form-top'>
        <p className='form-title'>关联机构</p>
        <div className='form-top-content'>
          <div className='top-left'>
            <p className='top-content-title'>上级机构</p>
            <p>
              <span className='top-code'>{parentCode}</span>
              <span className='top-content'>{parentName}</span>
            </p>
          </div>
          <hr className='top-divider'></hr>
          <div className='top-middle'>
            <p className='top-content-title'>挂靠机构</p>
            <p>
              <span className='top-code'>{parentCode}</span>
              <span className='top-content-clickable' onClick={openAffiliatedInstitution}>{parentName}</span>
            </p>
          </div>
          <hr className='top-divider'></hr>
          <div className='top-right'>
            <p className='top-content-title'>关联党组织</p>
            <p>
              <span className='top-code'>{parentCode}</span>
              <span className='top-content'>{parentName}</span>
            </p>
          </div>
        </div>
      </div>
      {
        showRelatedIns ? 
        <div className='form-table'>
        <ConfigProvider locale={zhCN}>
          <Table dataSource={tableData} columns={columns}></Table>
        </ConfigProvider>
      </div>
      :
      <></>
      }
      <div className='form-second'>
        <p className='form-title'>机构职责</p>
        <div className='form-second-content'>
          <Typography className='form-second-content-graph'>{insResponsibility}</Typography>
        </div>
      </div>
      <div className='form-table'>
        <p className='form-title'>内设科室</p>
        <Table dataSource={tableData.slice(innerPageSize*(currentPage-1),innerPageSize*currentPage)} columns={columns} pagination={false} bordered>
        </Table>
        <ConfigProvider locale={zhCN}>
          <Pagination size='small' current={currentPage} pageSize={innerPageSize} total={tableData.length+100} showTotal={showTotal} showSizeChanger showQuickJumper onChange={tableChange}></Pagination>
        </ConfigProvider>
      </div>
      <div className='form-table'>
        <p className='form-title'>人员编制</p>
        <ConfigProvider locale={zhCN}>
          <Table dataSource={tableData} columns={columns}></Table>
        </ConfigProvider>
      </div>
      <div className='form-bottom'>
        <p className='form-title'>关联会议信息</p>
        <Timeline className='form-timeline' items={timeLineData}></Timeline>
      </div>
    </div>
  );
}
