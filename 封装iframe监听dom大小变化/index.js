class ElementObserver{
  constructor(element){
    this.queue=[]
    this.el=element
    this.iframe=this.init()
  }
  //初始化iframe
  init() {
    this.el.style.positon='relative'
    let ifram=document.createElement('iframe')
    this.setStyle(ifram)
    this.el.appendChild(ifram)//一定要先挂载再绑定事件不然不会起效，所有元素都是如此
    this.bindEvent(ifram.contentWindow)//传iframe的windows对象绑定resize事件
    return ifram
  }
  //添加样式，使iframe影藏
  setStyle(iframe,styles){
    if(!iframe) return
    let style=styles||{
      opacity:0,
      'z-index':'-9999',
      postion:'absolute',
      left:0,
      top:0,
      width:'100%',
      height:'100%',
    }
    let stylesText=''
    for(let key in style){
      stylesText+=(`${key}:${style[key]};`)
    }
    iframe.style.cssText+=';'+stylesText
    return iframe
  }
  //给iframe绑定resize事件
  bindEvent(iframe){
    if(!iframe) return
    iframe.addEventListener('resize',()=>{
      console.log(333333);
      this.queue.forEach(fn=>{
        fn.apply(this,[event])
      })                              
    },false)
  }
  //添加改变大小后执行的事件
  pushCallback(fn){
    this.queue.push(fn)
  }
}