class scheduler{
  constructor(size){
    this.count=0
    this.size=size
    this.requestQueue=[]
    this.res=[]
    this.len=0
  }
  /**
   * 
   * @param {Promise} promise 
   */
  add(promise){
    this.requestQueue.push(promise)
    this.len++
  }
  start(){
    return new Promise((resolve,reject)=>{
      const fn=()=>{
       while(this.requestQueue.length){
        if(this.count==this.size) {
          return
        }
        this.count++
        this.requestQueue.shift().then((res)=>{
          this.res.push(res)
        },err=>{
          this.res.push(err)
        }).finally(res=>{
          
          if(this.res.length==this.len) return resolve(this.res)
          this.count--
          fn()
        })
       }
      }
      fn()
    })
  }
}
const p1=new Promise((resolve)=>{
  setTimeout(() => {
    resolve('p1')
  }, 2000);
})
const p2=new Promise((resolve)=>{
  setTimeout(() => {
    resolve('p2')
  }, 2000);
})
const p3=new Promise((resolve)=>{
  setTimeout(() => {
    resolve('p3')
  }, 2000);
})
const p4=new Promise((resolve)=>{
  setTimeout(() => {
    resolve('p4')
  }, 2000);
})
const p5=new Promise((resolve)=>{
  setTimeout(() => {
    resolve('p5')
  }, 2000);
})
const sdl=new scheduler(2)
sdl.add(p1)
sdl.add(p2)
sdl.add(p3)
sdl.add(p4)
sdl.add(p5)
sdl.start().then(res=>{
  console.log(res);
})


 
