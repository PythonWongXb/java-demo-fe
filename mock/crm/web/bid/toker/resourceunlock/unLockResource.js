module.exports = (request) => {
  return {
    code: 0,
    data: {
      "unlockStatus": 2,  // 1 解锁中 2 解锁成功 3 解锁失败 4 未解锁
      "num": 1, //解锁个数，
      "unlockSuceccedIdlist": [], //解锁成功的资源id
      "alreadyUnlockIdlist": [], //已经解锁的资源id
    },
    message: ''
  }
}

