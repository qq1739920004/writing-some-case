/**
 剩余红包金额为M，剩余人数为N，那么有如下公式：
 每次抢到的金额 = 随机区间 （0， M / N X 2)
 */
function average(sum,size){
  sum=sum*100
  let temp=sum
  let res=[]
  while(size){
    let maxVal=sum/ size * 2
    let randomVal=size==1?sum:Math.floor(Math.random()*maxVal)+1
    res.push(randomVal/100)
    sum-=randomVal
    size--
  }
  return res
}
let res=average(100,10)
console.log(res);
console.log(res.length);
let sum= res.reduce((previous, current) => {
  return previous+current
}, 0)
console.log(sum);
