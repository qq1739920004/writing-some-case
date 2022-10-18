let num1='512213342534246123423'
let num2='12451232155123512'
let sum
sum=bigAddition(num1,num2)
console.log(sum);//512225793766401246935
/**
 * 
 * @param {string} n1 
 * @param {string} n2 
 * @return {number}
 */
function bigAddition(n1,n2){
  n1=n1+''
  n2=n2+''

  n1=n1.padStart(Math.max(n1.length,n2.length),'0')
  n2=n2.padStart(Math.max(n1.length,n2.length),'0')
  console.log(n1,n2);/*512213342534246123423 
                       000012451232155123512*/
  let temp=0,fatherTemp=0
  let res=[]
  for(let i=n1.length-1;i>=0;i--){
    temp= n1[i]*1+n2[i]*1+fatherTemp
    res.unshift((temp+'').at(-1))
    fatherTemp=((temp+'').length==2?1:0)
  }
  return res.join('')//512225793766401246935
}