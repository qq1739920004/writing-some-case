  class FlipDom {
    /**
     * 
     * @param {Array} dom //一个dom列表
     * @param {number} duration //动画执行的时间 
     */
    constructor(dom, duration = 0.5) {
      this.dom = dom;
      //加个s
      this.transition =
        typeof duration === 'number' ? `${duration}s` : duration;
      //先定义一个记录坐标的对象
      this.firstPosition = {
        x: null,
        y: null,
      };
      this.isPlaying = false;
      // transtion执行完后的回调函数
      this.transitionEndHandler = () => {
        this.isPlaying = false;
        this.recordFirst();
      };
    }
    //获取位置的函数
    getDomPosition() {
      const rect = this.dom.getBoundingClientRect();//获取此元素的坐标对象，能查看元素在浏览器可视部分的位置
      return {
        x: rect.left,
        y: rect.top,
      };
    }
    //给当前对象元素位置属性赋值
    recordFirst(firstPosition) {
      if (!firstPosition) {
        firstPosition = this.getDomPosition();
      }
      // 给当前元素坐标赋值
      this.firstPosition.x = firstPosition.x;
      this.firstPosition.y = firstPosition.y;
    }
    //迭代器函数第一步是让变化后的元素用translate恢复没变化之前，顺便加上transtion动画时间，第二步就是把translate删除，自然就触发了
    *play() {
      if (!this.isPlaying) {
        this.dom.style.transition = 'none';
        //获取当前改变后的元素坐标
        const lastPosition = this.getDomPosition();
        //计算出与原位置的差别
        const dis = {
          x: lastPosition.x - this.firstPosition.x,
          y: lastPosition.y - this.firstPosition.y,
        };
        //把位置没变的跳过
        if (!dis.x && !dis.y) {
          return;
        }
        //用差值把改变位置后的元素恢复到位置没变之前
        this.dom.style.transform = `translate(${-dis.x}px, ${-dis.y}px)`;
      
        yield 'moveToFirst';
        this.isPlaying = true;
      }
      // 赋值transition动画的时间
      this.dom.style.transition = this.transition;
      //先给个none
      this.dom.style.transform = `none`;
      
      this.dom.removeEventListener('transitionend', this.transitionEndHandler);
      this.dom.addEventListener('transitionend', this.transitionEndHandler);
    }
  }

  class Flip {
    constructor(doms, duration = 0.5) {
      this.flipDoms = [...doms].map((it) => new FlipDom(it, duration));
      this.flipDoms = new Set(this.flipDoms);
      this.duration = duration;
      this.flipDoms.forEach((it) => it.recordFirst());
    }

    addDom(dom, firstPosition) {
      const flipDom = new FlipDom(dom, this.duration);
      this.flipDoms.add(flipDom);
      flipDom.recordFirst(firstPosition);
    }

    play() {
      let t1=new Date().getTime()
      let gs = [...this.flipDoms]
        .map((it) => {
          const generator = it.play();
          return {
            generator,
            iteratorResult: generator.next(),
          };
        })
        .filter((g) => !g.iteratorResult.done);
      while (gs.length > 0) {
        /**
         * 用于触发浏览器更新
         * 现代的浏览器都是很聪明的，由于每次重排都会造成额外的计算消耗，
         * 因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。
         * 浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，
         * 才清空队列。但是！当你获取布局信息的操作的时候，会强制队列刷新
         */
        let t2=new Date().getTime()
        console.log(t1);
        console.log(t2);
        console.log('执行代码的间隔: '+(t2-t1));
        console.log('执行代码的间隔没有超过16.7ms所以需要clientWidth来触发浏览器画面渲染')

        document.body.clientWidth;
        gs = gs
          .map((g) => {
            g.iteratorResult = g.generator.next();
            return g;
          })
          .filter((g) => !g.iteratorResult.done);
      }
    }
  }

