const content=document.querySelector('.content')
let imgArr=['./img/1.png','./img/2.png','./img/3.png','./img/4.png','./img/5.png','./img/6.png','./img/7.png','./img/8.png','./img/9.png','./img/10.png','./img/11.png','./img/12.png','./img/13.png','./img/14.png','./img/15.png','./img/16.png','./img/17.png','./img/18.png']

window.onresize=function(){
  onloadChang()
}
createDOM(imgArr).then((res)=>{
  onloadChang()
const img=document.querySelectorAll('img')
  console.log(img[0].clientHeight);
})


async function onloadChang(){
const number=Math.floor((document.body.clientWidth+130)/300)
const interval=300
let topArr=new Array(number).fill(0)
const img=document.querySelectorAll('img')
  for(let i=0;i<imgArr.length;i++){
      let height = img[i].offsetHeight; //图片的高度
      if(i>=number){
        let minNumber=undefined,minIndex=undefined
        topArr.forEach((item,index)=>{
          if(minNumber==undefined || minNumber>item){
            minNumber=item
            minIndex=index
          }
        })
        img[i].style.top=`${minNumber}px`
        topArr[minIndex]+=(height+20)
        img[i].style.left=`${minIndex*interval}px`
      }
      else{
        img[i].style.top=0
        img[i].style.left=`${i%number*interval}px`
        topArr[i]+=(img[i].offsetHeight+20)
      }
  }
}

function createDOM(imgArr){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<imgArr.length;i++){
      const img=document.createElement('img')
      img.src=imgArr[i]
      content.appendChild(img)
      img.addEventListener('load',()=>{
        resolve()
      })
    }
  })
}


