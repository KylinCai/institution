import { BarsOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useState } from "react";

export default function Page(props) {
    const { open, getStatus } = props
    const [typeName, setTypeName] = useState("")
    function handleComfirm() {
        // TODO: 新增类别接口
        getStatus(false)
    }
    function handleCancel() {
        getStatus(false)
    }
    return (
        <Modal
        title={<div><BarsOutlined />创建新类别</div>}
        open={open}
        okText="放弃修改"
        cancelText="创建"
        onOk={handleComfirm}
        onCancel={handleCancel}>
            <Form>
                <Form.Item
                label="类别名称"
                name="typeName">
                    <Input value={typeName} onChange={setTypeName} />
                </Form.Item>
            </Form>
        </Modal>
    )
}