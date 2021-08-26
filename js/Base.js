class Base
{
    constructor(x, y, w,h,fill) 
  {
    let options = {
     isStatic:true
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.color = fill
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    //fill(color);
    rect(pos.x,pos.y, this.w, this.h);
    pop();
  }
}