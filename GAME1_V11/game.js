let frame = 1;
let walkingUp = false;
let walkingDown = false;
let walkingLeft = false;
let walkingRight = false;
let coinCount = 1;
let healthCount = 100;
let healthPotionCount = 1;
let manaCount = 100;
let manaPotionCount = 1;
let movementSpeed = 5;
let healthWidth;
let animationInterval, walkingIntervalUp, walkingIntervalDown, walkingIntervalRight, walkingIntervalLeft;
let width = window.innerWidth-50;
let height = window.innerHeight-50;
let positionX = 500;
let positionY = 300;
let collisionDown = false;
let collisionUp = false;
let collisionLeft = false;
let collisionRight = false;
let houseUp = false;
let houseLeft=false;
let sprinting = false;
let justSprinted = false;
let manaWidth,healthDown,alreadyShooting;
let sprintingTrig = false;
let sprintTimeout = false;
let sprintInterval = false;
let mana_frame = 1;
let houseBounds = document.getElementById('house-south-container').getBoundingClientRect()
let mouseX,mouseY;
let projectileSpeed = 15;
let zombieCooldown = 1000;
let zombieID = -1;
let bulletID = -1;
let bullets = {};
let bulletIntervals = {};
let bossBullets = {};
let bossBulletIntervals = {};
let bossBulletID = -1;
let startedBullets = [];
let shootingCooldown = 80;
let zombies = {};
let zombieIntervals = [];
let collidedZombies = {};
let coinObject = {};
let coinIntervals = [];
let draining = false;
let diedVar = false;
let bulletNum = 50;
let movedUp,movedDown,movedLeft,movedRight;
let zombieSpeed = 1;
let zombieLimit = 5;
let round = 1;
let zombieKilled = 0;
let zombieSpawned = 0;
let itemz = 'bullet';
let tradeopen;
let wallID = -1;
let walls = {};
let zombieCollided,placed = false;
let wallCount = 1000;
let start = false;
let removeShoot = true;
let Btime = 16;
let wallgrid = 60;
let wallgridY = 15;
let bossRounds = 5;
let bossKilled = false;
let priceIncrement = 0;
let bossHealth = 2500;
let zombieProjectiles = {};
let zombieProjectilesIntervals = {};
let zombieSpeedRate = 0.25;
let zombieCooldownRate = 25;
let zombieBulletSpeed = 5;
let zombieBulletCooldown = 2500;
let buffedZombieSpawnChance = 0.05;
let miniBossLimit = 3;
let miniBosses = 0;
let gamePaused = false;
let gameStarted = false;
let gameDifficulty;
let turretGridX = 100;
let turretGridY = 35;
let turrets = {};
let turretID = -1;
let turretProjectiles = {};
let turretProjectilesID = 0;
let turretCooldown = 100;
let dumbZombieSpawnRate = 0.05;
//bobs or vagana which ever will it be sit the fuck down t-series im here to spill the real tea you tryna get through me for spot of number 1 but you india you lose so they think you never won when im thru with you your gonna be completely fucking done else we only just begun i rate you 0 by bitch gone so come on t series looking hungry for some drama here let me serve you bitch lasagna

function startGameLoop(difficulty){
  gameDifficulty = difficulty;
document.getElementById('difficulty').style.display=`none`;
document.getElementById('overworld').style.display=`flex`
gameLoop()
gameStarted = true;
if(difficulty === 'Insane'){
  zombieSpeedRate = 1;
  zombieCooldownRate = 50;
  zombieCooldown -= 10;
  zombieBulletSpeed = 10;
  zombieBulletCooldown = 1000;
  priceIncrement = 2;
  bossHealth = 5000;
  bossRounds = 3;
  zombieSpeed = 4;
  zombieLimit = 10;
  bulletNum = 20;
  shootingCooldown = 150;
  coinCount = 0;
  manaPotionCount = 0;
  healthPotionCount = 0;
  buffedZombieSpawnChance = 0.25;
  miniBossLimit = 10;
  dumbZombieSpawnRate = 0;
}
if(difficulty === 'Hard'){
  zombieSpeedRate = 0.75;
  zombieCooldownRate = 40;
  zombieCooldown -= 5;
  zombieBulletSpeed = 7;
  zombieBulletCooldown = 2000;
  priceIncrement = 1;
  bossHealth = 4000;
  bossRounds = 4;
  zombieSpeed = 3;
  zombieLimit = 5;
  bulletNum = 30;
  shootingCooldown = 100;
  coinCount = 0;
  manaPotionCount = 0;
  healthPotionCount = 0;
  buffedZombieSpawnChance = 0.1;
  miniBossLimit = 5;
  dumbZombieSpawnRate = 0.01;
}
if(difficulty === 'Normal'){
  zombieSpeedRate = 0.5;
  zombieCooldownRate = 30;
  zombieBulletSpeed = 5;
  zombieBulletCooldown = 1500;
  priceIncrement = 0;
  bossHealth = 3000;
  bossRounds = 5;
  zombieSpeed = 2.5;
  zombieLimit = 5;
  bulletNum = 40;
  shootingCooldown = 80;
  miniBossLimit = 3;
  dumbZombieSpawnRate = 0.05;
}
tradeSwitch('mana');
tradeSwitch('health');
tradeSwitch('wall');
tradeSwitch('bullet');
document.getElementById('coin-count').innerHTML = `${coinCount}`;
document.getElementById('mana-cube-count').innerHTML = `${manaPotionCount}`;
document.getElementById('health-potion-count').innerHTML = `${healthPotionCount}`
document.getElementById('bullet-count').innerHTML = `${bulletNum}`
}
function gameLoop() {

spawnZombie();

}



function updateCharacter() {
  if (walkingUp && positionY > 0 && !collisionUp && !houseUp && !gamePaused) {
    positionY -= movementSpeed;
    
  }
  if (walkingDown && positionY < height && !healthDown && !collisionDown && !gamePaused) {
    positionY += movementSpeed;
    
   // console.log(positionY>height-health_bounds.height-50)
  }
  if (walkingLeft && positionX > -45 && !collisionLeft && !houseLeft && !gamePaused) {
    positionX -= movementSpeed;
    
  }
  if (walkingRight && positionX < width && !collisionRight && !gamePaused) {
    positionX += movementSpeed;
  } 
  anime({
    targets:`#character`,
    top: `${positionY}px`,
    left: `${positionX}px`,
    duration:16
  })

  detectCollision(positionX,positionY,health_bounds)
  detectCollision(positionX,positionY,houseBounds)
  houseCollision()
  

  requestAnimationFrame(updateCharacter);
}
function animateCharacter(cum){

  if(walkingUp && !walkingLeft && !walkingRight && !gamePaused){

    
    document.getElementById('character').src = `walking_frames/walk_frame${frame}.png`;
     
      frame++
      if (frame === 5) {frame = 1;}
  }
  if(walkingDown && !walkingLeft &&  !walkingRight && !gamePaused){

   
    document.getElementById('character').src = `walking_frames/walk_frame${frame}.png`;
    movedDown = true;movedLeft=false;movedRight=false;movedUp=false;
    frame++;
    if (frame === 5) {frame = 1;}
  }
  
  if(walkingLeft && !gamePaused){

    
    document.getElementById('character').src = `walking_frames/walk3_frame${frame}.png`;
    movedLeft = true;movedUp=false;movedRight=false;movedDown=false;
    frame++;
    if (frame === 5) {frame = 1;}
  }
  if(walkingRight && !gamePaused){

    
    document.getElementById('character').src = `walking_frames/walk2_frame${frame}.png`;
    movedRight = true;movedLeft=false;movedUp=false;movedDown=false;
    frame++;
    if (frame === 5) {frame = 1;}
  }
  setTimeout(function() {
    requestAnimationFrame(animateCharacter)
}, 100);
}
requestAnimationFrame(updateCharacter);
requestAnimationFrame(animateCharacter);
document.addEventListener('keydown', function (event) {
  if (event.key.toLowerCase() === 'w') {walkingUp = true;
    if(!walkingLeft || !walkingRight){
      movedUp = true;movedLeft=false;movedRight=false;movedDown=false;
      if(!gamePaused)
      document.getElementById('character').src = `walking_frames/walk_frame1.png`}
    }
  if (event.key.toLowerCase() === 's') {walkingDown = true;
    if(!walkingLeft || !walkingRight){
    movedUp = false;movedLeft=false;movedRight=false;movedDown=true;
    if(!gamePaused)
    document.getElementById('character').src = `walking_frames/walk_frame1.png`}
  }
  if (event.key.toLowerCase() === 'a') {walkingLeft = true; movedUp = false;movedLeft=true;movedRight=false;
  movedDown=false;
  if(!gamePaused)
  document.getElementById('character').src = `walking_frames/walk3_frame${frame}.png`;}
  if (event.key.toLowerCase() === 'd') {walkingRight = true; movedUp = false;movedLeft=false;movedRight=true;movedDown=false;
    if(!gamePaused)
    document.getElementById('character').src = `walking_frames/walk2_frame${frame}.png`;}
  if (event.key.toLowerCase() === 'q' && !shot){shootProjectile();shot=true;setTimeout(()=>{shot=false},shootingCooldown)}
  if(event.key === ' '){sprinting_fx()}
  if (event.key === '`') {
    if(!gayed){
      gayed = true;
    gamePaused = !gamePaused;
    setTimeout(()=>{
      gayed = false
    },300)
    pause();}
  }
});
let shot = false;
let gayed = false;
document.addEventListener('keyup', function (event) {
  if (event.key.toLowerCase() === 'w') {walkingUp = false;frameOne('up');/*movedUp=true;movedDown=false;movedLeft=false;movedRight=false*/ }
  if (event.key.toLowerCase() === 's') {walkingDown = false;frameOne('down');}
  if (event.key.toLowerCase() === 'a') {walkingLeft = false;frameOne('left');}
  if (event.key.toLowerCase() === 'd') {walkingRight = false;frameOne('right')}
  if(event.key === ' '){
    stopSprinting();
  }
let pressed = false;
document.addEventListener('keypress', function(event){
  if(event.key){pressed = true; setTimeout(()=>{pressed = false},250)}
  if(event.key.toLowerCase() === 't'){tradePopUp()}
  if(event.key.toLowerCase() === 'e'){addHealth()}
  if(event.key.toLowerCase() === 'r'){addMana()}
  if(event.key === 'Enter'){if(tradeopen){trade(`${itemz}`)};console.log(itemz)}
  if(event.key.toLowerCase() === 'c'){place_wall()}
})
});
document.getElementById('mana-cube-health').addEventListener('mouseover', function(event){
  document.getElementById('mana-hover-id').style.display="inline-block";
  document.getElementById('mana-hover-id').style.position = `fixed`;
  document.getElementById('mana-hover-id').style.top = '450px'
})
document.getElementById('mana-cube-health').addEventListener('mouseleave', function(event){
  document.getElementById('mana-hover-id').style.display="none";

})
document.getElementById('')
let coin_frame = 1;



