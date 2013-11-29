
window.onload = function() {

//----------------------------------------------------------
//
//      Creation et initialisation du premier rendu
//
//
  var r1 = new X.renderer3D(); // creation du contexte de rendu 
  // pour l'instant je n'y arrive qu'avec la 3D

  r1.container = 'r1'; // on indique qu'on veut mettre le premier rendu dans la div r1
  r1.orientation = 'X';
  r1.init(); // initialisation
 
//----------------------------------------------------------
//
//      Creation et initialisation du deuxieme rendu
//
//  
  var r2 = new X.renderer3D(); // creation du contexte de rendu 

  r2.container = 'r2';// on indique qu'on veut mettre le premier rendu dans la div r2
  r2.init(); // initialisation

//----------------------------------------------------------
//
//      Creation et initialisation du troisieme rendu
//
//  
  var r3 = new X.renderer3D(); // creation du contexte de rendu 
  r3.container = 'r3'; // on indique qu'on veut mettre le premier rendu dans la div r3
  r3.init(); // initialisation

 
//----------------------------------------------------------
//
//      2D -> j'ai pas compris pourquoi ca fonctionne pas pour l'instant !!!!
//
// 
/*
  //X
  r1 = new X.renderer2D();
  r1.container = 'r1';
  r1.orientation = 'X';
  r1.init();

  //Y
  var r2 = new X.renderer2D();
  r2.container = 'r2';
  r2.orientation = 'Y';
  r2.init();

  // Z
  var r3 = new X.renderer2D();
  r3.container = 'r3';
  r3.orientation = 'Z';
  r3.init();
*/

//----------------------------------------------------------
//
//      Creation du cube 
//
// 

  cube = new X.cube(); // le cube

  cube.lengthX = cube.lengthY = cube.lengthZ = 40; //Dimenssions du cube

  cube.center = [0, 0, 0]; //centre du cube
  cube.texture.file = 'http://x.babymri.org/?xtk.png';

  // [1,1,1] (== white) is also the default so this can be skipped aswell
  cube.color = [0, 1, 1];


    r1.add(cube); //ajout du cube au rendu 1

r1.onShowtime = function() {
    //on ajoute le cube aux autres vues, le cube est chargé qu'une fois
    r2.add(cube); //ajout du cube au rendu 2
    r3.add(cube); //ajout du cube au rendu 3

    r2.render();  //creation du rendu
    r3.render();  //creation du rendu
    
  };

    r1.render();  //creation du rendu

};
