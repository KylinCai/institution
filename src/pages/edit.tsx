import React, { Fragment, useEffect, useState } from 'react';
import { history } from 'umi';
import './edit.less';
import globalStyle from '../global.less';
import { CloseOutlined, ExclamationCircleTwoTone, HistoryOutlined, MenuOutlined, PlusCircleFilled, RollbackOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Input, Modal, Table } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ColumnsType } from 'antd/es/table';
import http from '@/utils/http'
import InstitutionInfoSimple from '@/components/InstitutionInfoSimple/InstitutionInfoSimple';
import AddDialog from '@/components/InstitutionTypeAddDialog/AddDialog';

const greenTheme = {
  token: 
  {
    colorPrimary: globalStyle.green0
  }
}

const yellowTheme = {
  token: 
  {
    colorPrimary: globalStyle.yellow0
  }
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };
  
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  )
}

export default function Page() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'nodeName',
      dataIndex: 'nodeName'
    },
    {
      key: 'sort',
    }
  ]
  const [addTypeDialogOpen, setAddTypeDialogOpen] = useState(false)
  const [quitDialog, setQuitDialog] = useState(false)
  const [insTypeList, setInsTypeList] = useState([])
  const [insList, setInsList] = useState([])
  const [affiliatedInsList, setAffiliatedInsList] = useState([])
  const [selectedInsType, setSelectedInsType] = useState(null)
  const [selectedIns, setSelectedIns] = useState(null)
  const [institutionSimpleInfo, setInstitutionSimpleInfo] = useState({} as commonModels.InstitutionModel)

  useEffect(() => {
    const params = {
      includeCustomUnit: 0
    }
    http('post', '/ins/back/getTopLayoutList', params).then(res => {
      setInsTypeList(res.data)
    })
  }, []) 

  function quitClick() {
    setQuitDialog(true)
  }

  // 机构类别顺序调整
  const onInsTypeDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active)
    console.log(over)
    if (active.id !== over?.id) {
      setInsTypeList((previous) => {
        const activeIndex = previous.findIndex((i) => i.nodeCode === active.id);
        const overIndex = previous.findIndex((i) => i.nodeCode === over?.id);
        console.log(arrayMove(previous, activeIndex, overIndex))
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  // 机构列表顺序调整
  const onInsListDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setInsList((previous) => {
        const activeIndex = previous.findIndex((i) => i.nodeCode === active.id);
        const overIndex = previous.findIndex((i) => i.nodeCode === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  // 挂靠机构顺序调整
  const onAffiliatedInsListDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setAffiliatedInsList((previous) => {
        const activeIndex = previous.findIndex((i) => i.nodeCode === active.id);
        const overIndex = previous.findIndex((i) => i.nodeCode === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  // 机构类别点击
  function insTypeClick(row) {
    const params = {
      parentNodeCode: row.nodeCode
    }
    setSelectedInsType(row.nodeName)
    setSelectedIns(null)
    http('post', '/ins/back/getLayoutChildList', params).then((res : any) => {
      if(res.data !== null) {
        setInsList(res.data)
        setAffiliatedInsList([])
      }
    })
  }

  // 机构点击
  function insClick(row) {
    const params = {
      parentNodeCode: row.nodeCode
    }
    const infoQueryParam = {
      nodeCode: row.nodeCode
    }
    setSelectedIns(row.unitName)
    http('post', '/ins/back/getLayoutChildList', params).then((res : any) => {
      if(res.data == null) {
        setAffiliatedInsList([])
      } else {
        setAffiliatedInsList(res.data)
      }
      http('post', '/ins/back/getLayoutByNodeCode', infoQueryParam).then((res : any) => {
        setInstitutionSimpleInfo(res.data)
      })
    })
  }

  // 挂靠机构点击
  function affiliatedInsClick(row) {
    const infoQueryParam = {
      nodeCode: row.nodeCode
    }
    http('post', '/ins/back/getLayoutByNodeCode', infoQueryParam).then((res : any) => {
      setInstitutionSimpleInfo(res.data)
    })
  }

  function handleAddType() {
    setAddTypeDialogOpen(true)
  }

  function handleCloseAddType(status: boolean) {
    setAddTypeDialogOpen(status)
  }

  function handleQuitCancel() {
    setQuitDialog(false)
  }

  function handleQuitConfirm() {
    setQuitDialog(false)
    history.push({pathname: '/view/'})
  }

  function handleAddIns() {
    history.push({pathname: "/editDetails/" + selectedInsType + "/" + selectedIns})
  }

  function handleAddAffiliatedIns() {
    history.push({pathname: "/editDetails/" + selectedInsType + "/" + selectedIns})
  }

  return (
    <Fragment>
    <div className='edit-page'>
      <div className='edit-list-search'>
        <Button className='quit-button' onClick={quitClick}><CloseOutlined />退出编辑</Button>
        <Button className='cancel-button' disabled><RollbackOutlined />撤销</Button>
        <Input className='input' prefix={<SearchOutlined />} placeholder='快速检索机构'></Input>
        <Button className='save-button'><SaveOutlined />保存</Button>
        <Button className='history-button'><HistoryOutlined /></Button>
      </div>
      <div className='edit-institution-type'>
        <ConfigProvider theme={greenTheme}>
          <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onInsTypeDragEnd}>
            <SortableContext
              items={insTypeList.map((i) => i.nodeCode)}
              strategy={verticalListSortingStrategy}>
                <Table
                  showHeader={false}
                  pagination={false}
                  components={{
                    body: {
                      row: Row,
                    },
                  }}
                  onRow={(row) => {
                    return {
                      onClick: (event) => {insTypeClick(row)},
                    }
                  }}
                  rowKey="nodeCode"
                  columns={columns}
                  dataSource={insTypeList}></Table>
            </SortableContext>
          </DndContext>
          {
            insList.length > 0 ? 
            <Fragment></Fragment>
            : 
            <Button className='edit-add-button' onClick={handleAddType}><PlusCircleFilled />新增</Button>
          }
        </ConfigProvider>
      </div>
      <div>
      <ConfigProvider theme={greenTheme}>
        {affiliatedInsList.length === 0 ?
        <div className='edit-institutions'>
          <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onInsListDragEnd}>
            <SortableContext
              items={insList.map((i) => i.nodeCode)}
              strategy={verticalListSortingStrategy}>
                <Table
                  showHeader={false}
                  pagination={false}
                  components={{
                    body: {
                      row: Row,
                    },
                  }}
                  onRow={(row) => {
                    return {
                      onClick: (event) => {insClick(row)},
                    }
                  }}
                  rowKey="nodeCode"
                  columns={columns}
                  dataSource={insList}></Table>
            </SortableContext>
          </DndContext>
          {
            insList.length > 0 ? 
            <Button className='edit-add-button' onClick={handleAddIns}><PlusCircleFilled />新增</Button>
            : <Fragment></Fragment>
          }
        </div>
        :
        <Fragment>
          <div className='edit-half-institutions'>
            {/* 有挂靠机构时的机构列表 */}
          <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onInsListDragEnd}>
            <SortableContext
              items={insList.map((i) => i.nodeCode)}
              strategy={verticalListSortingStrategy}>
                <Table
                  showHeader={false}
                  pagination={false}
                  components={{
                    body: {
                      row: Row,
                    },
                  }}
                  onRow={(row) => {
                    return {
                      onClick: (event) => {insClick(row)},
                    }
                  }}
                  rowKey="nodeCode"
                  columns={columns}
                  dataSource={insList}></Table>
            </SortableContext>
          </DndContext>
          </div>
          <div className='edit-affiliated-institutions'>
            {/* 挂靠机构列表 */}
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onAffiliatedInsListDragEnd}>
            <SortableContext
              items={affiliatedInsList.map((i) => i.nodeCode)}
              strategy={verticalListSortingStrategy}>
                <Table
                  showHeader={false}
                  pagination={false}
                  components={{
                    body: {
                      row: Row,
                    },
                  }}
                  onRow={(row) => {
                    return {
                      onClick: (event) => {affiliatedInsClick(row)},
                    }
                  }}
                  rowKey="nodeCode"
                  columns={columns}
                  dataSource={affiliatedInsList}></Table>
            </SortableContext>
          </DndContext>
          <Button className='edit-add-button' onClick={handleAddAffiliatedIns}><PlusCircleFilled />新增</Button>
          </div>
        </Fragment>
        }
        </ConfigProvider>
      </div>
      <InstitutionInfoSimple institutionInfoSimple={institutionSimpleInfo}></InstitutionInfoSimple>
    </div>
    <ConfigProvider theme={greenTheme}>
      <AddDialog open={addTypeDialogOpen} getStatus={handleCloseAddType}></AddDialog>
    </ConfigProvider>
    <ConfigProvider theme={yellowTheme}> 
      <Modal open={quitDialog}
      okText="继续修改"
      cancelText="退出编辑"
      onOk={handleQuitCancel}
      onCancel={handleQuitConfirm}
      >
        <ExclamationCircleTwoTone />
        <p>您还有未保存的修改项目</p>
        <p>现在返回，未保存的数据将会丢失</p>
      </Modal>
    </ConfigProvider>
    </Fragment>
  );
}