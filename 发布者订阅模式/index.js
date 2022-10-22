class EventEmitter{
  constructor(){
    this._events={}
  }
  //订阅
  on(name,fn){
    this._events[name]=this._events[name] ? this._events[name] : []
    this._events[name].push(fn)
  }
  //发布
  emit(name,...args){
    if(!this._events[name]) return false
    const res=[]
    this._events[name].forEach(item => {
      res.push({'funcion:': fn,'result':item.apply(this,args)})
    });
    return res
  }
  //取消订阅的方法
  off(name,fn){
    if(!this._events[name] || typeof fn!=='function') return false
    this._events[name]=this._events[name].filter((item)=> item!==fn)
  }
  //只订阅一次的方法
  once(name,fn){
    if(!this._events[name] || typeof fn!=='function') return false
    const ffn=(...args)=>{
      this.off(name,ffn)
      fn.apply(this,args)
    }
    this.on(name,ffn)
  }
}
function fn(...args){
  console.log(args);
  console.log(arguments);

  console.log(Array.isArray(args));
  console.log(Array.isArray(arguments));
  console.log(typeof arguments);
}
function fn1(){
  console.log('我是fn1');
}
// fn(123,41,1)

const effect=new EventEmitter()
effect.on('test',fn)
effect.once('test',fn1)

setTimeout(()=>{
 console.log(effect.emit('test',123,41,1)); 
},1000)
setTimeout(()=>{
  console.log('-----------');
  effect.emit('test',123,41,1)
},2000)
console.log(typeof fn);