module.exports = (request) => {
  return {
    code: 0,
    data: [
      {
        "available": 1, // 是否可用
        "name": "工商信息", // 名称
        "sort": 1000, // 排序
        "total": 1, // 总数
        "type": "business", // 数据类型，切换导航时使用
        "children":
          [
            {
              "available": 1,
              "name": "工商信息",
              "sort": 10000,
              "total": 1,
              "type": "business"
            }
          ]
      },
      {
        "available": 1,
        "children":
          [
            {
              "available": 1,
              "name": "股东信息",
              "sort": 10000,
              "total": 10,
              "type": "shareholders"
            },
            {
              "available": 1,
              "name": "主要人员",
              "sort": 10100,
              "total": 8,
              "type": "directors"
            },
            {
              "available": 1,
              "name": "最终受益人",
              "sort": 10200,
              "total": 1,
              "type": "benefitPerson"
            }
          ],
        "name": "基本信息",
        "sort": 2000,
        "total": 19,
        "type": "directors"
      },
      {
        "available": 1,
        "children":
          [
            {
              "available": 1,
              "name": "对外投资",
              "sort": 10000,
              "total": 21,
              "type": "invest"
            },
            {
              "available": 1,
              "name": "控股企业",
              "sort": 10100,
              "total": 22,
              "type": "hold"
            },
            {
              "available": 1,
              "name": "融资信息",
              "sort": 10200,
              "total": 10,
              "type": "projectFinance"
            },
            {
              "available": 1,
              "name": "品牌项目",
              "sort": 10300,
              "total": 6,
              "type": "projectBasic"
            },
            {
              "available": 1,
              "name": "招投标",
              "sort": 10400,
              "total": 7,
              "type": "tenderBidding"
            },
            {
              "available": 1,
              "name": "工资待遇",
              "sort": 10500,
              "total": 0,
              "type": "salary"
            }
          ],
        "name": "经营状况",
        "sort": 3000,
        "total": 66,
        "type": "shareholders"
      },
      {
        "available": 1,
        "children":
          [
            {
              "available": 1,
              "name": "专利信息",
              "sort": 10000,
              "total": 1615,
              "type": "patent"
            },
            {
              "available": 1,
              "name": "软件著作权信息",
              "sort": 10100,
              "total": 110,
              "type": "copyright"
            },
            {
              "available": 1,
              "name": "作品著作权",
              "sort": 10200,
              "total": 18,
              "type": "workRight"
            }
          ],
        "name": "知识产权",
        "sort": 4000,
        "total": 1743,
        "type": "shareholders"
      },
      {
        "available": 1,
        "children":
          [
            {
              "available": 1,
              "name": "失信被执行人",
              "sort": 10000,
              "total": 28,
              "type": "discredit"
            },
            {
              "available": 1,
              "name": "经营异常",
              "sort": 10100,
              "total": 1,
              "type": "abnormal"
            },
            {
              "available": 1,
              "name": "行政处罚",
              "sort": 10200,
              "total": 1,
              "type": "penalties"
            }
          ],
        "name": "风险信息",
        "sort": 5000,
        "total": 30,
        "type": "risk"
      }
    ],
    message: ''
  }
}
