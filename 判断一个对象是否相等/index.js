function objEquality(o1,o2){
  const keys1=Object.keys(o1)
  const keys2=Object.keys(o2)
  if(keys1.length!==keys2.length) return false
  for(let i=0;i<keys1.length;i++){
    if(!o2[keys1[i]]) return false
    if(o1[keys1[i]]!==o2[keys2[i]]) return false
  }
  return true
}

function objEquality2(o1,o2){
  const keys1=Object.keys(o1)
  const keys2=Object.keys(o2)
  if(keys1.length!==keys2.length) return false
  for(let i=0;i<keys1.length;i++){
    if(!o2[keys1[i]]) return false
    if(Object.prototype.toString.call(o1[keys1[i]])=='[Object object]') {
      if(JSON.stringify(o1[keys1[i]])!==JSON.stringify(o2[keys2[i]])) return false
    }
    if(typeof o1[keys1[i]]=='symbol') return false
    if(typeof o1[keys1[i]]=='function') {
      if(o1[keys1[i]].toString()!==o2[keys2[i]].toString()){
        return false
      }
    }

  }
  return true
}
let o1={
  a:12,
  b:11,
  oo:{
    name:'kl'
  },
  fn1:()=>{
    console.log(222);
  },
  sy:Symbol()
}
let o2={
  a:12,
  b:11,
  oo:{
    name:'kl'
  },
  fn1:()=>{
    console.log(222);
  },
  sy:Symbol()

}
console.log(objEquality(o1,o2));//判断内容与引用的对象是否相等
console.log(o1.a===o2.a);
console.log(objEquality2(o1,o2));//判断内容是否相等(引用类型的话判断引用里面的内容是否相同，不在乎引用地址)


