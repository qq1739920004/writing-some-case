class iteratorObj{
  constructor(){
    this.age=18,
    this.name='kl'
    this.love='麻辣烫'
    this.nation='china'
  }
  [Symbol.iterator](){
    let _index=0
    let _keys=Object.keys(this)
    let _len=Object.keys(this).length
    let _iteration={
      next:()=>{
        if(_index<_len){
          return {done:false,valueTure:this[_keys[_index]],value:_keys[_index++]}
        }

        return {done:true,key:undefined,value:undefined}
      }
    }
    return _iteration
  }
}
const obj=new iteratorObj()
let iteration1=obj[Symbol.iterator]()
for(let key of obj){
  console.log(`key:${key},value:${obj[key]}`);
}


