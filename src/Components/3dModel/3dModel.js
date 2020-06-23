import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import './3dstyle.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


var mixer;
var action;
var COUNTER = 0;
var renderer = new THREE.WebGLRenderer();
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.2, 20);
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);

camera.position.set(0, -1, 2);   // model position also changes


// orbit 3d env
var controls = new OrbitControls(camera, renderer.domElement);
controls.update();



var light = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 70);
directionalLight.position.set(10, 20, 20);
directionalLight.castShadow = true;

scene.add(directionalLight);

var light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 15);
light1.position.set(1, 5, 1);

scene.add(light1);

// let helper = new THREE.CameraHelper(camera);
// scene.add(helper);

var pointLight = new THREE.PointLight(0xFFFFFF, 2);
pointLight.position.set(0, 2, 2);
pointLight.castShadow = true;
scene.add(pointLight);



var spotLight = new THREE.SpotLight(0xFFFFFF, 2);
spotLight.position.set(200, 250, 600);
spotLight.target.position.set(10, 50, 0);
spotLight.castShadow = true;
scene.add(spotLight.target);
scene.add(spotLight);
//Set up shadow properties for the spotLight
spotLight.shadow.mapSize.width = 512; // default
spotLight.shadow.mapSize.height = 512; // default
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 15000; // default

class Model3D extends Component {
    constructor(props) {
        super(props);
        this.animateRef = React.createRef()
        this.state = {
            counter: 0,
            name: 'Next'
        }

    }
    componentDidMount = () => {
        //PLANE
        // var geometry = new THREE.PlaneGeometry(4, 4, 4);
        // var material = new THREE.MeshPhongMaterial({ color: 'rgba(255, 255, 255, 0)', side: THREE.DoubleSide });
        // var plane = new THREE.Mesh(geometry, material);
        // plane.rotation.x = - Math.PI / 2;
        // plane.position.set(0, -1, 0);   //make all zero to remove this plane from canvas
        // scene.add(plane);

        //LIGHT
        // var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        // scene.add(ambientLight);
        // var light = new THREE.PointLight(0xffffff, 0.8, 18);
        // light.position.set(0, 2, 4);
        // light.castShadow = true;
        // light.shadow.camera.near = 0.1;
        // light.shadow.camera.far = 25;
        // scene.add(light);

        // camera.position.z = 5;
        // camera.position.set(0, 0, 3);     // object position zoom on Z axis

        renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);  // canvas size
        this.animateRef.current.appendChild(renderer.domElement);
        renderer.setClearColor('lightgreen');    // surrounding yellow color


        // GLTF loader 
        this.load()

    }

    load = () => {
        var loader = new GLTFLoader();

        loader.load('models/tern_construct_animation.gltf', (gltf) => {

            // Taking animations from  gltf

            mixer = new THREE.AnimationMixer(gltf.scene);


            //-- Playing all animations of gltf 

            // gltf.animations.forEach((clip) => {
            //   mixer
            //     .clipAction(clip)
            //     .play();
            // });


            var animate = () => {

                requestAnimationFrame(animate);


                var delta = clock.getDelta();
                if (mixer !== null) {
                    mixer.update(delta);
                };
                renderer.render(scene, camera);
            };

            animate();

            let counter = this.state.counter;
            // let counter = 26;

            // console.log(counter)

            if (counter > gltf.animations.length) {
                this.setState({ name: 'Play' })
                // alert(counter)
            }

            renderAnimation(gltf, counter);

            scene.add(gltf.scene);
            action.setLoop(THREE.LoopOnce);
            gltf.scene.position.set(0, 0, 0);

            function renderAnimation(gltf, counter) {

                action = mixer.clipAction(gltf.animations[counter]);   //getting single animation
                action.play();
            };



        });

    }

    // ---------------------------outside compodidmount





    animateNext = () => {
        let counter = this.state.counter + 1;
        this.setState({ counter: counter })


        this.componentDidMount();

    }

    redirectToIntro = () => {

        return <Redirect to="/introduction" />

    }



    render() {

        if (this.state.name === "Play") {
            // alert('Play')
            this.redirectToIntro();

            return <Redirect to="/introduction" />
        }

        return (<div className="play-introduction">

            <div className="modelDiv" ref={this.animateRef}></div>
            <button className="NextButton button " onClick={this.animateNext}>{this.state.name}</button>

        </div>);
    }
}

export default Model3D;
