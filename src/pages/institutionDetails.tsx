import { useEffect, useState } from 'react';
import './institutionDetails.less';
import { Breadcrumb, Button } from 'antd';
import { history, useParams } from 'umi';
import InstitutionInfoComplex from '@/components/InstitutionInfoComplex/InstitutionInfoComplex';
import InstitutionInfoForm from '@/components/InstitutionInfoForm/InstitutionInfoForm';
import { ArrowLeftOutlined } from '@ant-design/icons';

function returnList() {
  history.push({pathname: '/view' })
}

export default function Page() {
  const params = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([{title: params.type}, {title: params.name}])
  const [institutionInfo, setInstitutionInfo] = useState({})

  useEffect(() => {
    // TODO: 根据机构名称获取机构基本信息
  }, [])
  return (
    <div>
      <div className='title'> 
        <div className='content'>
          <Button className='return' onClick={returnList}><ArrowLeftOutlined />返回</Button>
          <Breadcrumb className='breadcrumb' items={breadcrumbItems}></Breadcrumb>
        </div>
      </div>
      <div className='info-complex'>
        <InstitutionInfoComplex institutionInfo={institutionInfo}></InstitutionInfoComplex>
      </div>
      <div>
        <InstitutionInfoForm></InstitutionInfoForm>
      </div>
    </div>
  );
}
