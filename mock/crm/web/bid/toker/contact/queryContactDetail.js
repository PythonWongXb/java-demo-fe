module.exports = (request) => {
  return {
    code: 0,
    data: [
      {
        "nums": 12,
        "contactsTypeDetails": [
          {
            "type": 1,         // 联系方式类型：1:手机，2:邮箱，4:QQ，5:座机
            "contactsDetails": [  // 联系方式详情
              {
                "name": "叶 * *",        // 联系人名称
                "value": "18510180816", // 联系方式
                "status": 1,            // 联系方式状态
                "importantTitle": "",   // 联系人职位
                "source": [             // 联系方式来源
                  {
                    "source": 10,        // 联系方式来源code
                    "sourceKey": 1125,   // 联系方式来源key
                    "name": "58同城",     // 联系方式来源名称
                    "url": "http://qy.m.58.com/m_detail/18228266/",  // 联系方式来源url
                    "status": 0,  // 联系方式来源url状态：0：无效，1:正常
                    "sourceIds": null
                  }
                ],
                "realName": null,
                "detectTime": "2022-12-16 11:19:36",  // 号码检测时间
                "isDetectedSelf": null,
                "isBookkeepingAgency": 0,    // 疑似代理记账  0:否，1:是
                "score": 20,                 // 分值
                "actualScore": 50,           // 实际分值
                "enterpriseContactTags": [  // 联系方式标签
                  {
                    "tagId": 9,  // 标签id
                    "seqNo": 9,  // 标签排序
                    "tagName": "联系方式归属地",  // 标签名称
                    "tagValue": "北京_北京",     // 标签值
                    "tagValueType": "string"    // 标签值类型
                  }
                ],
                "contactTags": [  // 联系方式标记
                  {
                    "tag": "1",       // 联系方式标记key
                    "tagName": "高意向",  // 联系方式标记名称
                    "memo": ""        // 标记备注
                  }
                ],
                "provinceName": "北京",  // 联系方式省份
                "cityName": "北京"      // 联系方式城市
              }
            ]
          },
          {
            "type": 1,         // 联系方式类型：1:手机，2:邮箱，4:QQ，5:座机
            "contactsDetails": [  // 联系方式详情
              {
                "name": "叶2222",        // 联系人名称
                "value": "18510180816", // 联系方式
                "status": 1,            // 联系方式状态
                "importantTitle": "",   // 联系人职位
                "source": [             // 联系方式来源
                  {
                    "source": 10,        // 联系方式来源code
                    "sourceKey": 1125,   // 联系方式来源key
                    "name": "58同城",     // 联系方式来源名称
                    "url": "http://qy.m.58.com/m_detail/18228266/",  // 联系方式来源url
                    "status": 0,  // 联系方式来源url状态：0：无效，1:正常
                    "sourceIds": null
                  }
                ],
                "realName": null,
                "detectTime": "2022-12-16 11:19:36",  // 号码检测时间
                "isDetectedSelf": null,
                "isBookkeepingAgency": 0,    // 疑似代理记账  0:否，1:是
                "score": 20,                 // 分值
                "actualScore": 50,           // 实际分值
                "enterpriseContactTags": [  // 联系方式标签
                  {
                    "tagId": 9,  // 标签id
                    "seqNo": 9,  // 标签排序
                    "tagName": "联系方式归属地",  // 标签名称
                    "tagValue": "北京_北京",     // 标签值
                    "tagValueType": "string"    // 标签值类型
                  }
                ],
                "contactTags": [  // 联系方式标记
                  {
                    "tag": "1",       // 联系方式标记key
                    "tagName": "高意向",  // 联系方式标记名称
                    "memo": ""        // 标记备注
                  }
                ],
                "provinceName": "北京",  // 联系方式省份
                "cityName": "北京"      // 联系方式城市
              }
            ]
          }
        ]
      }
    ],
    message: ''
  }
}
