import { useState } from 'react';
import './institutionDetails.less';
import { Breadcrumb, Button } from 'antd';
import { history, useParams } from 'umi';
import returnIcon from '@/assets/return-arrow.svg';
import InstitutionInfoComplex from '@/components/InstitutionInfoComplex/InstitutionInfoComplex';
import InstitutionInfoForm from '@/components/InstitutionInfoForm/InstitutionInfoForm';

function returnList() {
  history.push({pathname: '/view' })
}

export default function Page() {
  const params = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([{title: params.type}, {title: params.name}])
  const [institutionInfo, setInstitutionInfo] = useState({})
  return (
    <div>
      <div className='title'> 
        <div className='content'>
          <Button className='return' onClick={returnList}>返回</Button>
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