setInterval(function(){
  if(!gamePaused){
  document.querySelector('.coin').src=`object_frames/coin_frame${coin_frame}.png`
  coin_frame ++;
  if(coin_frame===7){coin_frame = 1}}
},250)
/* setInterval(function(){
  document.querySelector('.mana-cube').src=`object_frames/mana_frame${mana_frame}.png`
  mana_frame ++;
  if(mana_frame===3){mana_frame = 1}
},500)*/

function pause(a){
  if(a === 'hehe'){gamePaused = !gamePaused}
  if(!gameStarted){return}
  if(gamePaused){
  document.getElementById('game-paused-container').style.display = `flex`;
  document.getElementById('game-info').innerHTML=
  `
  <span style="font-size:22px">Difficulty: ${gameDifficulty}</span>
  <br>
  <span style="font-size:22px;margin-left:30px">Round: ${round}</span>`
}
  if(!gamePaused){
    frameOne('up');
    document.getElementById('game-paused-container').style.display = `none`;
    if(zombieSpawned<zombieLimit && !aged && !newRound){aged = true;setTimeout(()=>{
      aged=false;
      spawnZombie();
    }),zombieCooldown}
  }
}
let aged = false;
function frameOne(movement){
  if(movement === 'up' && movement==='down' && !gamePaused){
    frame=1;
    document.getElementById('character').src = `walking_frames/walk_frame${frame}.png`;}
  if(movement === 'left' && !gamePaused){
    frame=1;
    document.getElementById('character').src = `walking_frames/walk3_frame${frame}.png`;}
  if(movement === 'right' && !gamePaused){
    frame=1;
    document.getElementById('character').src = `walking_frames/walk2_frame${frame}.png`;}
}

let health_bounds =  document.getElementById('player_health').getBoundingClientRect()
if(detectCollision(positionX,positionY,health_bounds)){
  
  collisionDown = true;
}
function detectCollision(x,y,obj){
  if(y>height-obj.top-95){
    healthDown = true  
  }else{
    healthDown = false}
  
}
function sprinting_fx(){
  if(!sprinting && manaCount>0 && !sprintingTrig && !sprintTimeout && !gamePaused){
    if(walkingUp || walkingDown || walkingRight || walkingLeft){
    movementSpeed += 10;
    sprinting = true;
    manaCount -= 5;
    document.getElementById('mana-bar').innerHTML = `MANA:${manaCount}`
    sprintingTrig = true;
    manaWidth = (manaCount/100)*400;
    document.getElementById('mana-bar').style.width = `${manaWidth}px`;
    console.log(manaCount)
    
    if(manaCount === 0){
      //walkingUp = false; walkingDown = false; walkingLeft = false; walkingRight = false;
    }
    setTimeout(function() {
      stopSprinting();
    }, 150);
    
  }}
}
function stopSprinting(){
  if(sprinting){
    sprinting = false;
    movementSpeed = 5;
  setTimeout(function(){sprintingTrig = false;sprintTimeout = false},750)}
}
function houseCollision(){
  if(positionY <= 225 && positionX<260){
    houseUp = true;
  } else{houseUp = false}
  if(positionY<225 && positionX === 260){
    houseLeft = true;
  }else{
    houseLeft = false;
  }

  /*if(positionY>=160 || positionX<=280 || positionY< 245){
    collisionDown = true;
  } else{collisionDown = false}
  if(positionX<=280 && positionY<= 245 && positionY>=160){
    collisionLeft = true;
  }else{collisionLeft = false}*/
}/*
function showEnterHouse(){
  document.getElementById('enter-house').style=""
}      
function houseNo(){
  document.getElementById('enter-house').style.display="none"
}
function houseYes(){
  document.getElementById('overworld').style.display="none"
  document.getElementById('loading-screen-house').style="";
  document.getElementById('world').style.backgroundImage="none"
  setTimeout(function(){
    document.getElementById('dots').innerHTML = '';
  },300)
  setTimeout(function(){
    document.getElementById('dots').innerHTML = '.';
  },600)
  setTimeout(function(){
    document.getElementById('dots').innerHTML = '. .';
  },900)
  setTimeout(function(){
    document.getElementById('dots').innerHTML = '. . .';
  },1200)
  setTimeout(function(){
    document.getElementById('dots').innerHTML = '';
    document.getElementById('loading-screen-house').style.display="none";
    document.getElementById('enter-house').style.display="none";
    document.getElementById('overworld').style='';
    document.getElementById('world').style.backgroundImage="url(grass.png)"
  },1300)
}*/
document.addEventListener('mousemove',function(event){
  mouseX = event.clientX;
  mouseY = event.clientY;
})
function shootProjectile(){
  if(gamePaused){return}
  if(!alreadyShooting && bulletNum>0 && removeShoot){
    alreadyShooting = true;
    bulletID ++
  document.getElementById('overworld').innerHTML += `<img src="object_frames/bullet.png" class="bullet" id="B${bulletID}" style>`
  let velocityY,velocityX,projectilePOSY,projectilePOSX,rotation;
  projectilePOSY = positionY + (96/2);
  projectilePOSX = positionX + (96/2);
  if(movedUp){
    velocityY = -1*projectileSpeed;
    velocityX = 0;
    rotation=270;
  } else if(movedDown){
    velocityY = projectileSpeed;
    velocityX = 0;
    rotation=90;
  } else if(movedLeft){
    velocityY = 0;
    velocityX = -1*projectileSpeed;
    rotation=180;
  } else{
    velocityY = 0;
    velocityX = projectileSpeed;
    rotation=0;
  }
  
  document.getElementById(`B${bulletID}`).style.transform=`rotate(${rotation}deg)`
  bulletNum --;
  document.getElementById('bullet-count').innerHTML = `${bulletNum}`
  bullets[bulletID] = [projectilePOSX,projectilePOSY,velocityY,velocityX,bulletID,-1,false,'',false,rotation];
  bulletIntervals[bulletID] =
    function bulletInterval(){
      let time = 16;
      let posX = bullets[bulletID][0];
      let posY = bullets[bulletID][1];
      let vY = bullets[bulletID][2];
      let vX = bullets[bulletID][3];
      let ID = bullets[bulletID][4];
      let zID = bullets[bulletID][4];
      if(!bullets[ID][8]){
        bullets[ID][8] = true
        if(anime.running[ID]){anime.remove(`#B${ID}`)}
            anime({
              targets: `#B${ID}`,
              top: `${bullets[ID][1]}px`,
              left: `${bullets[ID][0]}px`,
              duration: 20,
              loop:true,
              update: ()=>{
                if(bullets[ID] !== undefined && bullets[ID] !== null && !gamePaused){
                  bullets[ID][0] += bullets[ID][3];
                  bullets[ID][1] += bullets[ID][2];
                  anime.set(`#B${ID}`, {
                    top: `${bullets[ID][1]}px`,
                    left: `${bullets[ID][0]}px`,
                  });
                  if(bullets[ID][0]>2000 || bullets[ID][1]>1000 || bullets[ID][0]<-50 || bullets[ID][1]<-50){
                    anime.remove(`#B${ID}`);
                    if(document.getElementById(`B${ID}`)){
                    document.getElementById('overworld').removeChild(document.getElementById(`B${ID}`))
                    }
                   };
              }
            }
            })
//            document.getElementById(`B${ID}`).style.top = `${bullets[ID][1]}px`;
//            document.getElementById(`B${ID}`).style.left = `${bullets[ID][0]}px`;         
             setTimeout(()=>{
              if(bullets[ID]){
                anime.remove(`#B${ID}`);
              if(document.getElementById(`B${ID}`)){
                document.getElementById('overworld').removeChild(document.getElementById(`B${ID}`))
                }
              }
             },4500)
            
       }
     }
  
  moveBullet();
  setTimeout(function(){
    alreadyShooting = false
  },shootingCooldown)
  /*let asshole = setInterval(function(){
    projectilePOSX+=velocityX
    projectilePOSY+=velocityY
    document.getElementById(`B${bulletID}`).style.top = `${projectilePOSY}px`;
    document.getElementById(`B${bulletID}`).style.left = `${projectilePOSX}px`;
    console.log(projectilePOSX)
    if(projectilePOSX>2000 || projectilePOSY>1000 || projectilePOSX<-50 || projectilePOSY<-50){
    
      clearInterval(asshole)
      alreadyShooting = false;
    
  }
  },1)*/
  
}
}
function clearAnime(bID){
  console.log(anime.running)
  anime.remove(`#B${bID}`)
  console.log(anime.running)
}
let ads = false;


