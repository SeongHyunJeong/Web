var canvas = null;
var context = null;

class GameObject {
  constructor(src) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.image = new Image();

    //vector=양과 방향, Scalor=양
    //() => ({} Arrow function
    this.image.addEventListener('load', () => {
      this.width = this.image.width;
      this.height = this.image.height;
    });
    this.image.src = src;
  }
}

class Ball extends GameObject { //볼로 기능을 확장
  constructor() {
    super('ball.png');//부모 클래스 생성자 맨 처음 호출 해야함

    this.speed = {x:0, y:-1};


  }
}

var clicked = false;
//var ball;

var gameObjectList = [];
var ballList = [];
var brickList = [];



function init() {
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');

  create('brick', 200, 50);
  create('ball', 240, 200);

  requestAnimationFrame(update);
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let o of gameObjectList) {
    context.drawImage(o.image, o.x, o.y);
  }



  for (let ball of ballList) {
    for (let brick of brickList) {
      if(brick.x + brick.width > ball.x &&
        brick.x < ball.x + ball.width &&
        brick.y + brick.height > ball.y &&
        brick.y < ball.y + ball.height
      ) {

         ball.x -=ball.speed.x;
         ball.y -=ball.speed.y;

        if(brick.y + brick.height > ball.y &&
        brick.y < ball.y + ball.height) {
          ball.speed.x *=-1;

        }else if(brick.x + brick.width > ball.x &&
          brick.x < ball.x + ball.width){
            ball.speed.y *=-1;
          }



      }
      if(clicked) {
        ball.x += ball.speed.x;
        ball.y += ball.speed.y;
      }

      if(ball.x<0 ||ball.x > canvas.width)
        ball.speed.x *= -1;
      else if(ball.y < 0)
        ball.speed.y *= -1;

    }
  }

  requestAnimationFrame(update);
}

function create(id, x, y) {
  let ret;

  switch (id) {
    case 'brick':
      ret = new GameObject('brick.png');
      brickList.push(ret);
      break;
    case 'ball':
      ret = new Ball();
      ballList.push(ret);
      break;
    default:
      return null;
  }

  ret.x = x;
  ret.y = y;
  gameObjectList.push(ret);

  return ret;
}

function onClick() {
  clicked = true;
}
window.addEventListener('click', onClick);
window.addEventListener('load', init);
