import { List } from 'antd'
import http from '@/utils/http'

export default function InstitutionList({institutionList} : {institutionList: Array<any>}) {
  if(institutionList.affiliatedInstitutions.length == 0) {
    return (
      <List className='institutions' itemLayout='horizontal' split={false} dataSource={institutionList.institutions} renderItem={(item, index) => (
        <List.Item onClick={ () =>handleInstitutionClick(item)}>
          <List.Item.Meta title={<a>{item.nodeName}</a>}></List.Item.Meta>
        </List.Item>
      )}>
      </List>
    )
  }
}