let zombieResettingInterval;
let zombieResetting = false;
let zombieSpawning = false;
function spawnZombie(){
if(zombieSpawned<zombieLimit && !gamePaused){
  zombieSpawned ++;
  setTimeout(function(){
let zombieX = width + 100;
zombieID ++;
let zombieY = (Math.random())*750
if (zombieY>460){zombieY = (Math.random())*460}
let sperm = 64;
if(round % bossRounds === 0){sperm = 128; zombieSpawned = zombieLimit}
document.getElementById('overworld').innerHTML += `<img src="object_frames/zombie.png" class="zombies" id="Z${zombieID}" width="${sperm}px">`
if(round % bossRounds === 0){document.getElementById(`Z${zombieID}`).src = `object_frames/zombie3.png`}
document.getElementById(`Z${zombieID}`).style.top = `${zombieY}px`
document.getElementById(`Z${zombieID}`).style.left= `${zombieX}px`
let z_velocityX = Math.random()
let z_velocityY = Math.random()
let vectorX = zombieX - positionX;
let vectorY = zombieY - positionY;
let zHealth = 100;
let zState = 'normal';
let currentID = zombieID
zombies[zombieID] = [zombieX,zombieY,zombieID,z_velocityX,z_velocityY,false,Math.random()*1000,32,vectorX,'',vectorY,'',zHealth,Math.random(),Math.random(),false,'','',zombieSpeed,zState,'',false,zHealth];
if(Math.random()<buffedZombieSpawnChance && zombieID !== 1  && miniBosses<miniBossLimit && round %bossRounds !== 0 && round>1){
  console.log('hey')
  miniBosses ++;
  zombies[currentID][21] = true;
  zombies[currentID][20] = setTimeout(() => {
    document.getElementById(`Z${currentID}`).src=`object_frames/zombie2.png`;
    zombieBullet(currentID);
    document.getElementById(`Z${currentID}`).style.width = `85px`;
    zombies[currentID][12] = 300;
    zombies[currentID][22] = 300;
  }, zombieBulletCooldown);
}
else if(Math.random()<dumbZombieSpawnRate && zombieID !== 1 && round %bossRounds !== 0 && round>1){
  zombies[currentID][20] = setTimeout(() => {
    console.log('lol')
    document.getElementById(`Z${currentID}`).src=`object_frames/zombie4.png`;
    document.getElementById(`Z${currentID}`).style.width = `48px`;
    zombies[currentID][12] = 50;
    zombies[currentID][22] = 50;
    zombies[currentID][18] = zombies[currentID][18]*3;
  },1);
}
if(round % bossRounds=== 0){zombies[zombieID][18] = zombies[zombieID][18]*1.25; zombies[zombieID][12] = bossHealth;
  zombies[zombieID][22] = bossHealth;
}
while (zombies[zombieID][6]<250 || zombies[zombieID][6]>750){zombies[zombieID][6]=Math.random()*1000}
zombieIntervals.push(
  function zombieInterval(){
    let zTime = zombies[zombieID][7];
    let zID = zombies[zombieID][2];
    let zInterval = zombies[zombieID][6];
      anime({
        targets: `#Z${zID}`,
        top: `${zombies[zID][1]}px`,
        left: `${zombies[zID][0]}px`,
        loop: true,
        duration: 32,
        update: ()=>{
          if(!gamePaused){
            if(round % bossRounds === 0){
              setInterval(()=>{
                if(Math.random()<0.1)
                spawnBossBullet(zombieID);
              },100)
            }
          if(zombies[zID] !== undefined){
          if(zombies[zID][1]>455){zombies[zID][4]=-1; };if(zombies[zID][1]<0){zombies[zID][4]=1};
          if(zombies[zID][0]>1300){zombies[zID][3]=-1; };if(zombies[zID][1]<0){zombies[zID][3]=1};
          zombies[zID][8] = zombies[zID][0] - positionX;
          zombies[zID][10] = zombies[zID][1] - positionY;
          zombies[zID][11] = Math.atan2(zombies[zID][10],zombies[zID][8]);
          if(Math.random()<0.5){zombies[zID][13] = Math.random()}else{zombies[zID][13] = -1*Math.random()}
          if(Math.random()>0.5){zombies[zID][14] = Math.random()}else{zombies[zID][14] = -1*Math.random()}
          zombies[zID][3] = -1*(zombies[zID][18]*Math.cos(zombies[zID][11])+zombies[zID][13]);
          zombies[zID][4] = -1*(zombies[zID][18]*Math.sin(zombies[zID][11])+zombies[zID][14]);
          zombies[zID][0] += zombies[zID][3];
          zombies[zID][1] += zombies[zID][4];
          anime.set(`#Z${zID}`,{
            top: `${zombies[zID][1]}px`,
            left: `${zombies[zID][0]}px`
          })
          document.getElementById(`Z${zID}`).style.top = `${zombies[zID][1]}px`
          document.getElementById(`Z${zID}`).style.left = `${zombies[zID][0]}px`
    if(!zombies[zID][5]){ass();zombies[zID][5] = true}
          function ass (){
            if(!zombies[zID][5]){
          setTimeout(function(){
            if(zombies[zID])
            zombies[zID][5] = false
            },zInterval)}
        }}
       }
        }
      })
     
     
     setInterval(function(){
    },zTime)
  }
)

moveZombie();
spawnZombie();
},zombieCooldown)}
}

function zombieBullet(zID){
   
if(!zombieProjectiles[zID] && !gamePaused && zombies[zID]){
  document.getElementById(`Z${zID}`).src=`object_frames/zombie2.png`;
  document.getElementById(`Z${zID}`).style.width = `85px`;
let X = zombies[zID][0];
let Y = zombies[zID][1];
let zX,zY;
zombieProjectiles[zID] = [X,Y,zX,zY,false];
document.getElementById('overworld').innerHTML += `<img src="object_frames/bullet.png" id="zB${zID}" class="bullet">`;
document.getElementById(`zB${zID}`).style.position = `fixed`;
setInterval(()=>{
  zombieBullet(zID)
},zombieBulletCooldown)
zombieProjectilesIntervals[zID] = setInterval(()=>{moveZombieBullet(zID)},20)}
}
function moveZombieBullet(zID){
if(!gamePaused){
if(Math.random()<=0.5)
  {zombieProjectiles[zID][0]+=(Math.random())}
    else{zombieProjectiles[zID][0]-=(Math.random())}
if(Math.random()<=0.5)
  {zombieProjectiles[zID][1]+=(Math.random())}
    else{zombieProjectiles[zID][1]-=(Math.random())}    
let dx = positionX+(96/2) - zombieProjectiles[zID][0];
  let dy = positionY+(96/2) - zombieProjectiles[zID][1];
  let bearing = Math.atan2(dy,dx);
  let vX = zombieProjectiles[zID][2];
  let vY = zombieProjectiles[zID][3];
  let x = zombieProjectiles[zID][0];
  let y = zombieProjectiles[zID][1];
  zombieProjectiles[zID][2] = zombieBulletSpeed*(Math.cos(bearing));
  zombieProjectiles[zID][3] = zombieBulletSpeed*(Math.sin(bearing));
  zombieProjectiles[zID][0] += zombieProjectiles[zID][2];
  zombieProjectiles[zID][1] += zombieProjectiles[zID][3];
  let rotation = bearing*(180/Math.PI)
  document.getElementById(`zB${zID}`).style.left = `${zombieProjectiles[zID][0]}px`;
  document.getElementById(`zB${zID}`).style.top = `${zombieProjectiles[zID][1]}px`;
  document.getElementById(`zB${zID}`).style.transform = `rotate(${rotation}deg)`
}}
function checkZombieBulletCharCollision(){
  if(!gamePaused){
Object.keys(zombieProjectiles).forEach((zID)=>{
  let bX = zombieProjectiles[zID][0];
  let bY = zombieProjectiles[zID][1];
  let dx = Math.abs(positionX+(96/2) - bX);
  let dy = Math.abs(positionY+(96/2) - bY);
  if(dx<40 && dy<40 && !zombieProjectiles[zID][5]){
    zombieProjectiles[zID][5] = true;
    
  clearInterval(zombieProjectilesIntervals[zID]);
  delete zombieProjectiles[zID];
  delete zombieProjectilesIntervals[zID];
  if(!BBDraining){
  healthCount -= 5;BBDraining = true}
  document.getElementById('character').style.opacity = `0.5`;
  document.getElementById('health-bar').style.width = `${(healthCount/100)*400}px`;
  document.getElementById('health-bar').innerHTML = `HP: ${healthCount}`;
  console.log(`Collision detected between Player and zombie projectile ${zID}`);
  if(document.getElementById(`zB${zID}`)){
  document.getElementById('overworld').removeChild(document.getElementById(`zB${zID}`))};
    setTimeout(()=>{
      document.getElementById('character').style.opacity = `1`;
    },50)
    setTimeout(()=>{
      BBDraining = false;
    },25)
  }
    })

}}
setInterval(()=>{checkZombieBulletCharCollision()},50)
function spawnBossBullet(zID){
while(bossBulletID<7 && !bossKilled && !gamePaused){
if(bossBulletID<7 && round % bossRounds ===0 && !gamePaused){
bossBulletID ++;
let bpX = zombies[zID][0]+64;
let bpY = zombies[zID][1]+64;
let angles = [0,Math.PI/4,Math.PI/2,(3*Math.PI)/4,Math.PI,(5/4)*Math.PI,(3/2)*Math.PI,(7/4)*Math.PI,2*Math.PI];
let angleChosen,vbpX,vbpY;
angleChosen = angles[bossBulletID];
document.getElementById('overworld').innerHTML += `<img src="object_frames/bullet.png" id="BB${bossBulletID}" class="bullet">`;
document.getElementById(`BB${bossBulletID}`).style.left = `${bpX}px`;
document.getElementById(`BB${bossBulletID}`).style.top = `${bpY}px`;
document.getElementById(`BB${bossBulletID}`).style.transform = `rotate(${angleChosen*(180/Math.PI)}deg)`
bossBullets[bossBulletID] = [bpX,bpY,vbpX,vbpY,angleChosen,false];
bossBullets[bossBulletID][2] = 15*Math.cos(bossBullets[bossBulletID][4]);
bossBullets[bossBulletID][3] = 15*Math.sin(bossBullets[bossBulletID][4]);
let BBID = bossBulletID;
bossBulletIntervals[bossBulletID] = setInterval(()=>{movebbb(BBID)},20)
}}
}
function clearBB(){
setInterval(()=>{
  if(!gamePaused){
  Object.keys(bossBulletIntervals).forEach((bossBulletName)=>{
    clearInterval(bossBulletIntervals[bossBulletName]);
    delete bossBullets[bossBulletName];
    delete bossBulletIntervals[bossBulletName];
    if(document.getElementById(`BB${bossBulletName}`)){
    document.getElementById('overworld').removeChild(document.getElementById(`BB${bossBulletName}`));}
  })
  bossBullets = {};
  bossBulletIntervals = {};
  bossBulletID = -1;}

},2000)
}
clearBB();
function movebbb(BBID){

if(!gamePaused){
  bossBullets[BBID][0] += bossBullets[BBID][2];
  bossBullets[BBID][1] += bossBullets[BBID][3];
  document.getElementById(`BB${BBID}`).style.left = `${bossBullets[BBID][0]}px`;
  document.getElementById(`BB${BBID}`).style.top = `${bossBullets[BBID][1]}px`;
}
}
function checkBBCharacterCollision(){
  if(!gamePaused){
Object.keys(bossBullets).forEach((bbName)=>{
  let bX = bossBullets[bbName][0];
  let bY = bossBullets[bbName][1];
  let dx = Math.abs(positionX+(96/2) - bX);
  let dy = Math.abs(positionY+(96/2) - bY);

  if(dx<40 && dy<40 && !bossBullets[bbName][5]){
    bossBullets[bbName][5] = true;
    kalauBBCharCollide(bbName)}
  
})
}}
let BBDraining = false;
function kalauBBCharCollide(bbName){
if(BBDraining)return;
if(!BBDraining && !gamePaused){
  console.log('cum')
  BBDraining = true
clearInterval(bossBulletIntervals[bbName]);
healthCount -= 10;
document.getElementById('character').style.opacity = `0.5`;
document.getElementById('health-bar').style.width = `${(healthCount/100)*400}px`;
document.getElementById('health-bar').innerHTML = `HP: ${healthCount}`;
console.log(`Collision detected between Player and boss projectile ${bbName}`);
console.log(bbName)
if(document.getElementById(`BB${bbName}`)){
document.getElementById('overworld').removeChild(document.getElementById(`BB${bbName}`))};
  setTimeout(()=>{
    document.getElementById('character').style.opacity = `1`;
  },50)
  setTimeout(()=>{
    BBDraining = false;
  },500)
}
}
setInterval(()=>{
checkBBCharacterCollision();
},50)
function moveBullet(){

bulletIntervals[bulletID]();
}
function moveZombie(){

zombieIntervals[zombieID]();

}
let healthBarGenerated = false
let bossCoinSpawned = false;
function asshole() {
if(!gamePaused){
Object.keys(zombies).forEach((zombieName) => {
  const zombieX = zombies[zombieName][0] + 32;
  const zombieY = zombies[zombieName][1] + 32;

  Object.keys(bullets).forEach((bulletName) => {
    const bulletX = bullets[bulletName][0];
    const bulletY = bullets[bulletName][1];
//        console.log(bullets)
    const dx = zombieX - bulletX;
    const dy = zombieY - bulletY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let collideD = 36; 
    if(round % bossRounds === 0){collideD = 72}else{collideD = 36}
    if(round % bossRounds === 0 ){
      if(zombies[zombieName][12]>25){
      let bossHP = (zombies[zombieName][12]/bossHealth)*100;
      if(!healthBarGenerated){document.getElementById('overworld').innerHTML += `
        <div id="boss-health-container">
          <div id="boss-health">${bossHP}%</div>
        </div>
      `;healthBarGenerated = true}
      
      
         document.getElementById('boss-health').style.width = `${(zombies[zombieName][12]/bossHealth)*750}px`;
      document.getElementById('boss-health').innerHTML = `${Math.round(bossHP*10)/10}%`;
    }
      
     
    }
    if(zombies[zombieName][22] === 300){collideD+=10}
    if(round % bossRounds !== 0){healthBarGenerated = false;}
    if (distance < collideD) {
//        console.log(`Collision detected between Zombie ${zombieName} and Bullet ${bulletName}`);
      if(zombies[zombieName][12]>0){
        
//           console.log('ass')
//           clearInterval(bulletIntervals[bulletName]);
help(bulletName);
        zombies[zombieName][12] -= 25;
        document.getElementById(`Z${zombieName}`).style.opacity = `0.5`;
        setTimeout(function(){
          document.getElementById(`Z${zombieName}`).style.opacity = `1`;
        },50)
      }
      if(zombies[zombieName][12] <= 0){
        spawnCoin(zombieY,zombieX)
        if(zombieProjectiles[zombieName]){
          miniBosses --;
          clearInterval(zombieProjectilesIntervals[zombieName]);
          delete zombieProjectiles[zombieName];
          delete zombieProjectilesIntervals[zombieName];
          document.getElementById('overworld').removeChild(document.getElementById(`zB${zombieName}`))
          if(zombies[zombieName]){
            anime.remove(`#Z${zombieName}`)
          }
        }
        if(round % bossRounds === 0){
          zombieKilled = zombieLimit;
           bossKilled = true;
           document.getElementById('overworld').removeChild(document.getElementById('boss-health-container'));}
          else{zombieKilled ++}
        console.log('loa')
         document.getElementById('overworld').removeChild(document.getElementById(`Z${zombieName}`));
         clearInterval(zombieIntervals[zombieName][9]);
      delete zombies[zombieName];
      delete zombieIntervals[zombieName];
      if(bullets[bulletName]){anime.remove(`#B${bulletName}`);}
      clearInterval(bulletIntervals[bulletName]);
//      document.getElementById('overworld').innerHTML -= `<img src="object_frames/bullet.png" class="bullet" id="B${bulletName}" style="transform: rotate(${bullets[bulletName][9]}deg); top: ${bullets[bulletName][1]}px; left: ${bullets[bulletName][0]}px;">`;
      delete bullets[bulletName];
      delete bulletIntervals[bulletName];
      
      
      
     

    }}
  
  });
});
}}


