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
          fn()
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
        console.log(55555);
        this.onFulfilled.push(()=>{
          const res=success(this.value)
          resolve(res)
        })
        this.onRejected.push(()=>{
          const res=err(this.reason)
          resolve(res)
        })
      }
      if(this.status===FULFILLED){
        this.onFulfilled.push(()=>{
          const res=success(this.value)
          resolve(res)
        })
      }
      if(this.status===REJECTED){
        this.onRejected.push(()=>{
          const res=err(this.reason)
          resolve(res)
        })
      }
    })
  }
}
const p1=new Lpromise((resolve,reject)=>{
  resolve('哈哈哈哈')
  reject('222')
})
p1.then((res)=>{
  console.log(res);
  return res+'链式调用'
}).then((res)=>{
  console.log(res);
})