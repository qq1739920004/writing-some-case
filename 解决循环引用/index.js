function circulationClone(target,map=new WeakMap()){
  if(typeof target !=='object')return target
  let res=Array.isArray(target)?[]:{}
  if(map.has(target)) return null
  map.set(target,res)
  for(const key in target){
    res[key]=circulationClone(target[key],map)
  }
  return res
}
let obj={
  age:19,
  name:'ll',
  ob:'asdf',
  ob2:{
    name:'aa',
    ob3:[1,23,3],
    fn:()=>{
      console.log(333333);
    }
  }
}
obj.ob=obj
let res=circulationClone(obj)
console.log(obj);
console.log(res);
console.log(obj.ob2.ob3===res.ob2.ob3);
console.log(Math.floor(0.11 * 0xffffff).toString(16));