let cum = false;
let debugOBJ = {};
let debugOBJINDEX = 0
let projectileSpeedChanged = false;
setInterval(()=>{
  asshole();
},32)
setInterval(function () {
  asshole();
  
  if (bulletID >= 50 && !cum) {
  removeShoot = false;
  cum = true;
  
  setTimeout(function () {
    bulletID = -1;
    cum = false;
    removeShoot = true;
    let sorryBullet = 0;
  
    Object.keys(bullets).forEach((bulletName) => {
      let bulletElement = document.getElementById(`B${bulletName}`)
        clearInterval(bulletIntervals[bulletName]);
        if (bulletElement) {
          document.getElementById('overworld').removeChild(bulletElement);
          sorryBullet ++;
          anime.remove(`#B${bulletName}`);
        }
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        delete bulletIntervals[bulletName];
        anime.remove(`#B${bulletName}`);
        anime.remove(`#B${bulletName}`);
        anime.running.forEach((animation) => {
          animation.animatables.forEach((animatable) => {
              const target = animatable.target;
      
              if (target.classList && target.classList.contains('bullet')) {
                  anime.remove(target);
              }
          });
      });
        delete bulletIntervals[bulletName];
        delete bullets[bulletName]
      
    });
  
    bulletNum += sorryBullet;
  }, 100);
  }
  }, 90);
  
function help(bulletName){
  if(bullets[bulletName]){
    anime.remove(`#B${bulletName}`);
  }
          document.getElementById('overworld').removeChild(document.getElementById(`B${bulletName}`));
           delete bullets[bulletName];
          delete bulletIntervals[bulletName];
}
let coinNo = -1;
function spawnCoin(zY,zX){
coinNo ++;
document.getElementById('overworld').innerHTML += `<img class="coin" id="C${coinNo}" src="object_frames/coin_frame1.png" onclick="coin_dialouge()" style="top:${zY}px;left:${zX}px;position:fixed;"></img>`
coinObject[coinNo] = [coinNo,1,'',zX,zY]
coinIntervals.push(
  function coinInterval(){
  let cID = coinObject[coinNo][0]
coinObject[cID][2] = setInterval(function(){
  if(!gamePaused){
  coinObject[cID][1] ++;
  document.getElementById(`C${cID}`).src = `object_frames/coin_frame${coinObject[cID][1]}.png`;
  if(coinObject[cID][1] === 6){coinObject[cID][1] = 1}}
},250)})
coinIntervals[coinNo]()
}
function pickUpCoin (){
if(!gamePaused){
  Object.keys(coinObject).forEach((coinID) => {
    const coinX = coinObject[coinID][3] + 32;
    const coinY = coinObject[coinID][4] + 32;
    let dx,dy;
    if((positionX - coinX)<(coinX - positionX)){dx = positionX - coinX}else{dx=coinX - positionX}
    if((positionY - coinY)<(coinY - positionY)){dy = positionY - coinY}else{dy=coinY - positionY}
    const distance = Math.sqrt(dx * dx + dy * dy);
    const collideD = 100; 
//     console.log(distance)
      if (distance < collideD) {
        console.log(`Collision detected between Player and Coin ${coinID}`);

        clearInterval(coinObject[coinID][2]);
        document.getElementById('overworld').removeChild(document.getElementById(`C${coinID}`));
        delete coinObject[coinID];
        delete coinIntervals[coinID];
        coinCount ++;
        document.getElementById('coin-count').innerHTML = coinCount;
      }
    });
  }};
setInterval(pickUpCoin,50)

