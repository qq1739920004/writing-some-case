//目前的状态
const STATE_PENDING = 'pending'
const STATE_FULFILLED = 'fulfilled'
const STATE_REJECTED = ' rejected'

class Lpromise {
  constructor(execute) {
    this.state = STATE_PENDING
    // resolve链式调用的所有方法
    this.onFulfilled = []
    // reject链式调用的所有方法
    this.onRejected = []
    // resolve的参数
    this.value = undefined
    // reject的参数
    this.reason = undefined
    // STATE_PENDING状态下的resolve
    this.resolve = (res) => {
      if (this.state === STATE_PENDING) {
        queueMicrotask(() => {
      if (this.state !== STATE_PENDING) return
        this.state = STATE_FULFILLED
      this.value = res
          this.onFulfilled.forEach((item) => {
            item(this.value)
          })
        })
      }
    }
    // STATE_PENDING状态下的reject
    this.reject = (err) => {
      if (this.state === STATE_PENDING) {
        queueMicrotask(() => {
      if (this.state !== STATE_PENDING) return
        this.state = STATE_REJECTED
      this.reason = err
      //如果有err而且onRejected为空的时候添加方法去执行输出错误
      if(this.onRejected.length==0 && err){
        this.onRejected.push((err)=>{console.log(err)})
      }
          this.onRejected.forEach((item) => {
            item(this.reason)
          })
        })
      }


    }
    execute(this.resolve, this.reject)
  }
  then(success, fail) {
    // 没有给then传两个参数，只传了success的情况
    fail=fail || (err=>{throw err})
    // 没有给then传两个参数，只传了fail的情况
    success=success || (value=>{return value})
    return new Lpromise((resolve,reject)=>{
    //延时导致状态是STATE_PENDING
    if (this.state === STATE_FULFILLED) {
      try{
      const value=success(this.value)
        resolve(value)
        this.state = STATE_FULFILLED
      }
      catch(err){
        reject(err)
        this.state = STATE_REJECTED
      }
    }
    //延时导致状态是STATE_REJECTED
    if (this.state === STATE_REJECTED) {
      try{
      const reason=fail(this.reason)
        resolve(reason)
        this.state = STATE_FULFILLED
      }
      catch(err){
        reject(err)
        this.state = STATE_REJECTED
      }
      }
    //正常执行 
    if (this.state === STATE_PENDING) {
      // console.log(fail);
      // fail=fail || (err=>{console.log(err)})
      if(success){
      this.onFulfilled.push(()=>{
        try{
        const value=success(this.value)
        resolve(value)
        }
        catch(err){
          reject(err)
        }
      })
    }
    if(fail){
      this.onRejected.push(()=>{
        try{
        const reason=fail(this.reason)
        resolve(reason)
      }
        catch(err){
          reject(err)
        }
      })
    }
    }

    })
  }
 
  catch(fail){
   return this.then(undefined,fail)
  }
  finally(exe){
    this.then(exe,exe)
  }

  //promise的类方法
  static resolve(value){
    return new Lpromise((resolve)=>{
      resolve(value)
    })
  }
  static reject(err){
    return new Lpromise((resolve,reject)=>{
      reject(err)
    })
  }
  static all(promises){
    const values=[]
    return new Lpromise((resolve,reject)=>{
      promises.forEach(item=>{
          item.then(value=>{
            values.push(value)
            if(values.length>=promises.length){
              resolve(values)
            }
          }).catch(err=>{
            reject(err)
          })
      })
    })
  }
  static allSettled(promises){
    return new Lpromise((resolve)=>{
    const values=[]
      promises.forEach(item=>{
          item.then(value=>{
            values.push({state:STATE_FULFILLED,val:value})
            if(values.length===promises.length){
              resolve(values)
            }
          }).catch(err=>{
            values.push({state:STATE_REJECTED,val:err})
            if(values.length===promises.length){
              resolve(values)
            }
          })
      })
    })
  }
  static race(promises){
    return new Lpromise((resolve,reject)=>{
      promises.forEach(item=>{
        item.then(value=>{
          resolve('我第一个返回'+value)
        }).catch(err=>{
          reject('我第一个返回'+err)
        })
      })
    })
  }
  static any(promises){
    const errs=[]
    return new Lpromise((resolve,reject)=>{
      promises.forEach(item=>{
        item.then(value=>{
          resolve('我第一个成功的返回'+value)
        }).catch(err=>{
          errs.push(err)
          if(errs.length===promises.length){
            reject(new AggregateError(errs))//此错误当前node版本不支持，记得用浏览器
          }
        })
      })
    })
  }

}

