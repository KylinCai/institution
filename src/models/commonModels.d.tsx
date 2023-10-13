declare namespace commonModels {
  interface InstitutionModel {
    nodeCode: string,
    nodeName: string,
    parentNode?: string,
    sort: string,
    visible: string,
    clickable: string,
    isCustomUnit: string,
    unitCode: string,
    unitName: string,
    unitNameShort: string,
    unitNameEnglish: string,
    unitStatus: string,
    foundDate: string,
    updateTime: string,
  }
  
  interface MeetingInfo {
    id: number,
    name: string,
    decisive: boolean
  }

}