var game = {
	
			w : 850,
			h : 200,
			fov : 75,
			player : {
				
        speed : 0.25,
				w : 3,
				h : .5,
				d : .5,
				x : 0,
				baton : null
			},
			offender : {
				
        speed : 0.1025,
				w : 3,
				h : .5,
				d : .5,
				x : 0,
				baton : null
			},
			ball : {
				
         speed : .125,
				w : .5,
				h : .5,
				d : .5,
				x : 0,
				z : 0,
				vel : {
					x : 0,
					z : 0
				},
				cube : null
			},
			stage : {
			
			    w : 15,
				h : 10,
				z : -5,
				mesh : null
			},
			reset : function(player){
				
        var ball_vel_z = game.ball.vel.z;
        
				if(player){
				
					game.player.score ++;
				
				}
        
				game.ball.z = -5;
				game.ball.x = 0;
        game.ball.vel.x = 0;
        game.ball.vel.z = 0;
        game.offender.x = 0;
        game.player.x = 0;
        
        setTimeout(function(){
          
          game.ball.vel.z = Math.abs(ball_vel_z) > 0 ? ball_vel_z : game.ball.speed;
          
        }, 1000);
        
        
				
			}
			
		},
		controller = {
		
			left 	: false,
			right 	: false
		},
	
		//  Three JS Setup
		view = {
		
			scene    : new THREE.Scene(),
			camera   : new THREE.PerspectiveCamera( game.fov, game.w / game.h, .1, 1000 ),
			renderer : new THREE.WebGLRenderer({alpha:true})
		}
		
	// Set the size of the renderer to game dimensions
	view.renderer.setSize( game.w, game.h ); 
	
	// Put the canvas element into document
	document.body.appendChild( view.renderer.domElement );

	
	// Game elements
	
	var baton_geometry = new THREE.CubeGeometry(game.player.w,game.player.h,game.player.d); 
	var cube_geometry = new THREE.CubeGeometry(game.ball.w,game.ball.h,game.ball.d); 
	var lime_material = new THREE.MeshLambertMaterial( { color: 0xc6e645 } ); 
	var orange_material = new THREE.MeshLambertMaterial( { color: 0xee9418 } ); 
	var cream_material = new THREE.MeshLambertMaterial( { color: 0xfff9eb } ); 
	
	game.player.baton = new THREE.Mesh( baton_geometry, lime_material ); 
	game.player.baton.position.y += game.player.h/2;
	
	game.offender.baton = new THREE.Mesh( baton_geometry, orange_material ); 
	game.offender.baton.position.y += game.offender.h/2;
	game.offender.baton.position.z -= 10;
	
	game.ball.cube = new THREE.Mesh( cube_geometry, cream_material ); 
	game.ball.cube.position.y += game.ball.h/2;
	
	game.ball.z = -5;
	
	view.scene.add( game.player.baton ); 
	view.scene.add( game.offender.baton ); 
	view.scene.add( game.ball.cube ); 
	
	var floor_geometry = new THREE.PlaneGeometry( 15, 10 );
	var brown_material = new THREE.MeshLambertMaterial( { color: 0x181009 } );
	game.stage.mesh = new THREE.Mesh( floor_geometry, brown_material );
	game.stage.mesh.material.side = THREE.DoubleSide;
	game.stage.mesh.rotation.x = 1.57079633;
	game.stage.mesh.position.z = -5;
	view.scene.add( game.stage.mesh );
	
	// Camera positioning
	
	// Player view
	view.camera.position.z = 2;
	view.camera.position.y = 2.5;
	view.camera.rotation.x = -0.3926990815;
	
	// Offender view
	//view.camera.position.z = -13;
	//view.camera.position.y = 2.5;
	//view.camera.rotation.x = 0.3926990815;
	//view.camera.rotation.y = 3.14159265;
	
	// Center birds eye view
	//view.camera.position.z = -5;
	//view.camera.position.y = 10;
	//view.camera.rotation.x = -1.57079633;
	
	// Side on
	//view.camera.position.z = -9;
	//view.camera.position.y = 1;
	//view.camera.position.x = -5;
	//view.camera.rotation.z = -1.57079633;
	//view.camera.rotation.y = -1.57079633;

	// Lighting in birds eye view
	var directionalLight = new THREE.DirectionalLight( 0xcccccc, 1 ); 
	
	directionalLight.position.set( 0, 1, 0 ); 
	view.scene.add( directionalLight );

	var directionalLight2 = new THREE.DirectionalLight( 0xcccccc, 1 ); 
	
	directionalLight2.position.set( 0, 1, 1 ); 
	view.scene.add( directionalLight2 );

	var directionalLight3 = new THREE.DirectionalLight( 0xcccccc, 1 ); 
	
	directionalLight3.position.set( 10, 1, 0 ); 
	view.scene.add( directionalLight3 );

	var directionalLight4 = new THREE.DirectionalLight( 0xcccccc, 1 ); 
	
	directionalLight4.position.set( -10, 1, 0 ); 
	view.scene.add( directionalLight4 );
	
	// Ambient light to soften birds eye directional
	var light = new THREE.AmbientLight( 0x101010 ); 
	view.scene.add( light );
	
	function render() { 
	
		if(controller.left && game.player.x - (game.player.w/2) > -(game.stage.w/2)){
			game.player.x -= game.player.speed;
			//view.camera.position.x -= 0.5;
		}
		
		if(controller.right && game.player.x + (game.player.w/2) < (game.stage.w/2)){
			game.player.x += game.player.speed;
			//view.camera.position.x += 0.5;
		}
	
		if(game.offender.x > game.ball.x && game.offender.x - (game.offender.w/2) > -(game.stage.w/2)){
			game.offender.x -= game.offender.speed;
			//view.camera.position.x -= 0.5;
		}
		
		if(game.offender.x < game.ball.x && game.offender.x + (game.offender.w/2) < (game.stage.w/2)){
			game.offender.x += game.offender.speed;
			//view.camera.position.x += 0.5;
		}
	
		game.ball.z += game.ball.vel.z;
     game.ball.x += game.ball.vel.x;
	
		game.ball.cube.position.z = game.ball.z;
		game.ball.cube.position.x = game.ball.x;
		game.player.baton.position.x = game.player.x;
		game.offender.baton.position.x = game.offender.x;
	
		// Collision
		if(	game.ball.z - (game.ball.d/2) <= game.stage.z - (game.stage.h/2) + (game.offender.d/2)){
			
			if( game.ball.x + (game.ball.d/2) > game.offender.x - (game.offender.w/2) &&
				
         game.ball.x - (game.ball.d/2) < game.offender.x + (game.offender.w/2)){
			  game.ball.vel.z *= -1;
        game.ball.vel.x = (game.ball.x - game.offender.x)/10;
        
			}else{
			
				//if(game.ball.z - (game.ball.d/2) < game.stage.z - (game.stage.h/2))
					game.reset(game.player);
			}
		}
		
		if(game.ball.z + (game.ball.d/2) >= 0 - (game.player.d/2)){
		
			if( game.ball.x + (game.ball.d/2) > game.player.x - (game.player.w/2) &&
				game.ball.x - (game.ball.d/2) < game.player.x + (game.player.w/2)){
				game.ball.vel.z *= -1;
        game.ball.vel.x = (game.ball.x - game.player.x)/10;
			}else{
			
				//if(game.ball.z + (game.ball.d/2) > 0)
					game.reset(game.offender);
			}
		
		}
    
    if(game.ball.x > (game.stage.w/2))
      game.ball.vel.x *= -1;
    
    if(game.ball.x < -(game.stage.w/2))
      game.ball.vel.x *= -1;
		
		requestAnimationFrame(render); 
		view.renderer.render(view.scene, view.camera); 
	} 
	
	render();

  game.reset();
	
	
	// Controllers
  document.onkeydown=function(e){
    
    if(e.keyCode == 37){
      controller.left = true;
    }
    
    if(e.keyCode == 39)
    {
      controller.right = true;
    } 
  };
  
  document.onkeyup=function(e){
    
    if(e.keyCode == 37){
      controller.left = false;
    }
    
    if(e.keyCode == 39)
    {
      controller.right = false;
    }
  };