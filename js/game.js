const config = {
    type: Phaser.AUTO,
    width: 160,
    height: 140,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 400 }
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
    this.load.image("mainTiles", "assets/tilesets/tiles.png");
    this.load.image("brickTiles", "assets/tilesets/brickTiles.png");
    this.load.image("netTiles", "assets/tilesets/net.png");
    this.load.image("palette", "assets/tilesets/GBPalette.gif");
    this.load.spritesheet('gameboy', 'assets/gameboy.png', { frameWidth: 16, frameHeight: 16 });
    this.load.tilemapTiledJSON("map", "./assets/levels/testLevel.json")
}

function create() {
    const map = this.make.tilemap({key: "map"})
    const tileset = map.addTilesetImage("MapTiles","mainTiles")
    const behindPlayer = map.createStaticLayer("PlayerLayer", tileset, -100, 10)
    const camera = this.cameras.main;

    player = this.physics.add.sprite(0, 0, "gameboy");
    player.setBounce(0.1);

    // Set up the arrows to control the camera
    cursors = this.input.keyboard.createCursorKeys();

    behindPlayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(player, map);
    camera.startFollow(player);
/*
    this.input.keyboard.once("keydown_D", event => {
        this.physics.world.createDebugGraphic();
        const graphics = this.add
          .graphics()
          .setAlpha(0.75)
          .setDepth(20);
          behindPlayer.renderDebug(graphics, {
          tileColor: null,
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
          faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
      });*/
}

function update(time, delta) {
    var speed = 100;
    player.body.setVelocity(0);
    
    if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
      }

    if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
    }

    // player.body.velocity.normalize().scale(100);

}