import { Outlet, history } from 'umi';
import style from './index.less';
import { Fragment } from 'react';
import { Layout, Menu } from 'antd';
import seuIcon from '@/assets/SEU-icon.svg';
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
]

export default function Layouts() {
  function changeSiderMenu({key} : {key: string}) {
    history.push('/' + key)
  }
  return (
    <Fragment>
      <Layout>
        <Header className={style.header}>
          <div className={style.icon}>
            <img src={seuIcon} />
          </div>
          <Menu theme='dark' mode="horizontal" items={menu} className={style.menu} />
        </Header>
        <Layout className={style.body}>
          <Sider className={style.sider}>
            <Menu mode='inline' className={style.siderMenu} items={siderMenu}  onSelect={changeSiderMenu}></Menu>
          </Sider>
          <Layout className={style.outlet}>
            <Outlet />
          </Layout>
        </Layout>
      </Layout>
    </Fragment>
  );
  
}