//button for modal
let btn = document.querySelector(".close");

//constructor for players
class Hero {
    constructor() {
       
        this.step = 101;
        this.jump = 83;
        this.startX= this.step *2;
        this.startY= this.jump * 5;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = "images/char-boy.png";
    }
    //renders player image on board
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //moves player with arrow keys
    handleInput(input) {
        switch(input) {
            case 'left':
            this.x -= this.step;
            break;
            case 'up':
            this.y -= this.jump;
            break;
            case 'right':
            this.x += this.step;
            break;
            case 'down' :
            this.y += this.jump;
            break;

        }
          }
    update(dt) {
        //checks collision points
    for(let enemy of allEnemies) {
        if (this.x < enemy.x +60 &&
            this.x + 30 > enemy.x &&
            this.y < enemy.y + 25 &&
            30 + this.y > enemy.y){
            this.x = 200;
            this.y = 400;
            }
    //stops the player from moving beyond the boundaries
            if(this.y > 380) {
                this.y = 380;
            }
            if(this.x >400) {
                this.x = 400;
            }
            if(this.x <0) {
                this.x = 0;
            }

// if the player reaches the water they win & get reset to orginal coordinates
            if(this.y < 0) {
                this.x =200;
                this.y = 400;
                //if player reaches water modal pops up
                const modal = document.getElementById("myModal");
                modal.style.display = "block";
                //when player clicks on x modal closes
            btn.onclick = function() {
                modal.style.display = "none";
                    }
                }
            }
        } 
    }
// variable for player
const player = new Hero();
//constructor for enemies
class Enemy {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.sprite= "images/enemy-bug.png";
        this.speed = Math.floor((Math.random() *75)+ 100);
    }
    //renders the bug image
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(dt) {
        if (this.x < 500) {
            this.x += this.speed * dt;
        }else {
            this.x = -5;
        }
    }
}
//array of enemies
const allEnemies = [];
//starting coordinates of enemies
const enemyPosition = [60, 140, 220];
//loop through enemies
enemyPosition.forEach(function(posY){
    const enemy = new Enemy(0, posY, 100 + Math.floor(Math.random()*512));
    allEnemies.push(enemy);
})
// This listens for key presses and sends the keys to your player
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