function checkZombieCharacterCollision(){
if(!gamePaused){  
Object.keys(zombies).forEach((zombieName) => {
  const zombieX = zombies[zombieName][0]+16;
  const zombieY = zombies[zombieName][1]+16;

    const dx = (positionX+48) - zombieX;
    const dy = (positionY+48) - zombieY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let collideD = 50; 
    let d1 = 20;
    let d2 = 50;
    if(dx>0 && dy>0){collideD = -50;d1=36*2;}
    if(dx<0){
  if(distance<d1 && distance>0&&!draining){
    draining = true;
    healthCount -= 10;

    document.getElementById('character').style.opacity = `0.5`;
    document.getElementById('health-bar').style.width = `${(healthCount/100)*400}px`;
    document.getElementById('health-bar').innerHTML = `HP: ${healthCount}`;
    console.log(`Collision detected between Player and zombie ${zombieName}`);
    setTimeout(function(){
      document.getElementById('character').style.opacity = `1`;

    },50)
    setTimeout(function(){
      draining = false
  },500)
}}else  if(distance<d2&&!draining){
draining = true;
healthCount -= 10;

document.getElementById('character').style.opacity = `0.5`;
document.getElementById('health-bar').style.width = `${(healthCount/100)*400}px`;
document.getElementById('health-bar').innerHTML = `HP: ${healthCount}`;
console.log(`Collision detected between Player and zombie ${zombieName}`);
setTimeout(function(){
  document.getElementById('character').style.opacity = `1`;

},50)
setTimeout(function(){
  draining = false
},500)
}

});
}}
setInterval(checkZombieCharacterCollision,50)
function died(){
if (healthCount <= 0){
diedVar = true
document.getElementById('overworld').style.display=`none`;
document.getElementById('game-over-container').style.display=`flex`  
}
}
setInterval(died,250)
function trade(item){
if(gamePaused){return}
if(coinCount>0+priceIncrement && item === 'bullet'){
coinCount -= (1+priceIncrement);
bulletNum += 20;
document.getElementById('coin-count').innerHTML = `${coinCount}`;
document.getElementById('bullet-count').innerHTML = `${bulletNum}`;
}
if(coinCount>4+priceIncrement && item === 'mana'){
coinCount -= (5+priceIncrement);
manaPotionCount ++;
document.getElementById('coin-count').innerHTML = `${coinCount}`;
document.getElementById('mana-cube-count').innerHTML = `${manaPotionCount}`;
}
if(coinCount>=2+priceIncrement && item === 'health'){
coinCount -= (2+priceIncrement);
healthPotionCount ++;
document.getElementById('coin-count').innerHTML = `${coinCount}`;
document.getElementById('health-potion-count').innerHTML = `${healthPotionCount}`;
}
if(coinCount>0+priceIncrement && item === 'wall'){
console.log('hehe')
coinCount -= (1+priceIncrement);
wallCount++;
document.getElementById('coin-count').innerHTML = `${coinCount}`;
document.getElementById('wall-count').innerHTML = `${wallCount}`;
}
}
function tradePopUp(){
  if(gamePaused){return}
if(positionX<300 || positionY>250){
tradeopen = true;
document.getElementById('trade-popup').style.display="flex"
}
}
function closeTradePopUp(){
if(positionX>300){
tradeopen = false;
document.getElementById('trade-popup').style.display="none"
}
}
setInterval(closeTradePopUp,250)
function tradeSwitch(item){
  if(gamePaused){return}
if(item === 'mana'){
itemz = 'mana'
document.getElementById('trade-popup').innerHTML = `
<div id="trade-prev" style="cursor: pointer;" onclick="tradeSwitch('bullet')"><strong>&lt;</strong></div>
  <div id="trade-bullet" style="text-wrap: nowrap;padding-left:10px;padding-right:10px;">
    <strong style="margin-right:5px;">${5+priceIncrement}</strong>
    <img src="object_frames/coin_frame1.png" width="15px">
    <span style="margin-left: 7.5px;margin-right:5px;"> -></span>
    <strong style="margin-left: 5px; margin-right:5px;">1</strong>
    <img src="object_frames/mana_potion.png" height="12px">
    <button id="trade-button" onclick="trade('mana')">Trade</button>
  </div>
  <div id="trade-next" style="cursor: pointer;" onclick="tradeSwitch('health')"><strong>></strong></div>
`}
if(item === 'bullet'){
itemz = 'bullet'
document.getElementById('trade-popup').innerHTML = `
  <div id="trade-prev" style="cursor: pointer;"><strong>&lt;</strong></div>
  <div id="trade-bullet" style="text-wrap: nowrap;padding-left:10px;padding-right:10px;">
    <strong style="margin-right:5px;">${1+priceIncrement}</strong>
    <img src="object_frames/coin_frame1.png" width="15px">
    <span style="margin-left: 7.5px;margin-right:5px;"> -></span>
    <strong style="margin-left: 5px; margin-right:5px;">20</strong>
    <img src="object_frames/bullet.png" height="12px">
    <button id="trade-button" onclick="trade('bullet')">Trade</button>
  </div>
  <div id="trade-next" style="cursor: pointer;" onclick="tradeSwitch('mana')"><strong>></strong></div>
`}
if(item === 'health'){
  itemz = 'health'
  document.getElementById('trade-popup').innerHTML = `
    <div id="trade-prev" style="cursor: pointer;" onclick="tradeSwitch('mana')"><strong>&lt;</strong></div>
    <div id="trade-bullet" style="text-wrap: nowrap;padding-left:10px;padding-right:10px;">
      <strong style="margin-right:5px;">${2+priceIncrement}</strong>
      <img src="object_frames/coin_frame1.png" width="15px">
      <span style="margin-left: 7.5px;margin-right:5px;"> -></span>
      <strong style="margin-left: 5px; margin-right:5px;">1</strong>
      <img src="object_frames/health_potion.png" height="20px">
      <button id="trade-button" onclick="trade('health')">Trade</button>
    </div>
    <div id="trade-next" style="cursor: pointer;" onclick="tradeSwitch('wall')"><strong>></strong></div>
  `}
if(item === 'wall'){
itemz = 'wall'
document.getElementById('trade-popup').innerHTML = `
<div id="trade-prev" style="cursor: pointer;" onclick="tradeSwitch('health')"><strong>&lt;</strong></div>
    <div id="trade-wall" style="text-wrap: nowrap;padding-left:10px;padding-right:10px;">
      <strong style="margin-right:5px;">${1+priceIncrement}</strong>
      <img src="object_frames/coin_frame1.png" width="15px">
      <span style="margin-left: 7.5px;margin-right:5px;"> -></span>
      <strong style="margin-left: 5px; margin-right:5px;">1</strong>
      <img src="object_frames/wall.jpeg" height="20px">
      <button id="trade-button" onclick="trade('wall')">Trade</button>
    </div>
    <div id="trade-next" style="cursor: pointer;><strong>></strong></div>
  `;console.log('lol')
}}
function addMana(){
if(manaCount !== 100 && !gamePaused){
if(manaPotionCount >0){


manaCount = 100
console.log(manaCount)
manaPotionCount --;
document.getElementById('mana-cube-count').innerHTML = `${manaPotionCount}`;
document.getElementById('mana-bar').innerHTML = `MANA:${manaCount}`;
manaWidth = (manaCount/100)*400;
    document.getElementById('mana-bar').style.width = `${manaWidth}px`;
}
}
}
function addHealth(){
if(healthCount !== 100 && !gamePaused){
if(healthPotionCount>0){
healthCount = 100;
healthPotionCount --;
document.getElementById('health-potion-count').innerHTML = `${healthPotionCount}`;
document.getElementById('health-bar').innerHTML = `HP:${healthCount}`;
healthWidth = (healthCount/100)*400;
      document.getElementById('health-bar').style.width = `${healthWidth}px`;
}
}}

let time = 11
let timeINV = 0;
let bossCoinInterval;
let newRound = false;
let remainingTime = 12;
let roundInterval;
function roundManager(){
if(gamePaused){return}
if((zombieKilled)===zombieLimit && !newRound){
newRound = true;
round ++;
if(round % bossRounds === 0){bossKilled = false;
  bossHealth += 1000;
bossCoinInterval=setInterval(()=>{
let coinX = Math.random();
coinX = (coinX*400)+300;
let coinY = Math.random();
coinY = coinY*250
    spawnCoin(coinY,coinX);
  },10000)
  zombies = {};
  zombieIntervals = [];
  zombieID = -1;
zombieLimit += 5;
} else if(round % bossRounds !== 0){
  clearInterval(bossCoinInterval);
  zombies = {};
  zombieIntervals = [];
  zombieID = -1;
zombieLimit += 5;
}
  
roundInterval = setInterval(()=>{
  if(!gamePaused){
    console.log(remainingTime)
    if(remainingTime>-1){
      console.log('min')
    document.getElementById('round-container').innerHTML = `Round ${round} starting in ${remainingTime-2}s`;
    remainingTime --;
    }
    if(remainingTime<=0){
      console.log('hehe')
      zombieSpawned = 0;
      zombieKilled = 0;
      zombieSpeed += zombieSpeedRate;
      Object.keys(zombies).forEach((zombieName)=>{
        if(zombies[zombieName]){
        anime.remove(`#Z${zombieName}`)
        }
      })
      anime.running.forEach((animation) => {
        animation.animatables.forEach((animatable) => {
            const target = animatable.target;
            if (target.classList && target.classList.contains('zombies')) {
                console.log('Clearing animation for target with class:', target.classList);
                anime.remove(target);
            }
        });
    });
      if(zombieCooldown>50){
      zombieCooldown -= zombieCooldownRate;
      }
      newRound = false;
      document.getElementById('round-container').innerHTML=`Round ${round}`;
      spawnZombie();
      clearInterval(roundInterval)
      remainingTime = 12;
    }
  }
},1000)

 time = 11
 timeINV = 0;

}
// console.log(`roundmanager run`)
}


setInterval(function(){
roundManager()
},100)

function controls(a){
  if(a){
    document.getElementById('game-paused-container').innerHTML = `
      <div id="game-paused">Game Paused</div>
    <div id="game-paused-buttons">
      <div style="text-align:center;">
        WASD - Movement<br>
        Q - Shoot<br>
        Space - Dash<br>
        E - Heal <br>
        R - Replenish Mana<br>
        T - Trade<br>
        C - Place walls<br>
        Enter - Trade all<br>
        Backtick - Pause<br>
        click on the guy to trade with him but make sure you are close enough to him.<br>
      </div>
      <button class="welcome-buttons" style="margin-bottom:12px" onclick="controlBack('hehe')">Back</button>
    </div>
    <div id="game-info"><span style="font-size:22px">Difficulty: ${gameDifficulty}</span><br><span style="font-size:22px;text-align: center;">Round: ${round}</span></div>
    `;
    document.getElementById('game-paused-container').style.left=`28vw`;
    document.getElementById('game-paused-container').style.top = `14vh`;
    document.getElementById('game-paused-container').style.textAlign = `center`;
  }else{
document.getElementById('welcome').innerHTML = `
<div id="disclaimer" style="font-size:10px; position:fixed; top:0;left:0;">Disclaimer: All pixel art DO NOT originate from me.</div>
<div id="control-view">
WASD - Movement<br>
Q - Shoot<br>
Space - Dash<br>
E - Heal <br>
R - Replenish Mana<br>
T - Trade<br>
C - Place walls<br>
Enter - Trade all<br>
Backtick - Pause<br>
click on the guy to trade with him but make sure you are close enough to him.
</div>
<button style="
width: 250px;
height: 60px;
border: 2.5px gray solid;
background-color: rgb(240, 240, 240);
color: black;
font-family: Pixelify Sans;
font-size: 24px;
cursor: pointer;
" onclick="controlBack()">Back</button>
`}
}
function controlBack(a){
  if(a){
    document.getElementById('game-paused-container').innerHTML = `
    <div id="game-paused">Game Paused</div>
    <div id="game-paused-buttons">
      <button class="welcome-buttons" style="margin-bottom:12px" onclick="controls(true)">Controls</button>
      <a href="game.html"><button class="welcome-buttons" style="margin-bottom:12px">Main-menu</button></a>
      <button class="welcome-buttons" style="margin-bottom:12px" onclick="pause('hehe')">Resume game</button>
    </div>
    <div id="game-info"><span style="font-size:22px">Difficulty: ${gameDifficulty}</span><br><span style="font-size:22px;text-align: center;">Round: ${round}</span></div>
    `;
    document.getElementById('game-paused-container').style.left=`37.4vw`;
    document.getElementById('game-paused-container').style.top = `20.5vh`;
    document.getElementById('game-paused-container').style.textAlign = `center`;
  }else{
document.getElementById('welcome').style.height=`100vh`
document.getElementById('welcome').innerHTML = `
<div id="disclaimer" style="font-size:10px; position:fixed; top:0;left:0;">Disclaimer: All pixel art DO NOT originate from me.</div>
<div id="title">COC N BALLZ</div>
<div id="desc">Defend against zombie waves</div>

<div id="welcome-buttons-container">
  <button id="play" class="welcome-buttons" onclick="gameHardness()">Play</button>
  <button id="controls" class="welcome-buttons" onclick="controls()">Controls</button>
  <button id="credit" class="welcome-buttons" onclick="credit()">Credit</button>
</div>
<div id="version-info"><div>Version 1.3.2</div><a href="patches.html" target="_blank"><button id="version-button">Patch Notes</button></a> </div>
`}
}
function credit(){
  const Credit = () =>{
    const disclaimerStyle = {
      fontSize:'10px',
      position:'fixed',
      top:'0',
      left:'0'
    }
    const buttonStyle = {
      width: `250px`,
      height:`60px`,
      border: `2.5px gray solid`,
      backgroundColor: `rgb(240, 240, 240)`,
      color: `black`,
      fontFamily: `Pixelify Sans`,
      fontSize: `24px`,
      cursor: `pointer`
    }
    const backButt = () =>{
      controlBack();
    }
    return(
      <div>
        <div id="disclaimer" style={disclaimerStyle}>Disclaimer: All pixel art DO NOT originate from me.</div>
        <p>ANtybiu</p>
      <button style={buttonStyle} onClick={backButt}>Back</button>
      </div>
      
    );
  };
  const root = ReactDOM.createRoot(document.getElementById('welcome'))
  root.render(<Credit />)
}
setTimeout(function(){alert('IMPORTANT: TURN OFF ALL ENERGY SAVERS IN YOUR BROWSER')},10)

