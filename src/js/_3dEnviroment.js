// #region [1] ======== ( VARS ) ========
// const THREE = require('three');

import { Scene, 
         PerspectiveCamera, 
         WebGLRenderer,
         DirectionalLight,
         BoxGeometry,
         MeshPhongMaterial,
         Mesh,
         DoubleSide,
         PCFSoftShadowMap
       } from 'three';

let width = document.getElementById('container').offsetWidth;
let height = document.getElementById('container').offsetHeight;
// #endregion   ========================

// #region [2] ======== ( CONFIG ) ========
var scene = new Scene();
var camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );

var renderer = new WebGLRenderer({canvas: preview, alpha: true});
renderer.shadowMap.enabled = true;
renderer.setSize( width, height );
renderer.setClearColor( 0x000000, 0 );
// document.body.appendChild( renderer.domElement );

var light = new DirectionalLight( 0xffffff, 1, 100 );
light.position.set( 0, 1, 0 ); 			//default; light shining from top
light.castShadow = true;            // default false
renderer.shadowMap.type = PCFSoftShadowMap;
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;    // default
light.shadow.camera.far = 500;

var geometry = new BoxGeometry( 1, 1, 1 );
var material = new MeshPhongMaterial( {color: 0x717171,side: DoubleSide} );
var cube = new Mesh( geometry, material );
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
   renderer.render( scene, camera );
   cube.rotation.x += 0.01;
   cube.rotation.y += 0.01;
}

window.addEventListener('resize',
   function () {
      width = document.getElementById('container').offsetWidth;
      height = document.getElementById('container').offsetHeight;
      console.log(`Resized... W: ${width}, H: ${height}`);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize( width, height );
   // var centro = window.innerWidth/2;
   // document.getElementById('jk').style.left = (centro-30)+'px';
   }
);


animate();
// #endregion   ========================