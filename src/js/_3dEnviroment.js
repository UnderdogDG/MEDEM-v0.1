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
         PCFSoftShadowMap,
         TextureLoader,
         MeshBasicMaterial,
         AmbientLight,
         Fog
       } from 'three';

      //  import * as THREE from 'three';
       import * as OBJLoader from 'three-obj-loader';

       const THREE = require('three');
      //  const OBJLoader = require('three-obj-loader');

       OBJLoader(THREE);

let width = document.getElementById('container').offsetWidth;
let height = document.getElementById('container').offsetHeight;
// #endregion   ========================

// #region [2] ======== ( CONFIG ) ========
var scene = new Scene();
scene.fog = new Fog(0x001a2d, 6, 10);

var camera = new PerspectiveCamera( 45, width / height, 3, 12 );

var renderer = new WebGLRenderer({canvas: preview, alpha: true});
renderer.shadowMap.enabled = true;
renderer.setSize( width, height );
renderer.setClearColor( 0x000000, 0 );

var ambient = new AmbientLight(0xFF5A3C);
				scene.add(ambient);

var light = new DirectionalLight( 0xffffff, 1, 20 );
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

camera.position.z = 8;
camera.position.y = 1;

let ragnar;
const loader = new THREE.OBJLoader();
const texture = new TextureLoader().load('./model/defaultMat_Base_Color.png');
const skin = new MeshBasicMaterial({map: texture, side: DoubleSide});

loader.load( 'model/Ragnar.obj', 
      function(model){
        ragnar = model;
        model.traverse( function (node){
          if (node.isMesh) node.material = skin;
        });
        model.scale.set(0.5,0.5,0.5);
        model.position.set (0, -2, 0);
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);

        // ragnar = new Mesh(model, skin);
        // ragnar.scale.set(0.5,0.5,0.5);
        // ragnar.position.set(0, -2, 0);
        // scene.add(ragnar);
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
      }
 );


 let other = loader.load( 
   'model/Ragnar.obj',
   model => {
    model.scale.set(0.2,0.2,0.2);
    model.position.set (0, -2, 0);
    return model
    },
   xhr => {console.log('Other: ', ( xhr.loaded / xhr.total * 100 ) + '% loaded' )},
   error => {console.log( 'An error happened' )}
 );

 console.log("OBJ: ",other);

 const mod = new Mesh( other, material );

  mod.scale.set(0.2,0.2,0.2);
  mod.position.set (0, -2, 0);

 scene.add(mod);


function animate() {
	requestAnimationFrame( animate );
   renderer.render( scene, camera );
   cube.rotation.x += 0.01;
   cube.rotation.y += 0.01;
  //  ragnar.rotation.x += 0.01;
   ragnar.rotation.y += 0.01;
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


window.addEventListener('load', function(){
  animate();
})
// #endregion   ========================