function gameHardness(){
document.getElementById('welcome').style.display=`none`;
document.getElementById('difficulty').style.display=`grid`
}
function place_wall(){
if(!placed && wallCount>0 && !gamePaused){
wallCount --;
document.getElementById('wall-count').innerHTML = `${wallCount}`;
placed = true;
if (movedDown){
console.log('ass')
wallID ++;
let wallY = positionY+96;
let wallX = positionX+(96/2)-25;
console.log(wallY)
if(wallY>460){wallY=480}
console.log(wallY)
wallY = Math.round(wallY / wallgrid)*wallgrid;
  wallX = Math.round(wallX / wallgrid)*wallgrid;
  console.log(wallY)
document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
document.getElementById(`W${wallID}`).style.position = `fixed`;
document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
document.getElementById(`W${wallID}`).style.width = `64px`;
document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
walls[wallID] = [wallX,wallY,100,false]
} else if (movedUp){
console.log('ass')
wallID ++;
let wallY = positionY-(96/2);
let wallX = positionX+(96/2)-25;
console.log(wallY)
if(wallY>480){wallY=480}
console.log(wallY)
wallY = Math.round(wallY / wallgrid)*wallgrid;
  wallX = Math.round(wallX / wallgrid)*wallgrid;
  console.log(wallY)
document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
document.getElementById(`W${wallID}`).style.position = `fixed`;
document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
document.getElementById(`W${wallID}`).style.width = `64px`;
document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
walls[wallID] = [wallX,wallY,100,false]
} else if (movedRight){
console.log('ass')
wallID ++;
let wallY = positionY+25;
let wallX = positionX+(75);
console.log(wallX)
if(wallY>480){wallY=480}
console.log(wallX)
wallY = Math.round(wallY / wallgridY)*wallgridY;
  wallX = Math.round(wallX / wallgrid)*wallgrid;
  console.log(wallY)
document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
document.getElementById(`W${wallID}`).style.position = `fixed`;
document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
document.getElementById(`W${wallID}`).style.width = `64px`;
document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
walls[wallID] = [wallX,wallY,100,false]
} else if (movedLeft){
console.log('ass')
wallID ++;
let wallY = positionY+25;
let wallX = positionX-45;
console.log(wallY)
if(wallY>480){wallY=480}
console.log(wallY)
wallY = Math.round(wallY / wallgridY)*wallgridY;
  wallX = Math.round(wallX / wallgrid)*wallgrid;
  console.log(wallY)
document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
document.getElementById(`W${wallID}`).style.position = `fixed`;
document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
document.getElementById(`W${wallID}`).style.width = `64px`;
document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
walls[wallID] = [wallX,wallY,100,false]
} setTimeout(function(){
placed = false;
},100)}
}
function checkWallCharacterCollision() {

let tempCollisionDown = false;
let tempCollisionUp = false;
let tempCollisionLeft = false;
let tempCollisionRight = false;
Object.keys(walls).forEach((wallName) => {
let wallX = walls[wallName][0] + 32;
let wallY = walls[wallName][1] + 32;
let dy = (positionY + (96 / 2)) - wallY;
let dx = (positionX + (96 / 2)) - wallX;
let pY = positionY + (96 / 2);
let pX = positionX + (96 / 2);
let wallOBJ = document.getElementById(`W${wallName}`).getBoundingClientRect();

if (Math.abs(dy) < 67.5 && Math.abs(dx) < 49.5) {
  if (pY >=(wallOBJ.top - 30) &&pY <=(wallOBJ.top+wallOBJ.height) && pX > wallOBJ.left && pX < (wallOBJ.width + wallOBJ.left)) {
    tempCollisionDown = true;
  }
  if (pY<=(wallOBJ.top+wallOBJ.height+26)&&pY>=(wallOBJ.top + wallOBJ.height) && pX > wallOBJ.left && pX < (wallOBJ.width + wallOBJ.left)) {
    tempCollisionUp = true;
  }
  if (pX >= (wallOBJ.left-25) && pX <= ((wallOBJ.left - 12) + wallOBJ.width) && pY < (wallOBJ.top + wallOBJ.height + 20) && pY > wallOBJ.top - 20) {
    tempCollisionRight = true;
  }
  if (pX >= ((wallOBJ.left ) + wallOBJ.width) && pY < (wallOBJ.top + wallOBJ.height + 20) && pY > wallOBJ.top - 20) {
    tempCollisionLeft = true;
  }
}


});
collisionDown = tempCollisionDown;
collisionUp = tempCollisionUp;
collisionRight = tempCollisionRight;
collisionLeft = tempCollisionLeft;

}

function checkWallBulletCollision(){
  if(gamePaused){return}
let wallHP = 'asdasd';
let bullethuh = 'what the fuck!?';
let wallhuh =`ez`;
Object.keys(walls).forEach((wallName) => {
let   wallX = walls[wallName][0]+32;
let   wallY = walls[wallName][1]+32;
 wallHP = walls[wallName][2];
wallhuh=wallName;
Object.keys(bullets).forEach((bulletName) => {
let  bulletX = bullets[bulletName][0];
let  bulletY = bullets[bulletName][1];
bullethuh = bulletName;
let dx = wallX -bulletX;
let dy = wallY - bulletY;
let distance = ((dx**2)+(dy**2))**0.5;
if(distance<36){
if(walls[wallName][2]>0){ 
  if(bullets[bulletName]){anime.remove(`#B${bulletName}`);}      
  document.getElementById('overworld').removeChild(document.getElementById(`B${bulletName}`));
  delete bullets[bulletName];
//      delete bulletIntervals[bulletName];
  walls[wallName][2] -= 10;
  document.getElementById(`W${wallName}`).style.opacity = `0.5`;
  setTimeout(function(){
    document.getElementById(`W${wallName}`).style.opacity = `1`;
  },50)
  
}
if(walls[wallName][2]===0){
//      clearInterval(bulletIntervals[bulletName]);
if(bullets[bulletName]){anime.remove(`#B${bulletName}`);}
  delete bullets[bulletName];
//      delete bulletIntervals[bulletName];
  document.getElementById('overworld').removeChild(document.getElementById(`W${wallName}`));
  console.log('hehe')
  delete walls[wallName];
}
}})})
}
function checkWallZombieCollision() {
  if(gamePaused){return}
Object.keys(zombies).forEach((zombieName) => {
let zombie = zombies[zombieName];
let zX = zombie[0];
let zY = zombie[1];
let intendedVelocityX = zombie[3]
let intendedVelocityY = zombie[4]
 zombie[15] = false;
 zombie[16] = 0;
 zombie[17] = 0;

Object.keys(walls).forEach((wallName) => {
  if(walls[wallName]){
  let wall = walls[wallName];
  let wallOBJ = document.getElementById(`W${wallName}`).getBoundingClientRect();
  let wallX = wall[0];
  let wallY = wall[1];
  let limit = 32;
  if(round % bossRounds ===0){limit = 64;}
  if (zX + intendedVelocityX < wallX + wallOBJ.width &&  zX + limit + intendedVelocityX > wallX && zY+intendedVelocityY < wallY + wallOBJ.height &&  zY + limit + intendedVelocityY > wallY) {
    if(round % bossRounds === 0){document.getElementById('overworld').removeChild(document.getElementById(`W${wallName}`));
    delete walls[wallName];}else{
      console.log('bedugging')
    zombie[15] = true;
    let repulsionX = 3.5;
    let repulsionY = 3.5;
    if ((zX - wallX)<0){repulsionX = -3.5}else{repulsionX = 3.5}
    if ((zY - wallY)<0){repulsionY = -3.5}else{repulsionY = 3.5}
    if(zombie[22] === 50){repulsionX=11;repulsionY=11;}
    zombie[0] += repulsionX 
    zombie[1] += repulsionY 
    wall[2] -= 0.025;
    if(!wall[3]){
      wall[3] = true;
      setTimeout(function(){
        document.getElementById(`W${wallName}`).style.opacity = `0.8`;
        wall[3] = false;
      },10)
    }else{}
    if(wall[2]<0){
      document.getElementById('overworld').removeChild(document.getElementById(`W${wallName}`));
      delete walls[wallName];
    }}
  }}
});
});
}
setInterval(function(){
checkWallBulletCollision();
checkWallCharacterCollision();
checkWallZombieCollision();
checkWallBossBulletCollision();
checkWallZombieProjectileCollision();
},50)

