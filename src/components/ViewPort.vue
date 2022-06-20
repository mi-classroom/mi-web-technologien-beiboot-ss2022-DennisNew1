<template lang="de">
    <div class="container" @mouseenter="lockView(false)" @mouseleave="lockView(true)" @resize="onResize">
        
    </div>
</template>
<script>
import * as three from 'three';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import Open_Sans_Regular from '@/assets/fonts/Open_Sans_Regular.json';

export default {
    data() {
        return {
            scene: {},
            camera: {},
            renderer: {},
            controls: {},
            axesHelper: {},
            clock: {},
            isLocked: true,
            sceneObjects: {},
            // some properties to change the look of the scene
            sceneProperties: {
                hallwaysize: 4,
                yearFontSize: 1,
                yearFontDepth: 0.25,
            },
            // Debugging purposes
            isControl: true

        }
    },
    props: {
        imageMetadata: Array,
    },
    mounted() {
        this.initScene();
        this.initControls();
        window.addEventListener("resize", this.onResize);
        this.enableAxisLines(true);      
        this.buildScene(); 
        this.animate();
    },
    methods: {
        initScene: function () {
            this.scene = new three.Scene();
            this.camera = new three.PerspectiveCamera( 75, this.$el.offsetWidth / this.$el.offsetHeight, 0.1, 1000 );

            this.renderer = new three.WebGLRenderer({
                antialias: true
            });
            this.renderer.setSize( this.$el.offsetWidth, this.$el.offsetHeight );
            this.$el.appendChild( this.renderer.domElement );

            // // testcube
            // const geometry = new three.BoxGeometry( 1, 1, 1 );
            // const material = new three.MeshBasicMaterial( { color: 0x00ff00 } );
            // const cube = new three.Mesh( geometry, material );
            // this.scene.add( cube );

            this.camera.position.z = 5; 
            this.camera.position.x = 1;

            // setting background color
            this.scene.background = new three.Color ("rgb(20, 20, 20)");

            //some light
            const light = new three.AmbientLight( 0x404040, 10 ); // soft white light
            this.scene.add( light );

            //
            this.clock = new three.Clock();
        },
        initControls() {
                this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
                this.controls.movementSpeed = 1;
                this.controls.lookSpeed = 1;
        },
        enableAxisLines(enable) {
            if (enable && this.axesHelper) {
                console.log("enabling axislines");
                this.axesHelper = new three.AxesHelper( 5 );
                this.scene.add( this.axesHelper );
            } else {
                this.scene.remove(this.axesHelper);
            }
        },
        animate: function () {
            window.requestAnimationFrame( this.animate );
            if (!this.isLocked &&  this.isControl) {
                this.controls.update(this.clock.getDelta());
            }           
            this.renderer.render( this.scene, this.camera );
        },
        buildScene: function () {

            console.log(this.imageMetadata);
            let oldXPos = 0;
            for(let i = 0; i < this.imageMetadata.length; i++) {
                    let newXPos = oldXPos + this.sceneProperties.hallwaysize;
                    let position = {
                            x: newXPos,
                            y: 0,
                            z: 0    
                        };
                    this.generateYearText(this.imageMetadata[i].year, position);
                    //this.generateWall(this.imageMetadata[i].items, position);

                    oldXPos = newXPos;
            }

            //this.generateWall(this.imageMetadata[0].items, {x: 0, y: 0, z:0});
            
        },
        generateCubes: function (number) {
            for (let i = 0; i < number; i++) {
                let geometry = new three.BoxGeometry( 1, 1, 1 );               
                let material = new three.MeshBasicMaterial( { color: 0x00ff00 } );
                let cube = new three.Mesh( geometry, material );
                cube.position.x = (Math.random() - 0.5) * 100;
                cube.position.z = (Math.random() - 0.5) * 100;
                cube.position.y = (Math.random() - 0.5) * 100;
                this.scene.add( cube );
            }
        },
        generateYearText: function (year, position) {
            const loader = new FontLoader();

            const font = loader.parse(Open_Sans_Regular);

            const textGeometry = new TextGeometry(year, {
                font: font, 
                size: this.sceneProperties.yearFontSize,
                height: this.sceneProperties.yearFontDepth,
            });
            const textMaterial = new three.MeshStandardMaterial( { color: "#ffffff"});
            const textMaterials = [ textMaterial, textMaterial]
            const textMesh = new three.Mesh(textGeometry, textMaterials);
            textMesh.position.x = position.x;
            textMesh.position.z = position.z;
            textMesh.position.y = position.y;
            textMesh.rotateY(-(Math.PI / 2));

            this.scene.add(textMesh);    
        },
        /*generateWall(items, position) {
            // generate wall

            // add images
        },*/
        lockView: function (isLocked) {
            this.isLocked = isLocked;
        },
        onResize: function() {
            console.log("resize");
            this.camera.aspect = this.$el.offsetWidth / this.$el.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.$el.offsetWidth, this.$el.offsetHeight);
            this.controls.handleResize();
            this.renderer.render(this.scene, this.camera);
        },
    },
    destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
    },
}
</script>
<style lang="css">
    .container {
        width: 100%;
        height: 100%
    }
</style>