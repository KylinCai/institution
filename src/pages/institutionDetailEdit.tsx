import { ArrowLeftOutlined, HistoryOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Breadcrumb, Steps, Timeline } from "antd";
import { useState } from "react";
import { history, useParams } from "umi";
import './institutionDetailEdit.less'
import globalStyle from '../global.less'
import InstitutionInfoEdit from "@/components/InstitutionInfoEdit/InstitutionInfoEdit";

export default function Page() {
  const stepItems: any[] = [
    {
      color: globalStyle.green0,
      children: "机构基础信息"
    },
    {
      color: globalStyle.grayEE,
      children: "机构类别"
    },
    {
      color: globalStyle.grayEE,
      children: "关联机构"
    },
    {
      color: globalStyle.grayEE,
      children: "机构任职人员"
    },
    {
      color: globalStyle.grayEE,
      children: "机构职责"
    },
    {
      color: globalStyle.grayEE,
      children: "人员编制"
    },
    {
      color: globalStyle.grayEE,
      children: "内设科室"
    },
    {
      color: globalStyle.grayEE,
      children: "关联会议信息"
    }
  ]
  const params = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([{title: params.type}, {title: params.name === "null" ? "未命名机构" : params.name},])
  
  function returnToEdit() {
    history.push({pathname: '/edit'})
  }
  function save() {
    // TODO: 保存新建的机构
  }
  function viewHistory() {
    // TODO: 查看历史记录
  }
  return (
    <div className="detail-edit-page">
      <div className="edit-title">
          <Button className="return" onClick={returnToEdit}><ArrowLeftOutlined />返回</Button>
          <span className="text">该机构被添加在：</span>
          <Breadcrumb className="breadcrumb" items={breadcrumbItems}></Breadcrumb>
          <Button className='save-button' onClick={save}><SaveOutlined />保存</Button>
          <Button className='history-button' onClick={viewHistory}><HistoryOutlined /></Button>
        </div>
        <div className="info-edit">
          <div>
            <InstitutionInfoEdit />
          </div>
          <div className="step">
            <Timeline
            items={stepItems}/>
          </div>
        </div>
    </div>
  )
}