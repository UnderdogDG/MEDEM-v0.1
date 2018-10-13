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
         Fog,
         Group, 
         MeshToonMaterial,
         SpotLight
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

var renderer = new WebGLRenderer({canvas: preview, alpha: true, antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize( width, height );
renderer.setClearColor( 0x000000, 0 );

var ambient = new AmbientLight(0xFF5A3C);
				scene.add(ambient);

var light = new SpotLight( 0xf5f5f5, 0.5, 0, 0.8, 0.5, 1.2);
light.position.set( 10, 10, 10 ); 			//default; light shining from top
light.castShadow = true;            // default false
renderer.shadowMap.type = PCFSoftShadowMap;
scene.add( light );

var moonLight2 = new THREE.PointLight(0xffffff, 0.6, 150);
moonLight2.position.set(0, 3.5, 0.7);
moonLight2.castShadow= true;
  scene.add(moonLight2);
  var sphereSize = 0.5;
var pointLightHelper = new THREE.PointLightHelper( moonLight2, sphereSize );
scene.add( pointLightHelper );

//Set up shadow properties for the light
light.shadow.mapSize.width = 1024;  // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.5;    // default
light.shadow.camera.far = 100;

var geometry = new BoxGeometry( 1, 1, 1 );
var material = new MeshPhongMaterial( {color: 0x717171,side: DoubleSide} );
var cube = new Mesh( geometry, material );
cube.castShadow = true; //default is false
cube.receiveShadow = true; //default
cube.position.set(0, 2, 0);
// scene.add( cube );

camera.position.z = 8;
camera.position.y = 1;

let ragnar = new Group();
const loader = new THREE.OBJLoader();
const texture = new TextureLoader().load('./model/defaultMat_Base_Color.png');
const normalMap = new TextureLoader().load('./model/Head_retopo_uv_F-NM_u0_v0_copy.tif');
const Ao = new TextureLoader().load('./model/defaultMat_Mixed_AO.png');
const skin = new MeshPhongMaterial({ map:texture, color: 0xdcdcdc, reflectivity: 0.8, shininess: 0, specular: 0xadff2f, aoMap: Ao, normalMap: normalMap});

loader.load( 'model/Ragnar.obj', 
      model=>{
        model.castShadow = false;
        model.receiveShadow = false;
        model.traverse( function (node){
          if (node.isMesh) node.material = skin;
        });
        ragnar.specular = 0xadff2f;
        ragnar.add(model);
        
        // model.scale.set(0.5,0.5,0.5);
        // model.position.set (0, -2, 0);
        // model.castShadow = true;
        // model.receiveShadow = true;
        // scene.add(model);

        // ragnar = new Mesh(model, skin);
        // ragnar.scale.set(0.5,0.5,0.5);
        // ragnar.position.set(0, -2, 0);
        // scene.add(ragnar);
      },
      xhr=>{ console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
      // called when loading has errors
      error=>{ console.log( 'An error happened' ); }
 );

        ragnar.scale.set(0.5,0.5,0.5);
        ragnar.position.set(0, -2, 0);
        ragnar.castShadow = true;
        ragnar.receiveShadow = true;
        scene.add(ragnar);


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