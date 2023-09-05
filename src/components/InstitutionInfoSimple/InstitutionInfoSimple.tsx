import { Button, Divider } from "antd";
import './InstitutionInfoSimple.less';

export default function InstitutionInfoSimple({institutionInfoSimple} : {institutionInfoSimple: any}) {
    return (
        <div className='institution-in-simple'>
            <div className="institution-info-container">
                <div className="code">机构代码：{institutionInfoSimple.unitCode}</div>
                <div className="name">{institutionInfoSimple.unitName}</div>
                <Button type="primary" className="button">查看机构详情</Button>
                <div className="normal">机构状态：{institutionInfoSimple.unitStatus}</div>
                <div className="normal">机构简称：{institutionInfoSimple.unitNameShort}</div>
                <div className="normal">机构英文：{institutionInfoSimple.unitNameEnglish}</div>
                <Divider className="divider" />
                <div className="normal">机构成立日期：{institutionInfoSimple.foundDate}</div>
            </div>
        </div>
    )
}