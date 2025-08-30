const canvas = document.getElementById("canvas");
const ctx = canvas?.getContext("2d");

function make_base(v) {
  base_image = new Image();
  base_image.src = "./assets/bird.jpg";
  base_image.onload = function () {
    ctx.drawImage(base_image, 10, v, 100, 100);
  };
}

function createHurdles(left,top) {
  ctx.beginPath();
  ctx.rect(left, top, 100, 250);
  ctx.fill();
}


function gameEnded(birdTop,towerPosition){
    if((birdTop<250 && towerPosition<110 && towerPosition>-50) || (birdTop+100>450 && towerPosition<110 && towerPosition>-50)){
        return true;
    }
    return false;
}

//using formulat : x = x1 + vt , v = v1+at, a = 9.8 as acceleration will be due to gravity but it felt slow so pubtting it as 80
const main = async () => {
  let v = 0;
  let a = 80;
  let t = 0.0166;
  let initialVelocity = 0;


  const combinedTowerHeight = 500;

  document.onkeydown = () => {
    console.log("pressed");
    initialVelocity = -100;
  };

  let l= 1000; 
  let userLost = false;
  for (let i = 0; i < 100000; i++) {
    initialVelocity = initialVelocity + a * t;
    v = v + initialVelocity * t;
    ctx.clearRect(0, 0, 1000, 700);
    make_base(v);
    createHurdles(l-10,0);
    createHurdles(l-10,450);
    l=l-1;
    if(l<=-100){
        l=1000;
    }
    if(gameEnded(v, l)){
        userLost = true;
        break;
    }
    await new Promise((r) => setTimeout(r, 0.01666666 * 1000));
  }

  if(userLost){
    alert("noob you lost");
    return;
  }

  alert("Wow You won")
};
main(); 

