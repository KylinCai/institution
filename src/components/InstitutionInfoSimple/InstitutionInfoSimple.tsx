import React, { Fragment, useState } from "react";
import { Button, ConfigProvider, Divider, Modal, Input, Checkbox, AutoComplete } from "antd";
import { CheckCircleFilled, CloseCircleOutlined, ExclamationCircleTwoTone, MinusCircleFilled} from "@ant-design/icons"
import "./InstitutionInfoSimple.less";
import globalStyle from "../..//global.less";
import { history } from "umi";
import { ArrowRightOutlined, DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";

const blueTheme = {
    token: 
    {
      colorPrimary: globalStyle.blue0
    }
  }
const greenTheme = {
    token: 
    {
      colorPrimary: globalStyle.green0
    }
  }
const redTheme = {
    token: 
    {
      colorPrimary: globalStyle.red0
    }
  }
const yellowTheme = {
    token: 
    {
      colorPrimary: globalStyle.yellow0
    }
  }

export default function InstitutionInfoSimple({type, institutionInfoSimple} : {type: string, institutionInfoSimple: commonModels.InstitutionModel}) {
    const [cancelDialog, setCancelDialog] = useState(false)
    const [relateMeetingDialog, setRelateMeetingDialog] = useState(false)
    const [commitSuccessDialog, setCommitSuccessDialog] = useState(false)
    const [meetingList, setMeetingList] = useState([{id: Math.random(), name: "", decisive: false}])
    const [meetingOptions, setMeetingOptions] = useState<{ value: string}[]>([])
    const [remark, setRemark] = useState("")

    function goToDetail(item: commonModels.InstitutionModel) {
        history.push({pathname: "/viewDetails/" + item.parentNode + "/" + item.unitName})
    }

    function goToEditDetail(item: commonModels.InstitutionModel) {
        history.push({pathname: "/editDetails/" + item.parentNode + "/" + item.unitName})
    }
    function goToViewPage() {
        setCommitSuccessDialog(false)
        history.push({pathname: "/view/"})
    }
    function cancelIns(item: commonModels.InstitutionModel) {
         setCancelDialog(true)
    }
    function confirmCancel() {
        setCancelDialog(false)
        setRelateMeetingDialog(true)
    }
    function cancelCancel() {
        setCancelDialog(false)
    }
    function commit() {
        setCommitSuccessDialog(true)
        console.log(meetingList)
        console.log(remark)
    }
    function abandon() {
        setRelateMeetingDialog(false)
    }
    function changeDecisive(item: commonModels.MeetingInfo) {
        const newMeetingList = meetingList.map((meeting) => {
            if(meeting.id === item.id) {
                return {id: meeting.id, name: meeting.name, decisive: !meeting.decisive}
            } else {
                return meeting
            }
        })
        setMeetingList(newMeetingList)
    }
    function addMeeting() {
        setMeetingList([...meetingList, {id: Math.random(), name: "", decisive: false}])
    }
    function deleteMeeting(item: commonModels.MeetingInfo) {
        setMeetingList(meetingList.filter(meeting => meeting.id !== item.id))
    }
    function searchMeetingOptions(text: string) {
        // TODO：根据输入内容搜索会议列表
        setMeetingOptions([{value: text}])
    }
    function selectMeeting(text: string, item: commonModels.MeetingInfo) {
        const newMeetingList = meetingList.map((meeting) => {
            if(meeting.id === item.id) {
                return {id: meeting.id, name: text, decisive: meeting.decisive}
            } else {
                return meeting
            }
        })
        setMeetingList(newMeetingList)
    }
    function changeRemark(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRemark(event.target.value)
    }
    return (
        <Fragment>
        {institutionInfoSimple.unitName === null ?
        <div className={type === "view" ? "institution-in-simple" : "institution-in-simple-green"}>
            <div className="blank-hint">
                在左侧列表选择机构名称<br />
                可查看机构信息
            </div>
        </div>
        :
        <div className={type === "view" ? "institution-in-simple" : "institution-in-simple-green"}>
            <div className="institution-info-container">
                <div className="code">机构代码：{institutionInfoSimple.unitCode}</div>
                <div className="name">{institutionInfoSimple.unitName}</div>
                {
                    type === "view" ?
                    <Button type="primary" className="button" onClick={() => goToDetail(institutionInfoSimple)}>查看机构详情<ArrowRightOutlined /></Button>
                    :
                    <ConfigProvider theme={greenTheme}>
                        <Button type="primary" className="button" onClick={() => goToEditDetail(institutionInfoSimple)}>编辑机构详情<ArrowRightOutlined /></Button>
                    </ConfigProvider>
                }
                <div className="normal">机构状态：{institutionInfoSimple.unitStatus}</div>
                <div className="normal">机构简称：{institutionInfoSimple.unitNameShort}</div>
                <div className="normal">机构英文：{institutionInfoSimple.unitNameEnglish}</div>
                <Divider className="divider" />
                <div className="normal">机构成立日期：{institutionInfoSimple.foundDate}</div>
            </div>
            { 
                type === "view" ?
                <Fragment></Fragment>
                :
                <Button danger className="bottom-button" onClick={() => cancelIns(institutionInfoSimple)}><DeleteOutlined />撤销机构</Button>
            }
        </div>
        }
        <ConfigProvider theme={redTheme}> 
            <Modal open={cancelDialog}
            okText="撤销机构"
            cancelText="再想想"
            onOk={confirmCancel}
            onCancel={cancelCancel}
            >
                <ExclamationCircleTwoTone />
                <p>撤销该机构后，该机构将被收拢至“已撤销机构”列表</p>
                <p>将无法被访问</p>
            </Modal>
        </ConfigProvider>
        <ConfigProvider theme={yellowTheme}>
            <Modal
            width="864px"
            open={relateMeetingDialog}
            okText="提交"
            cancelText="放弃修改"
            onOk={commit}
            onCancel={abandon}>
                <ExclamationCircleTwoTone />
                <p style={{textAlign: "center"}}>本次修改需要提供相关依据</p>
                {
                    meetingList.map(item => (
                    <div key={item.id} style={{textAlign: "center"}}>
                        <span>关联会议</span>
                            <AutoComplete style={{margin: "16px", width: "362px"}}
                            placeholder="输入会议ID/会议名称"
                            options={meetingOptions}
                            onSelect={(text) => {selectMeeting(text, item)}}
                            onSearch={(text) => searchMeetingOptions(text)}
                            allowClear = {{ clearIcon: <CloseCircleOutlined></CloseCircleOutlined>}} />
                            <ConfigProvider theme={blueTheme}>
                                <Checkbox id={item.id.toString()} indeterminate={item.decisive} onChange={() => changeDecisive(item)}>决定性会议</Checkbox>
                            </ConfigProvider>
                            {
                                meetingList.length > 1 ? <MinusCircleFilled onClick={() => deleteMeeting(item)} /> : <Fragment></Fragment>
                            }
                    </div>
                    ))
                }
                <div style={{color: "green", textAlign:"center"}}>
                    <PlusCircleFilled onClick={addMeeting}/>
                    <Divider />
                    <Input.TextArea onChange={(event) => changeRemark(event)} style={{width: "544px"}} rows={4} placeholder="可以在此输入本次操作的相关备注信息"></Input.TextArea>
                </div>
                
            </Modal>
        </ConfigProvider>
        <ConfigProvider theme={greenTheme}>
            <Modal
            open={commitSuccessDialog}
            footer={[
                <div style={{textAlign:"center"}}><Button key="submit" type="primary" onClick={goToViewPage}>返回</Button></div>
            ]}>
                <div style={{textAlign:"center"}}>
                    <CheckCircleFilled style={{color: "green"}} />
                    <p>您本次修改的项目已保存成功</p>
                </div>
            </Modal>
        </ConfigProvider>
        </Fragment>
    )
}