function  run(generrator){
  return new Promise((resolve,reject)=>{
    const gen=generrator()
    const _next=(val)=>{
      try{
        var res=gen.next(val)
      }catch(err){
       return reject(err)
      }
      if(res.done){
        return resolve(res.value)
      }
      Promise.resolve(res.value).then(res=>{
        _next(res)
        },err=>{
          gen.throw(err)
          /**
          1、生成器函数的外部可以向throw方法传达参数，该参数被catch语句捕获。
          2、不传达参数，catch语句捕获为undefined，catch语句捕获后恢复生成器的执行，具有IteratorResult。
          */
      })

    }
    _next()
  })
}

function* myGenerator() {
  try {
    console.log(yield Promise.resolve(1)) 
    console.log(yield 2)   //2
    console.log(yield Promise.reject('error'))
  } catch (error) {
    console.log(error)
  }
}

const result = run(myGenerator)


