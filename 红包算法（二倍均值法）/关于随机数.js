let map=new Map()
for(let i=0;i<10000;i++){
  let res= Math.floor(Math.random()*5)+1//选取1-5
  map.has(res)?map.set(res,map.get(res)+1):map.set(res,1)
}
console.log(map);

let map2=new Map()
for(let i=0;i<10000;i++){
  let res= Math.floor(Math.random()*6)//选取0-5
  map2.has(res)?map2.set(res,map2.get(res)+1):map2.set(res,1)
}
console.log(map2);