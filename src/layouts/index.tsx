import { Outlet, history, useLocation } from 'umi';
import './index.less';
import style from '../global.less';
import { Layout, Menu, ConfigProvider, Form, Select, Button } from 'antd';
import seuIcon from '../../public/SEU-icon.svg';
import { useEffect, useState } from 'react';
import zhCN  from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn')

const { Header, Sider } = Layout;
const menu = [
  {
    label: 'ITS组织机构管理系统',
    key: 'institution',
    disabled: false
  },
  // {
  //   label: '教师',
  //   key: 'teacher',
  //   disabled: true
  // },
  // {
  //   label: '学生 ',
  //   key: 'student',
  //   disabled: true
  // },
  // {
  //   label: '教务',
  //   key: 'teaching',
  //   disabled: true
  // },
  // {
  //   label: '科研',
  //   key: 'research',
  //   disabled: true
  // },
]

const siderMenu = [
  {
    label: '查看模式',
    key: 'view',
  },
  {
    label: '编辑模式',
    key: 'edit',
  },
  {
    label: '会议维护 ',
    key: 'meeting',
  },
  {
    label: '查看已撤销机构',
    key: 'revoked',
  },
  {
    label: '用户权限配置',
    key: 'userManagement',
  },
  {
    label: '导出机构列表',
    key: 'export',
  },
]

export default function Layouts(props) {
  const [current, setCurrent] = useState("/")
  const location = useLocation()
  useEffect(() => {
    setCurrent(location.pathname)
  })
  function changeSiderMenu({key} : {key: string}) {
    history.push('/' + key)
  }
  return (
    <ConfigProvider locale={zhCN} theme={{token: {colorTextBase: style.gray66}}}>
      <Layout >
        <Header className='header'>
          <div>
            <img className='icon' src={seuIcon} />
          </div>
          <div className='menu'>ITS 组织机构管理系统</div>
          {/* <Menu theme='dark' mode="horizontal" items={menu} className='menu' /> */}
        </Header>
        <Layout className='body'>
          <Sider className='sider'>
            <Menu mode='inline' className='sider-menu' selectedKeys={location.pathname} items={siderMenu}  onSelect={changeSiderMenu}></Menu>
          </Sider>
          <Layout className='outlet'>
            <Outlet />
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
  
}