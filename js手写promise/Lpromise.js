const PENDING='pending'
const FULFILLED='fulfilled'
const REJECTED='rejected'
class Lpromise{
  constructor(execute){
    this.status=PENDING
    this.onFulfilled=[]//链式调用里面的方法
    this.onRejected=[]//链式调用里面的方法
    this.value=undefined//resolve的参数
    this.reason=undefined//reject的参数

    this.resolve=(value)=>{
      if(this.status===PENDING){
        this.status=FULFILLED
      queueMicrotask(()=>{
        this.value=value
        for(let fn of this.onFulfilled){
          fn(this.value)
        }
      })
      console.log('resolve执行');
    }

    }
    this.reject=(reason)=>{
      if(this.status===PENDING){
        this.status=REJECTED
        queueMicrotask(()=>{
          this.reason=reason
            for(let fn of this.onRejected){
              fn(this.reason)
            }
          })
          console.log('reject执行');
      }
      
    }
    execute(this.resolve,this.reject)
  }
  then(success,err){
    success=success || (res=>{return res})
    err=err || (err=>{throw err})
   
    return new Lpromise((resolve,reject)=>{
      if(this.status===PENDING){
        this.onFulfilled.push(()=>{
          try{
            const res=success(this.value)
            resolve(res)
          }
          catch(err){
            reject(err)
          }

        })
        this.onRejected.push(()=>{
          try{
          const res=err(this.reason)
          resolve(res)
        }
        catch(err){
          reject(err)
        }
        })
      }
      if(this.status===FULFILLED){
        this.onFulfilled.push(()=>{
          try{
            const res=success(this.value)
            resolve(res)
          }
          catch(err){
            reject(err)
          }
        })
      }
      if(this.status===REJECTED){
        this.onRejected.push(()=>{
          try{
            const res=err(this.reason)
            resolve(res)
          }
          catch(err){
            reject(err)
          }
        })
      }
    })
  }
  catch(err){
    return this.then(undefined,err)
  }
  finally(callback){
    return this.then(callback,callback)
  }
  static all(promiseArr){
    return new Promise((resolve,reject)=>{
    let res=[]
    promiseArr.forEach(item => {
      item.then(result=>{
        res.push(result)
        if(res.length==promiseArr.length) resolve(res)
      }).catch(err=>{console.log(err)})

    }); 
    })
  }
}
// const p1=new Lpromise((resolve,reject)=>{
//   reject('222')
// })
// p1.then((res)=>{
//   console.log(res);
//   return res+'链式调用'
// }).catch(err=>{
//   console.log(err);
// })
const pp1=new Lpromise((resolve,reject)=>{
  resolve(111)
})
const pp2=new Lpromise((resolve,reject)=>{
  setTimeout(()=>{
  resolve(222)

  },3000)
})
const pp3=new Lpromise((resolve,reject)=>{
  resolve(3)
})
Lpromise.all([pp1,pp2,pp3]).then(res=>{
  console.log(res);
},err=>{
  console.log(err);
})