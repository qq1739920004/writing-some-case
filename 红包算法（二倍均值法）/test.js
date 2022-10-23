let sum=0
let sum1=0
let err=0
let err1=0

for(let i=0;i<1000000;i++){
  let randomVal=Math.floor(Math.random()*100)+1
  randomVal= randomVal/100
  if(randomVal<=0.01){
    sum+=1
  }
  if(randomVal>=1){
    sum1+=1
  }
  if(randomVal<0.01){
    err+=1
  }
  if(randomVal>1){
    err1+=1
  }
}
console.log(sum);
console.log(sum1);
console.log(err);
console.log(err1);
