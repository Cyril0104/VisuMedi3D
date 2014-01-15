
/*
window.onload = function() {

  

  r1 = new X.renderer2D();
  r1.container = 'r1';
  r1.orientation = 'X';
  r1.init();
  // .. for Y
  var r2 = new X.renderer2D();
  r2.container = 'r2';
  r2.orientation = 'Y';
  r2.init();
  // .. and for Z
  var r3 = new X.renderer2D();
  r3.container = 'r3';
  r3.orientation = 'Z';
  r3.init();

  var r4 = new X.renderer3D();

  r4.container = 'r4';
  //r4.orientation = 'X';
  r4.init();
  r4.camera.position = [0,100,0];



  volume = new X.volume();

  volume.file = '../temp/exemple1.nrrd';
  //volume.file = 'http://x.babymri.org/?vol.nrrd'; //test avec fichier nrrd de XTK
  //volume.file = 'test.dcm';


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {

    r1.render();
    r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();

    //rendu 3D
    r4.add(volume);
    r4.render();

// les lignes si dessous font en sorte que le rendu soit volumique 
    volume.volumeRendering = true; //activation de la 3D
    volume.lowerThreshold = 80;
    volume.windowLower = 115;
    volume.windowHigh = 360;

    //les couleurs qui influent sur tous les canvas
    volume.minColor = [0, 0.06666666666666667, 1]; 
    volume.maxColor = [0.5843137254901961, 1, 0];

    //opacité
    volume.opacity = 0.2;

  };
  
};
*/

//====================================================================
//
//      ANCIENNE VERSION A CONSERVER AU CAS OU !!!!
//


window.onload = function() {

  r1 = new X.renderer2D();
  r1.container = 'r1';
  r1.orientation = 'X';
  r1.init();
  // .. for Y
  var r2 = new X.renderer2D();
  r2.container = 'r2';
  r2.orientation = 'Y';
  r2.init();
  // .. and for Z
  var r3 = new X.renderer2D();
  r3.container = 'r3';
  r3.orientation = 'Z';
  r3.init();
  
  var r4 = new X.renderer3D();

  r4.container = 'r4';
  //r4.orientation = 'X';
  r4.init();
  r4.camera.position = [0,100,0];

  volume = new X.volume();



  //volume.file = '../temp/test.nrrd';
  volume.file = 'http://x.babymri.org/?vol.nrrd'; //test avec fichier nrrd de XTK

  //volume.file = 'test.dcm';


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {

    r1.render();
    r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();

    //rendu 3D
    r4.add(volume);
    r4.render();

    // les lignes si dessous font en sorte que le rendu soit volumique 
    volume.volumeRendering = true; //activation de la 3D
    volume.lowerThreshold = 80;
    volume.windowLower = 115;
    volume.windowHigh = 360;

    //les couleurs qui influent sur tous les canvas
    volume.minColor = [0, 0.06666666666666667, 1]; 
    volume.maxColor = [0.5843137254901961, 1, 0];

    //opacité
    volume.opacity = 0.2;

};

};