function checkWallBossBulletCollision(){
  if(gamePaused){return}
let wallHP = 'asdasd';
let bullethuh = 'what the fuck!?';
let wallhuh =`ez`;
Object.keys(walls).forEach((wallName) => {
let   wallX = walls[wallName][0]+32;
let   wallY = walls[wallName][1]+32;
 wallHP = walls[wallName][2];
wallhuh=wallName;
Object.keys(bossBullets).forEach((bbName) => {
let  bulletX = bossBullets[bbName][0];
let  bulletY = bossBullets[bbName][1];
bullethuh = bbName;
let dx = wallX -bulletX;
let dy = wallY - bulletY;
let distance = ((dx**2)+(dy**2))**0.5;
if(distance<36){
if(walls[wallName][2]>0){       
  clearInterval(bossBulletIntervals[bbName]);
  bossBullets[bbName][5] = true;
  delete bossBulletIntervals[bbName]
  document.getElementById('overworld').removeChild(document.getElementById(`BB${bbName}`));
  delete bossBullets[bbName];
//      delete bulletIntervals[bulletName];
  walls[wallName][2] -= 25;
  document.getElementById(`W${wallName}`).style.opacity = `0.5`;
  setTimeout(function(){
    document.getElementById(`W${wallName}`).style.opacity = `1`;
  },50)
  
}
if(walls[wallName][2]===0){
//      clearInterval(bulletIntervals[bulletName]);
clearInterval(bossBulletIntervals[bbName]);
  delete bossBullets[bbName];
  if(bossBulletIntervals[bbName]){delete bossBulletIntervals[bbName]}
//      delete bulletIntervals[bulletName];
  document.getElementById('overworld').removeChild(document.getElementById(`W${wallName}`));
  delete walls[wallName];
}
}})})
}
function checkWallZombieProjectileCollision(){
  if(gamePaused){return}
let wallHP = 'asdasd';
let wallhuh =`ez`;
Object.keys(walls).forEach((wallName) => {
let   wallX = walls[wallName][0]+32;
let   wallY = walls[wallName][1]+32;
 wallHP = walls[wallName][2];
wallhuh=wallName;
Object.keys(zombieProjectiles).forEach((zID) => {
let  bulletX = zombieProjectiles[zID][0];
let  bulletY = zombieProjectiles[zID][1];
let dx = wallX -bulletX;
let dy = wallY - bulletY;
let distance = ((dx**2)+(dy**2))**0.5;
if(distance<45){
if(walls[wallName][2]>0){       
  clearInterval(zombieProjectilesIntervals[zID]);
  zombieProjectiles[zID][5] = true;
  delete zombieProjectilesIntervals[zID]
  document.getElementById('overworld').removeChild(document.getElementById(`zB${zID}`));
  delete zombieProjectiles[zID];
//      delete bulletIntervals[bulletName];
  walls[wallName][2] -= 25;
  document.getElementById(`W${wallName}`).style.opacity = `0.5`;
  setTimeout(function(){
    document.getElementById(`W${wallName}`).style.opacity = `1`;
  },50)
  
}
if(walls[wallName][2]===0){
//      clearInterval(bulletIntervals[bulletName]);
clearInterval(zombieProjectilesIntervals[zID]);
  delete zombieProjectiles[zID];
  if(zombieProjectilesIntervals[zID]){delete zombieProjectilesIntervals[zID]}
//      delete bulletIntervals[bulletName];
  document.getElementById('overworld').removeChild(document.getElementById(`W${wallName}`));
  delete walls[wallName];
}
}})})
}

