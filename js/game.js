const config = {
    type: Phaser.AUTO,
    width: 160,
    height: 144,
    parent: "game-container",
    pixelArt: false,
    backgroundColor: 'rgb(77,83,60)',
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 500 }
        }
      },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Phaser.Game(config);
let player;
let showDebug = false;
let cursors;

function preload() {
    this.load.sprite
    this.load.image("mainTiles", "assets/tilesets/tileset_extruded.png");
    this.load.image("brickTiles", "assets/tilesets/brickTiles.png");
    this.load.image("netTiles", "assets/tilesets/net.png");
    this.load.image("palette", "assets/tilesets/GBPalette.gif");
    this.load.spritesheet('gameboy', 'assets/gameboy.png', { frameWidth: 16, frameHeight: 16 });
    this.load.tilemapTiledJSON("map", "./assets/levels/testLevel.json")
}

function create() {
    const map = this.make.tilemap({key: "map"})
    const tileset = map.addTilesetImage("MapTiles","mainTiles", 16, 16)
    const behindPlayer = map.createStaticLayer("PlayerLayer", tileset, -100, -100)
    const camera = this.cameras.main;

    player = this.physics.add.sprite(100, 0, "gameboy");
    player.setBounce(0.1);
    
    cursors = this.input.keyboard.createCursorKeys();

    behindPlayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(player, behindPlayer);
    camera.startFollow(player);

    // Animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('gameboy', { start: 28, end: 33 }),
      frameRate : 8,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('gameboy', { start: 0, end: 3 }),
      frameRate : 8,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('gameboy', { start: 8, end: 9 }),
      frameRate : 0.5,
      repeat: -1
    });


    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('gameboy', { start: 14, end: 18 }),
      frameRate : 8,
      repeat: -1
    });
    
}

function update(time, delta) {
    var speed = 160;
    // player.body.setVelocity(0);
    
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0)
      player.anims.play('turn', true);
    }

    
    if (!player.body.blocked.down) {
     // player.anims.play('jump', true);
    }
    

    if (cursors.up.isDown && player.body.blocked.down)
    {
        player.setVelocityY(-230);
    }
}