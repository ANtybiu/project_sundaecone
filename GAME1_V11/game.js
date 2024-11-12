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
    let projectileSpeed = 5;
    let zombieCooldown = 1000;
    let zombieID = -1;
    let bulletID = -1;
    let bullets = {};
    let bulletIntervals = [];
    let startedBullets = [];
    let shootingCooldown = 100;
    let zombies = {};
    let zombieIntervals = [];
    let collidedZombies = {};
    let coinObject = {};
    let coinIntervals = [];
    let draining = false;
    let diedVar = false;
    let bulletNum = 40;
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
    let wallCount = 0;
    //bobs or vagana which ever will it be sit the fuck down t-series im here to spill the real tea you tryna get through me for spot of number 1 but you india you lose so they think you never won when im thru with you your gonna be completely fucking done else we only just begun i rate you 0 by bitch gone so come on t series looking hungry for some drama here let me serve you bitch lasagna

  function startGameLoop(){
    document.getElementById('welcome').style.display=`none`;
    document.getElementById('overworld').style.display=`flex`
  }

  
    function updateCharacter() {
      if (walkingUp && positionY > 0 && !collisionUp && !houseUp) {
        positionY -= movementSpeed;
        
      }
      if (walkingDown && positionY < height && !healthDown && !collisionDown) {
        positionY += movementSpeed;
        
       // console.log(positionY>height-health_bounds.height-50)
      }
      if (walkingLeft && positionX > -45 && !collisionLeft && !houseLeft) {
        positionX -= movementSpeed;
        
      }
      if (walkingRight && positionX < width && !collisionRight) {
        positionX += movementSpeed;
      } 
      document.getElementById('character').style.top = `${positionY}px`;
      document.getElementById('character').style.left = `${positionX}px`;

      detectCollision(positionX,positionY,health_bounds)
      detectCollision(positionX,positionY,houseBounds)
      houseCollision()
      

      requestAnimationFrame(updateCharacter);
    }
    function animateCharacter(){
      if(walkingUp && !walkingLeft && !walkingRight){
        
        
        document.getElementById('character').src = `walking_frames/walk_frame${frame}.png`;
          movedUp = true;movedLeft=false;movedRight=false;movedDown=false;
          frame++
          if (frame === 5) {frame = 1;}
      }
      if(walkingDown && !walkingLeft &&  !walkingRight){
        
       
        document.getElementById('character').src = `walking_frames/walk_frame${frame}.png`;
        movedDown = true;movedLeft=false;movedRight=false;movedUp=false;
        frame++;
        if (frame === 5) {frame = 1;}
      }
      
      if(walkingLeft){
        
        
        document.getElementById('character').src = `walking_frames/walk3_frame${frame}.png`;
        movedLeft = true;movedUp=false;movedRight=false;movedDown=false;
        frame++;
        if (frame === 5) {frame = 1;}
      }
      if(walkingRight){
        
        
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
    requestAnimationFrame(animateCharacter)
    document.addEventListener('keydown', function (event) {
      if (event.key === 'w') {walkingUp = true;}
      if (event.key === 's') {walkingDown = true;}
      if (event.key === 'a') {walkingLeft = true;}
      if (event.key === 'd') {walkingRight = true;}
      if (event.key === 'q'){shootProjectile()}
      if(event.key === ' '){sprinting_fx()}
    });
    
    document.addEventListener('keyup', function (event) {
      if (event.key === 'w') {walkingUp = false;frameOne('up');/*movedUp=true;movedDown=false;movedLeft=false;movedRight=false*/ }
      if (event.key === 's') {walkingDown = false;frameOne('down');}
      if (event.key === 'a') {walkingLeft = false;frameOne('left');}
      if (event.key === 'd') {walkingRight = false;frameOne('right')}
      if(event.key === ' '){
        stopSprinting();
      }

    document.addEventListener('keypress', function(event){
      if(event.key === 't'){tradePopUp()}
      if(event.key === 'e'){addHealth()}
      if(event.key === 'r'){addMana()}
      if(event.key === 'Enter'){if(tradeopen){trade(`${itemz}`)}}
      if(event.key === 'c'){place_wall()}
      
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
      document.querySelector('.coin').src=`object_frames/coin_frame${coin_frame}.png`
      coin_frame ++;
      if(coin_frame===7){coin_frame = 1}
    },250)
   /* setInterval(function(){
      document.querySelector('.mana-cube').src=`object_frames/mana_frame${mana_frame}.png`
      mana_frame ++;
      if(mana_frame===3){mana_frame = 1}
    },500)*/

    function frameOne(movement){
      if(movement === 'up' && movement==='down'){
        frame=1;
        document.getElementById('character').src = `walking_frames/walk_frame${frame}.png`;}
      if(movement === 'left'){
        frame=1;
        document.getElementById('character').src = `walking_frames/walk3_frame${frame}.png`;}
      if(movement === 'right'){
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
      if(!sprinting && manaCount>0 && !sprintingTrig && !sprintTimeout){
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
      console.log(collisionUp)
      /*if(positionY>=160 || positionX<=280 || positionY< 245){
        collisionDown = true;
      } else{collisionDown = false}
      if(positionX<=280 && positionY<= 245 && positionY>=160){
        collisionLeft = true;
      }else{collisionLeft = false}*/
    }
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
    }
    document.addEventListener('mousemove',function(event){
      mouseX = event.clientX;
      mouseY = event.clientY;
    })
    function shootProjectile(){
      if(!alreadyShooting && bulletNum>0){
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
      bullets[bulletID] = [projectilePOSX,projectilePOSY,velocityY,velocityX,bulletID,-1,false,''];
      bulletIntervals.push(
        function bulletInterval(){
          let time = 1;
          let posX = bullets[bulletID][0];
          let posY = bullets[bulletID][1];
          let vY = bullets[bulletID][2];
          let vX = bullets[bulletID][3];
          let ID = bullets[bulletID][4];
          let zID = bullets[bulletID][4];
     bullets[ID][7] = setInterval(function(){
      if(bullets[ID] !== undefined && bullets[ID] !== null){
      bullets[ID][0] += bullets[ID][3]
      bullets[ID][1] += bullets[ID][2]
             document.getElementById(`B${ID}`).style.top = `${bullets[ID][1]}px`;
             document.getElementById(`B${ID}`).style.left = `${bullets[ID][0]}px`;
         //    console.log(`${vY},${velocityY},${posX},${projectilePOSX}`);
             if(bullets[ID][0]>2000 || bullets[ID][1]>1000 || bullets[ID][0]<-50 || bullets[ID][1]<-50){
              document.getElementById('overworld').removeChild(document.getElementById(`B${ID}`));
              clearInterval(bullets[ID][7])
             }}
           },time)
         }
      )
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

 
  function spawnZombie(){
    if(zombieSpawned<zombieLimit){
      zombieSpawned ++;
    setTimeout(function(){
    zombieX = 1350
    zombieID ++;
    zombieY = (Math.random())*750
    if (zombieY>460){zombieY = (Math.random())*460}
    document.getElementById('overworld').innerHTML += `<img src="object_frames/zombie.png" class="zombies" id="Z${zombieID}" width="64px">`
    document.getElementById(`Z${zombieID}`).style.top = `${zombieY}px`
    document.getElementById(`Z${zombieID}`).style.left= `${zombieX}px`
    let z_velocityX = Math.random()
    let z_velocityY = Math.random()
    let vectorX = zombieX - positionX;
    let vectorY = zombieY - positionY;
    zombies[zombieID] = [zombieX,zombieY,zombieID,z_velocityX,z_velocityY,false,Math.random()*1000,20,vectorX,'',vectorY,'',100,Math.random(),Math.random(),false,'','']
    while (zombies[zombieID][6]<250 || zombies[zombieID][6]>750){zombies[zombieID][6]=Math.random()*1000}
    zombieIntervals.push(
      function zombieInterval(){
        let zTime = zombies[zombieID][7];
        let zX = zombies[zombieID][0];
        let zY = zombies[zombieID][1];
        let zID = zombies[zombieID][2];
        let zvX = zombies[zombieID][3];
        let zvY = zombies[zombieID][4];
        let activated = zombies[zombieID][5];
        let zInterval = zombies[zombieID][6];
        let dx = zombies[zombieID][8];
        let dy = zombies[zombieID][10];
        let bearing = zombies[zombieID][11];
        let randomX = zombies[zombieID][13];
        let randomY = zombies[zombieID][14];
         zombieIntervals[zID][9] = setInterval(function(){
          if (zombies[zID][15]) {
            zombies[zID][3] += zombies[zID][16];
            zombies[zID][4] += zombies[zID][17];
            zombies[zID][0] += zombies[zID][3];
          zombies[zID][1] += zombies[zID][4];
          document.getElementById(`Z${zID}`).style.top = `${zombies[zID][1]}px`
          document.getElementById(`Z${zID}`).style.left = `${zombies[zID][0]}px`
          } else {
          
          if(zombies[zID] !== undefined){
            
          if(zombies[zID][1]>455){zombies[zID][4]=-1; };if(zombies[zID][1]<0){zombies[zID][4]=1};
          if(zombies[zID][0]>1300){zombies[zID][3]=-1; };if(zombies[zID][1]<0){zombies[zID][3]=1};
          zombies[zID][8] = zombies[zID][0] - positionX;
          zombies[zID][10] = zombies[zID][1] - positionY;
          zombies[zID][11] = Math.atan2(zombies[zID][10],zombies[zID][8]);
          if(Math.random()<0.5){zombies[zID][13] = Math.random()}else{zombies[zID][13] = -1*Math.random()}
          if(Math.random()>0.5){zombies[zID][14] = Math.random()}else{zombies[zID][14] = -1*Math.random()}
          zombies[zID][3] = -1*(zombieSpeed*Math.cos(zombies[zID][11])+zombies[zID][13]);
          zombies[zID][4] = -1*(zombieSpeed*Math.sin(zombies[zID][11])+zombies[zID][14]);
          zombies[zID][0] += zombies[zID][3];
          zombies[zID][1] += zombies[zID][4];
          document.getElementById(`Z${zID}`).style.top = `${zombies[zID][1]}px`
          document.getElementById(`Z${zID}`).style.left = `${zombies[zID][0]}px`
 //        console.log(`${zombies[zID][3]},${zombies[zID][4]}`)
   //       console.log(`${zombies[zID][0]},${zombies[zID][1]}`)
   if(!zombies[zID][5]){ass();zombies[zID][5] = true}
          function ass (){
            if(!zombies[zID][5]){
              
    /*    setTimeout(function(){
            zombies[zID][3] = Math.random();
          zombies[zID][4] = Math.random();
          if(Math.random()<((frontZ))){zombies[zID][3] = -1*(Math.random())}
          if(Math.random()<(0.5)){zombies[zID][4] = -1*(Math.random())}
       //   console.log(`${zvX},${zvY},${zombies[zID][5]}`)
       
          },zInterval)*/
          setTimeout(function(){
            zombies[zID][5] = false
            },zInterval)}
        }}}
       
        
       
      
      },zTime)
      }
    )

    moveZombie();
    spawnZombie()
  },zombieCooldown)}
  }

  function moveBullet(){
    
    bulletIntervals[bulletID]();
  }
  function moveZombie(){
    if(!zombieCollided){
    zombieIntervals[zombieID]();
    console.log(zombieID)
    }
  }

  function asshole() {
    let zombieNama;
    Object.keys(zombies).forEach((zombieName) => {
      const zombieX = zombies[zombieName][0] + 32;
      const zombieY = zombies[zombieName][1] + 32;

      Object.keys(bullets).forEach((bulletName) => {
        const bulletX = bullets[bulletName][0];
        const bulletY = bullets[bulletName][1];

        const dx = zombieX - bulletX;
        const dy = zombieY - bulletY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const collideD = 36; 
        
        if (distance < collideD) {
  //        console.log(`Collision detected between Zombie ${zombieName} and Bullet ${bulletName}`);
          if(zombies[zombieName][12]>0){
            console.log('ass')
            clearInterval(bulletIntervals[bulletName]);
            document.getElementById('overworld').removeChild(document.getElementById(`B${bulletName}`));
            delete bullets[bulletName];
            delete bulletIntervals[bulletName];
            zombies[zombieName][12] -= 25;
            document.getElementById(`Z${zombieName}`).style.opacity = `0.5`;
            setTimeout(function(){
              document.getElementById(`Z${zombieName}`).style.opacity = `1`;
            },50)
          }
          if(zombies[zombieName][12] === 0){
            spawnCoin(zombieY,zombieX)
            zombieKilled ++;
            console.log('loa')
             document.getElementById('overworld').removeChild(document.getElementById(`Z${zombieName}`));
             clearInterval(zombieIntervals[zombieName][9]);
          delete zombies[zombieName];
          delete zombieIntervals[zombieName];
          clearInterval(bullets[bulletName][7]);
          clearInterval(bulletIntervals[bulletName]);
          document.getElementById('overworld').removeChild(document.getElementById(`B${bulletName}`));
          delete bullets[bulletName];
          delete bulletIntervals[bulletName];
          
          
          
         

        }}console.log(zombies[zombieName][12])
      });
    });
  }
  
  

  setInterval(asshole, 1);
  let coinNo = -1;
  function spawnCoin(zY,zX){
    coinNo ++;
    document.getElementById('overworld').innerHTML += `<img class="coin" id="C${coinNo}" src="object_frames/coin_frame1.png" onclick="coin_dialouge()" style="top:${zY}px;left:${zX}px;position:fixed;"></img>`
    coinObject[coinNo] = [coinNo,1,'',zX,zY]
    coinIntervals.push(
      function coinInterval(){
      let cID = coinObject[coinNo][0]
coinObject[cID][2] = setInterval(function(){
      coinObject[cID][1] ++;
   //   console.log(coinObject[cID])
      document.getElementById(`C${cID}`).src = `object_frames/coin_frame${coinObject[cID][1]}.png`;
      if(coinObject[cID][1] === 6){coinObject[cID][1] = 1};
 //     console.log('adfadf')
    },250)})
    coinIntervals[coinNo]()
  }
  function pickUpCoin (){
      Object.keys(coinObject).forEach((coinID) => {
        const coinX = coinObject[coinID][3] + 32;
        const coinY = coinObject[coinID][4] + 32;
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
      };
    setInterval(pickUpCoin,1)
    
  function checkZombieCharacterCollision(){
    Object.keys(zombies).forEach((zombieName) => {
      const zombieX = zombies[zombieName][0]+16;
      const zombieY = zombies[zombieName][1]+16;

        const dx = (positionX+48) - zombieX;
        const dy = (positionY+48) - zombieY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let collideD = 50; 
        if(dx>0 && dy>0){collideD = -50}
        if(dx<0){
      if(distance<35 && distance>0&&!draining){

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
  }}else  if(distance<60&&!draining){
 
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
}
setInterval(checkZombieCharacterCollision,16)
function died(){
  if (healthCount === 0){
    diedVar = true
    document.getElementById('overworld').style.display=`none`;
    document.getElementById('game-over-container').style.display=`flex`  
  }
}
setInterval(died,1)
function trade(item){
  if(coinCount>0 && item === 'bullet'){
    coinCount --;
    bulletNum += 20;
    document.getElementById('coin-count').innerHTML = `${coinCount}`;
    document.getElementById('bullet-count').innerHTML = `${bulletNum}`;
  }
  if(coinCount>4 && item === 'mana'){
    coinCount -= 5;
    manaPotionCount ++;
    document.getElementById('coin-count').innerHTML = `${coinCount}`;
    document.getElementById('mana-cube-count').innerHTML = `${manaPotionCount}`;
  }
  if(coinCount>2 && item === 'health'){
    coinCount -= 2;
    healthPotionCount ++;
    document.getElementById('coin-count').innerHTML = `${coinCount}`;
    document.getElementById('health-potion-count').innerHTML = `${healthPotionCount}`;
  }
  if(coinCount>0 && item === 'wall'){
    coinCount --;
    wallCount++;
    document.getElementById('coin-count').innerHTML = `${coinCount}`;
    document.getElementById('wall-count').innerHTML = `${wallCount}`;
  }
}
function tradePopUp(){
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
setInterval(closeTradePopUp,1)
function tradeSwitch(item){
  if(item === 'mana'){
    itemz = 'mana'
  document.getElementById('trade-popup').innerHTML = `
    <div id="trade-prev" style="cursor: pointer;" onclick="tradeSwitch('bullet')"><strong>&lt;</strong></div>
      <div id="trade-bullet" style="text-wrap: nowrap;padding-left:10px;padding-right:10px;">
        <strong style="margin-right:5px;">5</strong>
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
        <strong style="margin-right:5px;">1</strong>
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
          <strong style="margin-right:5px;">3</strong>
          <img src="object_frames/coin_frame1.png" width="15px">
          <span style="margin-left: 7.5px;margin-right:5px;"> -></span>
          <strong style="margin-left: 5px; margin-right:5px;">1</strong>
          <img src="object_frames/health_potion.png" height="20px">
          <button id="trade-button" onclick="trade('health')">Trade</button>
        </div>
        <div id="trade-next" style="cursor: pointer;" onclick="tradeSwitch('wall')"><strong>></strong></div>
      `}
   if(item === 'wall'){
  document.getElementById('trade-popup').innerHTML = `
  <div id="trade-prev" style="cursor: pointer;" onclick="tradeSwitch('health')"><strong>&lt;</strong></div>
        <div id="trade-wall" style="text-wrap: nowrap;padding-left:10px;padding-right:10px;">
          <strong style="margin-right:5px;">1</strong>
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
if(manaCount !== 100){
  if(manaPotionCount >0){
  if((manaCount > 50)){
    let oldManaCount = manaCount
    manaCount += (100-oldManaCount)
    manaPotionCount --;
  document.getElementById('mana-cube-count').innerHTML = `${manaPotionCount}`;
  document.getElementById('mana-bar').innerHTML = `MANA:${manaCount}`;
  manaWidth = (manaCount/100)*400;
        document.getElementById('mana-bar').style.width = `${manaWidth}px`;
  } else{
    
  manaCount += 50
  console.log(manaCount)
  manaPotionCount --;
  document.getElementById('mana-cube-count').innerHTML = `${manaPotionCount}`;
  document.getElementById('mana-bar').innerHTML = `MANA:${manaCount}`;
  manaWidth = (manaCount/100)*400;
        document.getElementById('mana-bar').style.width = `${manaWidth}px`;
  }
 }}
}
function addHealth(){
  if(healthCount !== 100){
    if(healthPotionCount>0){
    if((healthCount > 50)){
      let oldHealthCount = healthCount
      healthCount += (100-oldHealthCount)
      healthPotionCount --;
    document.getElementById('health-potion-count').innerHTML = `${healthPotionCount}`;
    document.getElementById('health-bar').innerHTML = `HP:${healthCount}`;
    healthWidth = (manaCount/100)*400;
          document.getElementById('health-bar').style.width = `400px`;
    } else{
      
    healthCount += 50
    console.log(healthPotionCount)
    healthPotionCount --;
    document.getElementById('health-potion-count').innerHTML = `${healthPotionCount}`;
    document.getElementById('health-bar').innerHTML = `HP:${healthCount}`;
    healthWidth = (healthCount/100)*400;
          document.getElementById('health-bar').style.width = `${healthWidth}px`;
          console.log(healthPotionCount)
    }
   }}
}

function roundManager(){
  if((zombieKilled)===zombieLimit){
    round ++
    if(zombieLimit>50){
      zombieSpawned = 1;
      zombieKilled = 0;
      zombieSpeed +=0.25
      zombieCooldown -=2.5
      spawnZombie()
    }else{
      projectileSpeed += 0.025;
    zombieLimit += 5;
    spawnZombie();
    console.log(zombieLimit)
    zombieSpawned = 1;
    zombieKilled = 0;
    zombieSpeed += 0.1;
    zombieCooldown -= 1;
    document.getElementById('round-container').innerHTML=`Round ${round}`}
  }
 // console.log(`roundmanager run`)
}


setInterval(function(){
  roundManager()
},10)
  
function gameLoop(){
  spawnZombie()
}
function controls(){
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
  `
}
function controlBack(){
  document.getElementById('welcome').style.height=`100vh`
  document.getElementById('welcome').innerHTML = `
  <div id="disclaimer" style="font-size:10px; position:fixed; top:0;left:0;">Disclaimer: All pixel art DO NOT originate from me.</div>
  <div id="title">COC N BALLZ</div>
    <div id="desc">Defend against zombie waves</div>

    <div id="welcome-buttons-container">
      <button id="play" class="welcome-buttons" onclick="gameLoop();startGameLoop()">Play</button>
      <button id="controls" class="welcome-buttons" onclick="controls()">Controls</button>
      <button id="credit" class="welcome-buttons" onclick="credit()">Credit</button>
    </div>
    <div id="version-info"><div>Version 1.1.1 </div> <button id="version-button" onclick="patch_notes()">Patch Notes</button></div>
  `
}
function credit(){
  document.getElementById('welcome').innerHTML = `
  <div id="disclaimer" style="font-size:10px; position:fixed; top:0;left:0;">Disclaimer: All pixel art DO NOT originate from me.</div>
  gae
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
  `
}
setTimeout(function(){alert('IMPORTANT: TURN OFF ALL ENERGY SAVERS IN YOUR BROWSER')},10)

function patch_notes(){
  document.getElementById('welcome').style.height=`750px`
  document.getElementById('welcome').innerHTML = `
  <div id="disclaimer" style="font-size:10px; position:fixed; top:0;left:0;">Disclaimer: All pixel art DO NOT originate from me.</div>
 <div class="patch-version"> - Version 1.0 - <span class="version-desc" id="v10">First release!</span></div>
 <div class="patch-version"> - Version 1.1 - <span class="version-desc" id="v11">
    1 &middot; New objects such as walls<br>
    2 &middot; Bug fixes for zombie and character collision.<br>
    3 &middot; Keybinds for healing, mana restoration and trading.<br>
     &middot; Release date: 12/11/2024</span></div>
 <div id="upcoming-version">---Upcoming Patches---</div>
  <div class="patch-version"> - Version 1.2 - <br><span class="version-desc" id="v12">
    1 &middot; Bosses :D<br>
    2 &middot; Difficulties<br>
    3 &middot; An almanac<br></span></div>
    <div class="patch-version"> - Version 1.3 - <br><span class="version-desc" id="v13">Coming Soon</span></div>
  </span></div>
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
  `
}
function place_wall(){
if(!placed && wallCount>0){
  wallCount --;
  document.getElementById('wall-count').innerHTML = `${wallCount}`;
  placed = true;
  if (movedDown){
    wallID ++;
    let wallY = positionY-100;
    let wallX = positionX+(75);
    if(wallY>480){wallY===480}
    document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
    document.getElementById(`W${wallID}`).style.position = `fixed`;
    document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
    document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
    document.getElementById(`W${wallID}`).style.width = `64px`;
    document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
    walls[wallID] = [wallX,wallY,100,false]
  } else if (movedUp){
    wallID ++;
    let wallY = positionY+100;
    let wallX = positionX+(75);
    if(wallY>480){wallY=480}
    document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
    document.getElementById(`W${wallID}`).style.position = `fixed`;
    document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
    document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
    document.getElementById(`W${wallID}`).style.width = `64px`;
    document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
    walls[wallID] = [wallX,wallY,100,false]
  } else if (movedLeft){
    wallID ++;
    let wallY = positionY+(96/2);
    let wallX = positionX-(70);
    if(wallY>480){wallY===480}
    document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
    document.getElementById(`W${wallID}`).style.position = `fixed`;
    document.getElementById(`W${wallID}`).style.top = `${wallY}px`;
    document.getElementById(`W${wallID}`).style.left = `${wallX}px`;
    document.getElementById(`W${wallID}`).style.width = `64px`;
    document.getElementById(`W${wallID}`).style.zIndex=`23123123123123123`;
    walls[wallID] = [wallX,wallY,100,false]
  } else if (movedRight){
    wallID ++;
    let wallY = positionY+(96/2);
    let wallX = positionX+100;
    if(wallY>480){wallY===480}
    document.getElementById('overworld').innerHTML += `<img id="W${wallID}" src="object_frames/wall.jpeg">`;
    document.getElementById(`W${wallID}`).style.position = `fixed`;
    document.getElementById(`W${wallID}`).style.top = `${positionY+(96/2)}px`;
    document.getElementById(`W${wallID}`).style.left = `${positionX+100}px`;
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
      clearInterval(bulletIntervals[bulletName]);
      document.getElementById('overworld').removeChild(document.getElementById(`B${bulletName}`));
      delete bullets[bulletName];
      delete bulletIntervals[bulletName];
      walls[wallName][2] -= 10;
      document.getElementById(`W${wallName}`).style.opacity = `0.5`;
      setTimeout(function(){
        document.getElementById(`W${wallName}`).style.opacity = `1`;
      },50)
      
    }
    if(walls[wallName][2]===0){
      clearInterval(bulletIntervals[bulletName]);
      delete bullets[bulletName];
      delete bulletIntervals[bulletName];
      document.getElementById('overworld').removeChild(document.getElementById(`W${wallName}`));
      delete walls[wallName];
    }
    console.log(walls[wallName][2])
  }})})
}
function checkWallZombieCollision() {
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
      let wall = walls[wallName];
      let wallOBJ = document.getElementById(`W${wallName}`).getBoundingClientRect();
      let wallX = wall[0];
      let wallY = wall[1];
      
      if (zX + intendedVelocityX < wallX + wallOBJ.width &&  zX + 32 + intendedVelocityX > wallX && zY+intendedVelocityY < wallY + wallOBJ.height &&  zY + 32 + intendedVelocityY > wallY) {
        zombie[15] = true;
        let repulsionX = 1;
        let repulsionY = 1;
        if ((zX - wallX)<0){repulsionX = -1}else{repulsionX = 1}
        if ((zY - wallY)<0){repulsionY = -1}else{repulsionY = 1}
        zombie[16] += repulsionX 
        zombie[17] += repulsionY 
        wall[2] -= 0.005;
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
        }
        console.log(`${repulsionX},${repulsionY}`)
      }
    });
  });
}


setInterval(function(){
  checkWallBulletCollision();
  checkWallCharacterCollision();
  checkWallZombieCollision();
},1)
