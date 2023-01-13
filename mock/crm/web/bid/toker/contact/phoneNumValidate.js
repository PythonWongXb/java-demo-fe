module.exports = (request) => {
  return {
    code: 0,
    data: {
      "validateStatus": true, // 验证状态
      "phonenumValidateStatus": [ // 验证详情
        {
          "enterpriseId": "企业id",
          "numStatusInfo": {
            "13456689233": {
              "num": "",
              "numStatus": 0,
              "numDetectTtime": "2022-12-15 17:00:00"
            }
          }
        }
      ]
    },
    message: ''
  }
}
