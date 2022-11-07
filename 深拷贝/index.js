let obj1={
  a:[123,3],
  name:'obj1',
  o:{
    oo:{
      name:'oo',
    },
    name:'o',
    age:19
  }
}
let arr1=[{name:'kobe'},{age:19}]
obj1.callback=obj1
let obj2=obj1
let obj3=deepClone(obj1)
console.log(obj1===obj2);
console.log(obj3);
console.log(obj1===obj3);
console.log('是否一样？');
console.log(obj1.callback.callback)
console.log(obj3.callback.callback.callback.callback.callback.callback)

console.log(deepClone(arr1));
function deepClone(target,map=new WeakMap){
  if(typeof target!=='object'|| target===null ) return target
  if(map.has(target)) return map.get(target)
  let res=Array.isArray(target)? []:{}
    map.set(target,res)
  for(let key in target){
    res[key]=deepClone(target[key],map)
  }
  return res
}

class person{
  constructor(a){
    console.log(a);
  }
}
let person1=new person
console.log(person1.__proto__.constructor===person);
console.log(person.prototype.constructor===person);
