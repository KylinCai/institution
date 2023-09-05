import { defineMock } from "umi";

type Institution = {
  code: number,
  name: string,
  status: string,
  nameSimple: string,
  nameEn: string, 
  establishmentDate: string
}

let institutions: Institution[] = [
    {
        code: 1,
        name: '这是机构名称1这是机构名称1这是机构名称1这是机构名称1',
        status: 'status',
        nameSimple: '我是结构简称1',
        nameEn: 'nameEn', 
        establishmentDate: 'date'
    },
    {
        code: 2,
        name: '这是机构名称2这是机构名称2这是机构名称2这是机构名称2',
        status: 'status',
        nameSimple: '我是结构简称2',
        nameEn: 'nameEn', 
        establishmentDate: 'date'
    },
    {
        code: 3,
        name: '这是机构名称3这是机构名称3这是机构名称3这是机构名称3',
        status: 'status',
        nameSimple: '我是结构简称3',
        nameEn: 'nameEn', 
        establishmentDate: 'date'
    }
]

export default defineMock({
    'GET /api/institutions': (_, res) => {
        res.send({
            status: 'ok',
            data: institutions,
        })
    },
    'DELETE /api/products/:id': (req, res) => {
        institutions = institutions.filter((item) => item.code == Number(req.params.code))
        res.send({status: 'ok'})
    }
})