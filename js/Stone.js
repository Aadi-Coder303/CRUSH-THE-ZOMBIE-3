class Stones
{
    constructor(x,y,r)
    {
        let options =
        {
            density : 5,
            isStatic : false
        }
        this.body = Matter.Bodies.circle(x,y,r);
        this.x = x;
        this.y = y;
        this.r = r +50;
        this.image = loadImage("./assets/stone.png");

        World.add(world,this.body);
    }

    show()
    {
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
       // ellipseMode(CENTER);
       // ellipse(0,0,this.r,this.r);
       imageMode(CENTER);
       image(this.image,this.x,this.y,this.r,this.r);
        pop();
    }

}