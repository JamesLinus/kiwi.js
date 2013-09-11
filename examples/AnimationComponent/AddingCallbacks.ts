/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can add callbacks to animation items.
**/

class AddingCallbacks extends Kiwi.State {

    constructor() {
        super('AddingCallbacks');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
    }

    zombie: Kiwi.GameObjects.Sprite;
    currentAnimation: string;       //for us to keep track of which animation is currently playing

    create() {

        //create our sprite
        this.zombie = new Kiwi.GameObjects.Sprite(this,this.textures.zombie, 100, 10);

        //add some animations to the zombag and keep a reference to the animations
        var ex = this.zombie.animation.add('explode', [1, 11, 12, 13, 14, 15], 0.1, false);
        var re = this.zombie.animation.add('rebuild', [15, 14, 13, 12, 11, 1], 0.1, false);

        /**
        * Using the animation references, add a callback to each one when they stop.
        *
        * Note: 'onStop' is a signal event that gets fired when an animation stops playing. 
        * There are also:
        * - onPlay
        * - onUpdate
        * - onLoop
        **/
        ex.onStop.add(this.switchAnim, this);
        re.onStop.add(this.switchAnim, this);
        
        //add zombag to screen
        this.addChild(this.zombie);
        
        //play the animation
        this.zombie.animation.play('explode');
        this.currentAnimation = 'explode';
    }

    /**
    * This is the method that should be called When one of the animations stops. All it does is switch to the next one.
    **/
    switchAnim() {

        if (this.currentAnimation == 'rebuild') {
            this.currentAnimation = 'explode';
            this.zombie.animation.play('explode');

        } else {
            this.currentAnimation = 'rebuild';
            this.zombie.animation.play('rebuild');

        }
    }

}