function shuffle(num){
  let len=num.length
  for(let i=0;i<len;i++){
    const rd = random(i,len);
    [num[i],num[rd]]=[num[rd],num[i]];
  }
  return num
}
function random(i,j){
  return Math.floor(Math.random() * (j-i))+i
}

console.log(shuffle([1,2,3,4,5])); 


//验证洗牌算法的方法
function isverify(num,count=10000){
  let verifyRes=new Array(num.length).fill(0);
  while(count--){
    let res=shuffle(num)
    for(let i=0;i<res.length;i++){
      verifyRes[i]+=res[i]
    }
  }
  
  return verifyRes
}

console.log(isverify([1,2,3,4,5]));