function almanac(type){
  if(type === 'zombies'){
    document.getElementById('almanac-list').innerHTML = `
    <div id="almanac-list-header">
        <div><span onclick="almanac('characters')" style="cursor: pointer;">Characters</span></div>
        <div><span onclick="almanac('zombies')" style="cursor: pointer;">Zombies</span></div>
      </div>
      <div id="almanac-row1" class="almanac-row">
        <div id="zombie1" class="almanac-items">
          <img src="object_frames/zombie_almanac.png" width="128px" onclick="almanac_info('zombie')" class="lol"><br>
          <span>Zombie</span>
        </div>
  
        <div id="zombie2" class="almanac-items">
          <img src="object_frames/zombie2_almanac.png" width="128px" onclick="almanac_info('zombie2')" class="lol"><br>
          <span>Pirate Zombie</span>
        </div>
  
        <div id="zombie3" class="almanac-items">
          <img src="object_frames/zombie3.png" onclick="almanac_info('zombie3')" class="lol"><br>
          <span>General Zombie</span>
        </div>
      
      </div>
      <div id="almanac-row2" class="almanac-row">
        <div id="zombie4" class="almanac-items">
          <img src="object_frames/zombie4_almanac.png" width="128px" onclick="almanac_info('zombie4')" class="lol"><br>
          <span>Baby Zombie</span>
        </div>
      </div>
    `
  }
  else if(type==='characters'){
    document.getElementById('almanac-list').innerHTML = `
    <div id="almanac-list-header">
        <div><span onclick="almanac('characters')" style="cursor: pointer;">Characters</span></div>
        <div><span onclick="almanac('zombies')" style="cursor: pointer;">Zombies</span></div>
      </div>
      <div class="almanac-row">

        <div id="character-almanac" class="almanac-items">
          <img src="walking_frames/walk_frame1.png" class="lol" onclick="almanac_info('Character')"><br>
          <span>You</span>
        </div>

        <div id="character-almanac" class="almanac-items">
          <img src="object_frames/fred.png" class="lol" onclick="almanac_info('Fred')" ><br>
          <span>Fred</span>
        </div>

        <div id="character-almanac" class="almanac-items">
          <img src="object_frames/pirate-killer.png" class="lol" onclick="almanac_info('Mart')"><br>
          <span>Mart</span>
        </div>
      </div>
    `
  }
}
function almanac_info(type){
  if(type === 'zombie'){
    document.getElementById('almanac-info').innerHTML = `
     <div id="almanac-info-pic">
        <img src="object_frames/zombie_almanac.png" width="200px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">Zombie</div>
        <div>HP: 100</div>
        <div>Movement Speed: Normal</div>
        <div style="margin-bottom: 25px;">Special Abilites: none</div>
        <div style="color:gray">
          These zombies were once ordinary citizens who fled the mainland aboard □□□□□□'s fleet. When the necrovirus ravaged the world, □□□□□□ promised salvation to those who joined him at sea. Civilians, sailors, and skilled workers boarded the ships in desperation, hoping for a better life under □□□□□□'s protection. But life aboard the fleet was harsh, marked by strict rules, food shortages, and constant fear. When the fleet crashed on Narau following revolts launched by generals aboard, these civilians were left vulnerable. The hidden infected individual aboard the ship unleashed the virus, and they became the first victims, now doomed to wander the island and wrecked fleet as mindless husks, eternally searching for what they once sought: survival.
        </div>
        
      </div>
    `
  } else if(type === 'zombie2'){
    document.getElementById('almanac-info').innerHTML = `
      <div id="almanac-info-pic">
        <img src="object_frames/zombie2_almanac.png" width="200px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">Pirate Zombie</div>
        <div>HP: 300</div>
        <div>Movement Speed: Normal</div>
        <div style="margin-bottom: 25px;">Special Abilites: Shoots bullets that seek out the player</div>
        <div style="color:gray">
          Former government officials who sought refuge on the seas, these "pirates" once held positions of power. Under □□□□□□'s tyrannical rule, their morale crumbled, and their descent into mutiny was inevitable. After the fleet’s crash on Narau, many of these ex-officials were among the first infected by the necrovirus. Their transformation retained a twisted sense of their rebellious spirit, making them more cunning and aggressive than their mindless counterparts. Clad in remnants of their stolen finery and wielding crude weapons, pirate zombies embody the chaos that brought about their downfall.
        </div>
        
      </div>
    `
  } else if(type ==='zombie3'){
    document.getElementById('almanac-info').innerHTML = `
      <div id="almanac-info-pic">
        <img src="object_frames/zombie3.png" width="200px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">General Zombie</div>
        <div>HP: 2500 + 1000 every time it spawns</div>
        <div>Movement Speed: Fast</div>
        <div style="margin-bottom: 25px;">Special Abilites: Shoots bullets Into all directions</div>
        <div style="color:gray">
          The military generals who served directly under □□□□□□ were trained strategists and battle-hardened leaders. Though they orchestrated the revolt against Mordain, the crash on Narau left them vulnerable to the necrovirus. Now reanimated as hulking abominations, they retain eerie traces of their tactical prowess. Stronger, faster, and more dangerous than the average zombie, these generals rally other undead into organized assaults. Their corrupted bodies bear grotesque scars from their human lives, a grim reminder of their failed uprising and the chaos they helped unleash.


        
      </div>
    `
  }else if(type ==='zombie4'){
    document.getElementById('almanac-info').innerHTML = `
      <div id="almanac-info-pic">
        <img src="object_frames/zombie4_almanac.png" width="200px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">Baby Zombie</div>
        <div>HP: 50</div>
        <div>Movement Speed: Very Fast</div>
        <div style="margin-bottom: 25px;">Special Abilites: None</div>
        <div style="color:gray">
          These zombies were little chlideren who followed their parents onto Captain □□□□□□'s ship. When the ship crashed on Naurau they escaped the ship and the infected while hudling out at □□□□□□□□□□□□.
      </div>
    `
  }else if(type === 'Character'){
    document.getElementById('almanac-info').innerHTML =
    `
    <div id="almanac-info-pic">
        <img src="walking_frames/walk_frame1.png" width="200px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">You</div>
        <div>HP: 100</div>
        <div>Movement Speed: Normal</div>
        <div style="margin-bottom: 25px;">Special Abilites: None</div>
        <div style="color:gray">
          One of the last few survivours on Naurau island following the crash of □□□□□□'s fleet.
      </div>`
  }else if(type === 'Fred'){
    document.getElementById('almanac-info').innerHTML =
    `
    <div id="almanac-info-pic">
        <img src="object_frames/fred.png" width="175px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">Fred</div>
        <div>HP: 1000</div>
        <div>Movement Speed: Dosent move</div>
        <div style="margin-bottom: 25px;">Special Abilites: Trades with the player (T)</div>
        <div style="color:gray">
          One of the last few survivours on Naurau island that the character rescued. Fred now forges resources from the coins of zombies for the player to aid in defending against the zombie waves.
      </div>`
  }else if(type === 'Mart'){
    document.getElementById('almanac-info').innerHTML =
    `
    <div id="almanac-info-pic">
        <img src="object_frames/pirate-killer.png" width="175px">
      </div>
      <div id="almanac-info-desc" style="padding-left:10px;padding-right:10px;">
        <div style="font-size:32px;font-weight: bold;margin-bottom:25px;">Mart</div>
        <div>HP: Infinite</div>
        <div>Movement Speed: Dosent Move</div>
        <div style="margin-bottom: 25px;">Special Abilites: Targets pirates and kills them</div>
        <div style="color:gray">
          A robot constructed by Fred. It converts zombie coins into ammunition which it uses to eliminate all pirate zombies.
      </div>`
  }  
}
function almanac_start(){
  document.getElementById('almanac-page-container').style.display = `flex`;
  document.getElementById('welcome').style.display = `none`;
}
function place_turret(){
  if(coinCount>=20 && !gamePaused){
    coinCount-=20;
    document.getElementById('coin-count').innerHTML = `${coinCount}`
  turretID ++;
  let x = Math.round(positionX*turretGridX)/turretGridX;
  let y = Math.round(positionY*turretGridY)/turretGridY;
  turrets[turretID] = {
    X: 350,
    Y: 125,
    ShootFlag: true,
    Bullets: 1000*10**123
  };
  setInterval(()=>{ShootTurret(turretID,turrets[turretID].ShootFlag,turretProjectilesID)},turretCooldown);
}
}
let tBClearing = false;
function ShootTurret(tID,ShootFlag,tPID){
  if(!ShootFlag || gamePaused){return}
  if(turretProjectilesID>35 && !tBClearing && turrets[tID].Bullets>0){
    tBClearing = true;
    setTimeout(()=>{
      Object.keys(turretProjectiles).forEach((tPID)=>{
        clearInterval(turretProjectiles[tPID].movementInterval);
        document.getElementById('overworld').removeChild(document.getElementById(`TB${tPID}`));
        delete turretProjectiles[tPID];
      })
      turretProjectiles = {};
      turretProjectilesID = 0;
      tBClearing = false;
    },1500)
    return
  }
  if(turretProjectilesID>35 || turrets[tID].Bullets<=0){return}
  turrets[tID].Bullets --;

  let zombieTarget;
    let targetSet;
    Object.keys(zombies).forEach((zID)=>{ 
      if(zombies[zID][22]>=300 && !targetSet){
        zombieTarget = zID;
        targetSet = true;
        
      }
    })
    if(!targetSet){
        Object.keys(turretProjectiles).forEach((tPID)=>{
          clearInterval(turretProjectiles[tPID].movementInterval);
          document.getElementById('overworld').removeChild(document.getElementById(`TB${tPID}`));
          delete turretProjectiles[tPID]
        })
        turretProjectiles = {};
        turretProjectilesID = 0;
      return
    }
    if(targetSet){
      document.getElementById('overworld').innerHTML += `
    <img id="TB${tPID}" src="object_frames/bullet.png" class="Turretbullet">
    `;
    document.getElementById(`TB${tPID}`).style.position = `fixed`;
    
    turretProjectiles[tPID] = {
      X: turrets[tID].X,
      Y: turrets[tID].Y,
      bearing:undefined,
      vY:'',
      vX:'',
      movementInterval:'',
      zombieTargetStore: zombieTarget 
    }
    document.getElementById(`TB${tPID}`).style.top = `${turretProjectiles[tPID].Y}px`;
    document.getElementById(`TB${tPID}`).style.left = `${turretProjectiles[tPID].X}px`;
    
    anime({
      targets: `#TB${tPID}`,
      top:`${turretProjectiles[tPID].Y}px`,
      left: `${turretProjectiles[tPID].X}px`,
      loop:true,
      duration: 20,
      update:()=>{
        if(turretProjectiles[tPID] && zombies[turretProjectiles[tPID].zombieTargetStore]){
          if(!turretProjectiles[tPID] && zombies[turretProjectiles[tPID].zombieTargetStore]){return}
          let dy = turretProjectiles[tPID].Y - zombies[turretProjectiles[tPID].zombieTargetStore][1]-32;
        let dx = turretProjectiles[tPID].X - zombies[turretProjectiles[tPID].zombieTargetStore][0]-32;
      turretProjectiles[tPID].bearing = Math.atan2(dy,dx)
      turretProjectiles[tPID].vY = -1*projectileSpeed*Math.sin(turretProjectiles[tPID].bearing);
      turretProjectiles[tPID].vX = -1*projectileSpeed*Math.cos(turretProjectiles[tPID].bearing);
  
      turretProjectiles[tPID].X += turretProjectiles[tPID].vX;
      turretProjectiles[tPID].Y += turretProjectiles[tPID].vY;
  
        let rotation = turretProjectiles[tPID].bearing*(180/Math.PI)+180
  
      document.getElementById(`TB${tPID}`).style.transform = `rotate(${rotation}deg)`;
      anime.set(`#TB${tPID}`,{
        top:`${turretProjectiles[tPID].Y}px`,
        left: `${turretProjectiles[tPID].X}px`
      })
      checkTurretBulletZombieCollision(tPID,zombieTarget)
      if(
        turretProjectiles[tPID].X<-25 || turretProjectiles[tPID].X>width+25 || turretProjectiles[tPID].Y<-10 || turretProjectiles[tPID].Y>height+25
      ){
        if(turretProjectiles[tPID]){
        anime.remove(`#TB${tPID}`);
        }
        delete turretProjectiles[tPID];
        document.getElementById('overworld').removeChild(document.getElementById(`TB${tPID}`));
      }
        }
      }
    })

    turretProjectiles[tPID].movementInterval = setInterval(()=>{
      if(turretProjectiles[tPID] && zombies[turretProjectiles[tPID].zombieTargetStore]){
        if(!turretProjectiles[tPID] && zombies[turretProjectiles[tPID].zombieTargetStore]){return}
        let dy = turretProjectiles[tPID].Y - zombies[turretProjectiles[tPID].zombieTargetStore][1]-32;
      let dx = turretProjectiles[tPID].X - zombies[turretProjectiles[tPID].zombieTargetStore][0]-32;
    turretProjectiles[tPID].bearing = Math.atan2(dy,dx)
    turretProjectiles[tPID].vY = -1*projectileSpeed*Math.sin(turretProjectiles[tPID].bearing);
    turretProjectiles[tPID].vX = -1*projectileSpeed*Math.cos(turretProjectiles[tPID].bearing);

    turretProjectiles[tPID].X += turretProjectiles[tPID].vX;
    turretProjectiles[tPID].Y += turretProjectiles[tPID].vY;

      let rotation = turretProjectiles[tPID].bearing*(180/Math.PI)+180

    document.getElementById(`TB${tPID}`).style.transform = `rotate(${rotation}deg)`;
    document.getElementById(`TB${tPID}`).style.top = `${turretProjectiles[tPID].Y}px`;
    document.getElementById(`TB${tPID}`).style.left = `${turretProjectiles[tPID].X}px`;
    checkTurretBulletZombieCollision(tPID,zombieTarget)
    if(
      turretProjectiles[tPID].X<-25 || turretProjectiles[tPID].X>width+25 || turretProjectiles[tPID].Y<-10 || turretProjectiles[tPID].Y>height+25
    ){
      clearInterval(turretProjectiles[tPID].movementInterval);
      delete turretProjectiles[tPID];
      document.getElementById('overworld').removeChild(document.getElementById(`TB${tPID}`));
    }
      }
      
  },20)
  turretProjectilesID ++;
    }
  
}
function checkTurretBulletZombieCollision(tPID,zID){
  if(zombies[zID][22]<300 && zombies[zID][22] >400){return}
  let dy = Math.abs(turretProjectiles[tPID].Y - (zombies[zID][1]+16));
  let dx = Math.abs(turretProjectiles[tPID].X - (zombies[zID][0]+16));
  if(dy<50 && dx<50){
    if(turretProjectiles[tPID]){
    anime.remove(`#TB${tPID}`);
    }
      delete turretProjectiles[tPID];
      document.getElementById('overworld').removeChild(document.getElementById(`TB${tPID}`));
      zombies[zID][12] -= 20;
      document.getElementById(`Z${zID}`).style.opacity = `0.5`;
      setTimeout(function(){
        document.getElementById(`Z${zID}`).style.opacity = `1`;
      },50)
      if(zombies[zID][12] < 1 || turretProjectilesID>=34){
          miniBosses --;
          if(turretProjectiles[tPID]){
            anime.remove(`#TB${tPID}`);
          }
          clearInterval(zombieProjectilesIntervals[zID]);
          delete zombieProjectiles[zID];
          delete zombieProjectilesIntervals[zID];
          document.getElementById('overworld').removeChild(document.getElementById(`zB${zID}`))
          if(zombies[zID]){
            anime.remove(`#Z${zID}`)
          }
          document.getElementById('overworld').removeChild(document.getElementById(`Z${zID}`));
          zombieKilled++;
          spawnCoin(zombies[zID][1],zombies[zID][0])
         clearInterval(zombieIntervals[zID][9]);
         delete zombies[zID];
         delete zombieIntervals[zID];
         Object.keys(turretProjectiles).forEach((tPID)=>{
          document.getElementById(`TB${tPID}`).style.opacity = `0`;
         })
         if(!tBClearing){
          tBClearing = true;
          setTimeout(()=>{
            Object.keys(turretProjectiles).forEach((tPID)=>{
              if(turretProjectiles[tPID]){
              anime.remove(`#TB${tPID}`);}
              document.getElementById('overworld').removeChild(document.getElementById(`TB${tPID}`));
              delete turretProjectiles[tPID];
            })
            anime.running.forEach((animation) => {
              animation.animatables.forEach((animatable) => {
                  const target = animatable.target; 
                  if (target.classList && target.classList.contains('Turretbullet')) {
                      anime.remove(target);
                  }
              });
          });
            turretProjectiles = {};
            turretProjectilesID = 0;
            tBClearing = false;
          },1500)
          return
        }
  }
}
}
let turretPopUpOpen;
function turretPopUp(){
  if((positionX<400 && positionX>300) || (positionY>0 && positionY<200)){
    turretPopUpOpen = true;
    document.getElementById('turret-popup').style.display="flex"
    }
}

function closeTurretPopUp(){
  if((positionX>585) || (positionY>315)){
    document.getElementById('turret-popup').style.display="none";
    turretPopUpOpen = false;
    }
}
setInterval(()=>{
  closeTurretPopUp()
},500)