class YellowBird extends Bird{

constructor(x,y){
    var options = {
         'restitution':0.8,
         'friction':0.22,
         'density':0.5,
         'frictionAir':0.0000000000001
 }
super(x,y,options)
this.image=loadImage("sprites/yellow.png")



}







}
