import React, { Fragment } from 'react'
import './view.less'
import InstitutionInfoSimple from '@/components/InstitutionInfoSimple/InstitutionInfoSimple'
import { Select, Input, List, Divider } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import http from '@/utils/http'

const modeOptions = [
  {
    value: 'singleModeTree',
    label: (<a>单列模式</a>)
  },
  {
    value: 'tilingModeTree',
    label: (<a>平铺模式</a>)
  },
  {
    value: '3',
    label: (<a>蓝图模式</a>)
  }
]

class Page extends React.Component {
  state = {
    institutionSimpleInfo: {} as commonModels.InstitutionModel,
    institutionTypes: [],
    institutions: {
      institutionList: [],
      affiliatedInstitutions: []
    },
  }

  handleInstitutionTypeClick = (item: commonModels.InstitutionModel) => {
    const params = {
      parentNodeCode: item.nodeCode
    }
    http('post', '/ins/back/getLayoutChildList', params).then((res : any) => {
      if(res.data !== null) {
        this.setState({institutions : {institutionList: res.data, affiliatedInstitutions: []}})
      }
    })
  }

  handleInstitutionClick = (item: commonModels.InstitutionModel) => {
    const params = {
      parentNodeCode: item.nodeCode
    }
    const infoQueryParam = {
      nodeCode: item.nodeCode
    }
    http('post', '/ins/back/getLayoutChildList', params).then((res : any) => {
      if(res.data == null) {
        this.setState({institutions : {institutionList: this.state.institutions.institutionList, affiliatedInstitutions: []}})
      } else {
        this.setState({institutions : {institutionList: this.state.institutions.institutionList, affiliatedInstitutions: res.data}})
      }
      http('post', '/ins/back/getLayoutByNodeCode', infoQueryParam).then((res : any) => {
        this.setState({institutionSimpleInfo: res.data})
      })
    })
  }

  handleAllilicatedInstitutionClick = (item: commonModels.InstitutionModel) => {
    const infoQueryParam = {
      nodeCode: item.nodeCode
    }
    http('post', '/ins/back/getLayoutByNodeCode', infoQueryParam).then((res : any) => {
      this.setState({institutionSimpleInfo: res.data})
    })
  }                

  componentDidMount(): void {
    const params = {
      includeCustomUnit: 0
    }
    http('post', '/ins/back/getTopLayoutList', params).then(res => {
      this.setState({institutionTypes : res.data })
    })
  }
  constructor(props) {
    super(props)  
  }
  
  render(): React.ReactNode {
    return (
      <div className='view-page'>
        <div className='list-search'>
          <Select className='select' dropdownStyle={{height: '244px', padding: '8px'}} defaultValue={modeOptions[0].value} options={modeOptions}></Select>
          <Input className='input' placeholder='输入搜索名称，按回车键搜索'></Input>
        </div>
        <div className='institution-type'>
          <List className='list' itemLayout='horizontal' split={false} dataSource={this.state.institutionTypes} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleInstitutionTypeClick(item)}>
              <List.Item.Meta title={<a className='list-font'>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
        </div>     
        <div>
        {this.state.institutions.affiliatedInstitutions.length == 0 ? 
        <div className='institutions'>
          <List className='list' itemLayout='horizontal' split={false} dataSource={this.state.institutions.institutionList} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleInstitutionClick(item)}>
              <List.Item.Meta title={<a className='list-font'>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
          </div>
          :
          <Fragment>
          <div className='half-institutions'>
          <List className='list' itemLayout='horizontal' split={false} dataSource={this.state.institutions.institutionList} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleInstitutionClick(item)}>
              <List.Item.Meta title={<a className='list-font'>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
          </div>
          <div className='affiliated-institutions'>
          <List className='list' itemLayout='horizontal' split={false} dataSource={this.state.institutions.affiliatedInstitutions} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleAllilicatedInstitutionClick(item)}>
              <List.Item.Meta title={<a className='list-font'>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
          </div>
          </Fragment>
        }
        </div>        
        <InstitutionInfoSimple type="view" institutionInfoSimple={this.state.institutionSimpleInfo}></InstitutionInfoSimple>
      </div>
    );
  }

  componentWillUnmount(): void {
    this.setState = () => false;
  }
}

export default Page