const promise = new Lpromise((resolve, reject) => {
  resolve('111')
  // reject('222')
})

// promise.then(value => {
//   console.log('success1:' + value)
//   // console.log(subab);
//   return '222'
// },
//   err => {
//     console.log('fail:' + err);
//   }
// )
// .then(
//   value=>{
//     console.log('success2:' + value)
//     return '333'
//   },err=>{
//     console.log('fail2:' +err);
//   }
// ).finally(exe=>{
//   console.log('我是finally'+exe);
// })

//then单参数
// promise.then(value=>{
//   console.log('then1:'+value);
// }).catch(err=>{
//   console.log('reject的catch:'+err);
// }).finally(()=>{
//   console.log('我是finally');
// })

// 延时测试
// setTimeout(() => {
//   promise.then(value => {
//     console.log('延时测试resolve:'+value);
//   },err => {
//       console.log('延时测试reject:' + err);
//     })
// }, 500)

// setTimeout(() => {
//   promise.then(value => {
//     console.log('延时测试resolve:'+value);
//   }).catch(err=>{
//     console.log('我是延迟测试的reject的catch：'+err);
//   })
// }, 500)

//类方法测试
//resolve，reject
// const staPromise=Lpromise.resolve('我是类方法resolve')
// staPromise.then(value=>{
//   console.log('then1:'+value);
// }).catch(err=>{
//   console.log('reject的catch:'+err);
// }).finally(()=>{
//   console.log('我是finally');
// })

//all
// const p1=new Lpromise((resolve,reject)=>{
//   setTimeout((err)=>{
//     reject('我是all1'+err)
//   },1000)
// })
// const p2=new Lpromise((resolve,reject)=>{
//   resolve('我是all2')
// })

// const p3=new Lpromise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('我是all3')
//   },2000)
// })
// const promises=Lpromise.all([p1,p2,p3])
// promises.then(value=>{
//   console.log('我是all的then'+value);
// }).catch(err=>{
//   console.log('我是all的catch'+err);
// })

//allsettled
// const p1=new Lpromise((resolve,reject)=>{
//   setTimeout((err)=>{
//     reject('我是all1'+err)
//   },1000)
// })
// const p2=new Lpromise((resolve,reject)=>{
//   resolve('我是all2')
// })

// const p3=new Lpromise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('我是all3')
//   },2000)
// })
// const promises=Lpromise.allSettled([p1,p2,p3])
// promises.then(value=>{
//   console.log(value);
// })

//race
// const p1=new Lpromise((resolve,reject)=>{
//   setTimeout((err)=>{
//     reject('我是all1'+err)
//   },1000)
// })
// const p2=new Lpromise((resolve,reject)=>{
//   reject('我是all2')
// })

// const p3=new Lpromise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('我是all3')
//   },2000)
// })
// const promises=Lpromise.race([p1,p2,p3])
// promises.then(value=>{
//   console.log(value);
// })

//any
const p1=new Lpromise((resolve,reject)=>{
  setTimeout((err)=>{
    reject('我是all1'+err)
  },1000)
})
const p2=new Lpromise((resolve,reject)=>{
  reject('我是all2')
})

const p3=new Lpromise((resolve,reject)=>{
  setTimeout(()=>{
    reject('我是all3')
  },2000)
})
const promises=Lpromise.any([p1,p2,p3])
promises.then(value=>{
  console.log(value);
}).catch(err=>{
  console.log(err);
})



