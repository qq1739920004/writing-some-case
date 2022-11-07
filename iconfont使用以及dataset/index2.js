const m=new Map([['name','kl'],['age',19]])
const mp=new Proxy(m,{})
for(let i of mp){
  console.log(i);
}