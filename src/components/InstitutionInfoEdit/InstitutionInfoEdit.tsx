import React, { Fragment, useState } from "react";
import './InstitutionInfoEdit.less';
import globalStyle from '../../global.less'
import { Checkbox, DatePicker, Form, Input, Select, Space, Switch, Table, Tag } from "antd";
import { PlusCircleFilled, PlusSquareOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
interface RelateInsDataType {
  index: number,
  relation: string,
  ins: commonModels.InstitutionModel
}

interface InnerIns {
  id: string,
  name: string,
  owner: string,
}
export default function InstitutionInfoEdit() {
  const relationOptions = [
    {
      label: "关联党组织",
      value: "1"
    },
    {
      label: "合署办公",
      value: "2"
    }
  ]
  const relateInsTableColumn: ColumnsType<RelateInsDataType>= [
    {
      title: '机构关系',
      dataIndex: 'relation',
      width: '180px',
      key: 'relation',
      render: (_, {relation}) => <>
      <PlusSquareOutlined onClick={addRelateInsTableDatas} />
      <Select value={relation} style={{width: "116px", marginLeft: "16px"}} options={relationOptions} />
      </>
    },
    {
      title: '机构名称',
      dataIndex: 'insName',
      key: 'insName',
      render: (_, { ins }) => <Input value={ins.unitName}/>
    },
    {
      title: '机构状态',
      dataIndex: 'insStatus',
      key: 'insStatus',
      render: (_, { ins }) => (
        <> 
          {
            ins.unitStatus === "0" ?
            <Tag color={globalStyle.green0}>现行</Tag> 
            : 
            <Tag color={globalStyle.red0}>撤销</Tag>
          }
        </>
      )
    },
    {
      title: '操作',
      key:'action',
      render: (_, record) => (
        <Space size={"middle"}>
          <a onClick={() => deleteRelateInsTableDatas(record)}>删除</a>
        </Space>
      )
    }
  ]

  const innerInsTableColumn: ColumnsType<InnerIns> = [
    {
      title: '科室机构编号',
      dataIndex: 'id',
      width: '180px',
      key: 'id',
      render: (_, {id}) => <>
      <PlusSquareOutlined onClick={addInnerInsTableDatas} />
      <Input style={{width: "110px", marginLeft: "16px"}} value={id} disabled />
      </>
    },
    {
      title: '科室名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => <Input value={name}/>
    },
    {
      title: '科室负责人',
      dataIndex: 'owner',
      key: 'owner',
      render: (_, { owner }) => (
        <> 
          {
            owner === "0" ?
            <Tag color={globalStyle.green0}>现行</Tag> 
            : 
            <Tag color={globalStyle.red0}>撤销</Tag>
          }
        </>
      )
    },
    {
      title: '操作',
      key:'action',
      render: (_, record) => (
        <Space size={"middle"}>
          <a onClick={() => deleteInnerInsTableDatas(record)}>删除</a>
        </Space>
      )
    }
  ]
  const [relateInsTableDatas, setRelateInsTableDatas] = useState([
    {
      index: 0,
      relation: "1",
      ins: {
        unitName: "东南大学",
        unitStatus: "0"
      }
    }
  ])
  const [innerInsTableDatas, setInnerInsTableDatas] = useState([
    {
      id: "1111",
      name: "业务课",
      owner: "费庆国"
    }
  ])
  const [parentUnitOptions, setParentUnitOptions] = useState([])
  const [unitTypeOptions, setUnitTypeOptions] = useState([
    { label: '党群组织', value: '1' },
    { label: '行政机构', value: '2' },
    { label: '院系', value: '3' },
    { label: '附属单位', value: '4' },
    { label: '直属单位', value: '5' },
    { label: '其他', value: '6' },
  ])
  function addRelateInsTableDatas() {
    setRelateInsTableDatas([...relateInsTableDatas, {index: relateInsTableDatas.length, relation: "", ins: {unitName: "", unitStatus: ""}}])
  }
  function deleteRelateInsTableDatas(record: RelateInsDataType) {
    setRelateInsTableDatas(
      relateInsTableDatas.filter(item => item.index !== record.index)
    )
  }
  function addInnerInsTableDatas() {
    setInnerInsTableDatas([...innerInsTableDatas, {id: "", name: "", owner: ""}])
  }
  function deleteInnerInsTableDatas(record: InnerIns) {
    setInnerInsTableDatas(
      innerInsTableDatas.filter(item => item.id !== record.id)
    )
  }
  return (
    <div className="info-edit-page">
      <p className="title">机构基础信息</p>
      <Form>
        <Form.Item
        label="机构代码"
        name="unitCode"
        rules={[{ required: true}]}>
          <Input showCount maxLength={30}
          placeholder="请输入机构代码"/>
        </Form.Item>
        <Form.Item
        label="机构名称"
        name="unitName"
        rules={[{ required: true}]}>
          <Input showCount maxLength={30}
          placeholder="请输入机构名称"/>
        </Form.Item>
        <Form.Item
        label="机构简称"
        name="unitNameShort">
          <Input showCount maxLength={30}
          placeholder="请输入机构简称"/>
        </Form.Item>
        <Form.Item
        label="机构英文"
        name="unitNameEnglish"> 
          <Input showCount maxLength={30}
          placeholder="请输入机构英文"/>
        </Form.Item>
        <Form.Item
        label="机构状态"
        name="unitStatus">
          <Switch checkedChildren="现行" unCheckedChildren="停用" defaultChecked/>
        </Form.Item>
        <Form.Item
        label="成立日期"
        name="foundDate">
          <DatePicker />
          <span style={{marginLeft: '24px'}}>成立发文：</span>
          <PlusCircleFilled />
        </Form.Item>
        <Form.Item
        label="撤销日期"
        name="foundDate">
          <DatePicker />
          <span style={{marginLeft: '24px'}}>撤销发文：</span>
          <PlusCircleFilled />
        </Form.Item>
        <Form.Item
        label="机构网址"
        name="unitWebSite">
          <Input showCount maxLength={100}/>
        </Form.Item>
        <Form.Item
        label="上级机构"
        name="parentNode"
        rules={[{required: true}]}>
          <Select
          mode="multiple"
          options={parentUnitOptions}
          ></Select>
        </Form.Item>
        <Form.Item
        label="机构类别"
        name="unitType"
        rules={[{required: true}]}>
          <Checkbox.Group options={unitTypeOptions} />
        </Form.Item>
      </Form>

      <p className="title">关联机构</p>
      <Table columns={relateInsTableColumn} dataSource={relateInsTableDatas} pagination={false} bordered></Table>

      <p className="title">机构职责</p>
      <div>
        <Input.TextArea rows={6} />
      </div>

      <p className="title">内设科室</p>
      <Table columns={innerInsTableColumn} dataSource={innerInsTableDatas} pagination={false} bordered></Table>
    </div>
  )
}