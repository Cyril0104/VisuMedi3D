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


  volume = new X.volume();

  volume.file = '../temp/test.nrrd';
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


  };
  
};

//====================================================================
//
//      ANCIENNE VERSION A CONSERVER AU CAS OU !!!!
//

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
  

  volume = new X.volume();



  volume.file = '../temp/test.nrrd';
  //volume.file = 'test.dcm';


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {

    r1.render();
    r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();

  };
  
};

*/