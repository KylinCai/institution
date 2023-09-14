import { Button, Divider } from "antd";
import './InstitutionInfoComplex.less';

export default function InstitutionInfoComplex({institutionInfo} : {institutionInfo: any}) {
    return (
        <div>
            <div className="institution-info-container">
                <div className="top">
                    <div className="code">机构代码：{institutionInfo.unitCode}</div>
                    <div className="name">{institutionInfo.unitName}</div>
                    <div className="normal">机构状态：{institutionInfo.unitStatus}</div>
                    <div className="normal">机构简称：{institutionInfo.unitNameShort}</div>
                    <div className="normal">机构英文：{institutionInfo.unitNameEnglish}</div>
                    <Divider className="divider" />
                    <div className="normal">机构级别{institutionInfo.foundDate}</div>
                    <Divider className="divider" />
                    <div className="normal">机构成立日期：{institutionInfo.foundDate}</div>
                    <div className="normal">机构成立文号：{institutionInfo.foundDate}</div>
                    <div className="normal">机构成立发文：{institutionInfo.foundDate}</div>
                    <Divider className="divider" />
                    <div className="normal">机构官网：{institutionInfo.foundDate}</div>
                </div>
                <div className="bottom">
                    <div className="code">该机构与以下机构合署办公</div>
                    <div className="relate-ins">{institutionInfo.unitName}</div>
                </div>
            </div>
        </div>
    )
}