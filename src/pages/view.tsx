import React from 'react'
import './view.less'
import InstitutionInfoSimple from '@/components/InstitutionInfoSimple/InstitutionInfoSimple'
import { Select, Input, List } from 'antd'
import http from '@/utils/http'
import Item from 'antd/es/list/Item'

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
    institutionSimpleInfo: {
      nodeCode: '',
      nodeName: '',
      parentNode: '',
      sort: null,
      visible: null,
      clickable: null,
      isCustomUnit: null,
      unitCode: null,
      unitName: null,
      unitNameShort: null,
      unitNameEnglish: null,
      unitStatus: null,
      foundDate: null,
      updateTime: null,
    },
    institutionTypes: [],
    institutions: {
      institutionList: [],
      affiliatedInstitutions: []
    },
  }

  handleInstitutionTypeClick = (item) => {
    const params = {
      parentNodeCode: item.nodeCode
    }
    http('post', '/ins/getLayoutChildList', params).then((res : any) => {
      if(res.data !== null) {
        this.setState({institutions : {institutionList: res.data, affiliatedInstitutions: []}})
      }
    })
  }

  handleInstitutionClick = (item) => {
    const params = {
      parentNodeCode: item.nodeCode
    }
    const infoQueryParam = {
      nodeCode: item.nodeCode
    }
    http('post', '/ins/getLayoutChildList', params).then((res : any) => {
      if(res.data == null) {
        this.setState({institutions : {institutionList: this.state.institutions.institutionList, affiliatedInstitutions: []}})
      } else {
        this.setState({institutions : {institutionList: this.state.institutions.institutionList, affiliatedInstitutions: res.data}})
      }
      http('post', '/ins/getLayoutByNodeCode', infoQueryParam).then((res : any) => {
        this.setState({institutionSimpleInfo: res.data})
      })
    })
  }

  handleAllilicatedInstitutionClick = (item) => {
    const infoQueryParam = {
      nodeCode: item.nodeCode
    }
    http('post', '/ins/getLayoutByNodeCode', infoQueryParam).then((res : any) => {
      this.setState({institutionSimpleInfo: res.data})
    })
  }

  constructor(props) {
    super(props)
    const params = {
      includeCustomUnit: 0
    }
    http('post', '/ins/getTopLayoutList', params).then(res => {
      this.setState({institutionTypes : res.data})
    })
  }
  
  render(): React.ReactNode {
    return (
      <div>
        <div className='list-search'>
          <Select className='select' defaultValue={modeOptions[0].value} options={modeOptions}></Select>
          <Input className='input' placeholder='输入搜索名称，按回车键搜索'></Input>
        </div>
        <div className='institution-type'>
          <List className='list' itemLayout='horizontal' split={false} dataSource={this.state.institutionTypes} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleInstitutionTypeClick(item)}>
              <List.Item.Meta title={<a>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
        </div>     
        {this.state.institutions.affiliatedInstitutions.length == 0 ? 
        <div className='institutions'>
          <List className='list' itemLayout='horizontal' split={false} dataSource={this.state.institutions.institutionList} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleInstitutionClick(item)}>
              <List.Item.Meta title={<a>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
          </div> :
          <div>
          <List className='half-list' itemLayout='horizontal' split={false} dataSource={this.state.institutions.institutionList} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleInstitutionClick(item)}>
              <List.Item.Meta title={<a>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
          <List className='affiliated-list' itemLayout='horizontal' split={false} dataSource={this.state.institutions.affiliatedInstitutions} renderItem={(item, index) => (
            <List.Item onClick={ () =>this.handleAllilicatedInstitutionClick(item)}>
              <List.Item.Meta title={<a>{item.nodeName}</a>}></List.Item.Meta>
            </List.Item>
          )}>
          </List>
          </div>
        }        
        <InstitutionInfoSimple institutionInfoSimple={this.state.institutionSimpleInfo}></InstitutionInfoSimple>
      </div>
    );
  }

  componentWillUnmount(): void {
    this.setState = () => false;
  }
}

export default Page