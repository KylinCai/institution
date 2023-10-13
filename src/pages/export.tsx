import React, { useState } from 'react';
import  './export.less';
import { Checkbox, Form } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];


export default function Page() {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  
  return (
    <div>
      <Form>
        <Form.Item label="选择导出范围">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>全选</Checkbox>
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={onchange} />
        </Form.Item>
      </Form>
    </div>
  );
}
