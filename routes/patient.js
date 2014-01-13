
/*
 * GET patient viewer.
 */


 
exports.viewer = function(req, res){
    
    var libxmljs = require("libxmljs");//npm install libxmljs
    var fs = require("fs");//pour lire un fichier


    var xml = fs.readFileSync("public/temp/tempxml/0.xml", "utf-8");

    var xmlDoc = libxmljs.parseXmlString(xml);

    // xpath queries : first node with tag 'element' and attribute 'name' as 'PatientName'
    var p_name = xmlDoc.get("//element[@name='PatientName']").text();
    var p_name_split = p_name.split("^");
    var p_id = xmlDoc.get("//element[@name='PatientID']").text();
    var p_sex = xmlDoc.get("//element[@name='PatientSex']").text();
    var p_columns = xmlDoc.get("//element[@name='Columns']").text();
    var p_rows = xmlDoc.get("//element[@name='Rows']").text();
    var p_pixelspacing=xmlDoc.get("//element[@name='PixelSpacing']").text();
    var p_slicelocation=xmlDoc.get("//element[@name='SliceLocation']").text();

    // Only for debugging

    /*console.log(JSON.stringify({
        patient_firstname: p_name_split[0],
        patient_lastname: p_name_split[1],
        patient_id: p_id,
        patient_sex: p_sex
    }));*/

    res.render('viewer', { 
        title: 'Viewer', 
        name: p_name, 
        pid:p_id, 
        sex:p_sex, 
        columns:p_columns, 
        rows:p_rows, 
        pixelspacing:p_pixelspacing, 
        slicelocation:p_slicelocation
    });
};


/*
 * POST patient files.
 */


exports.upload = function(req, res){
    //console.log(req.files);
    var file = req.files.file;
    var sys = require('sys')
    var exec = require('child_process').exec;
    var fs = require("fs");
 
    //console.log('Temp file path: ' +  file.path);
    //console.log('Original file name: ' + file.name);
    
    var str = file.name.split(".");

    if (str[(str.length)-1]=='dcm'){
        function puts(error, stdout, stderr) { sys.puts(stdout)}
        exec("dcm2xml "+ file.path +" public/temp/test.xml", puts);

        // RAW file in "try" folder to using binary data
        exec("dcmdump "+ file.path +" +W public/temp",puts);
        res.redirect('viewer');
        }


    else if (str[(str.length)-1]=='zip'){

        // For no collision erasing previous contents 
        exec("rm -rf public/temp/CT/* ", function (error, stdout, stderr) {
            exec("rm -rf public/temp/tempxml/* ", function (error, stdout, stderr) {
                exec("rm -rf public/temp/tempraw/* ", function (error, stdout, stderr) {
                    
                    // Unzip it
                    exec("unzip " +file.path+ " -d public/temp", function (error, stdout, stderr) {
                    
                    files = fs.readdirSync("public/temp/CT");
                    //console.log(files);

                    function puts(error, stdout, stderr) { sys.puts(stdout)}
                    
                    
                    // Collect of XML & RAW data from DCM files
                    for (var i=2; i<files.length; ++i){
                        exec("dcm2xml public/temp/CT/"+ files[i] +" public/temp/tempxml/"+(i-2)+".xml",puts);

                        exec("dcmdump public/temp/CT/"+ files[i] +" +W public/temp/tempraw",puts); 
                    }

                    // Creating XML with RS //

                    exec("dcm2xml public/temp/test.RS public/temp/RS.xml", puts);
                    

                    // Creating NRRD file without using Buffer 
                    // Bug with NRRD //

                    
                    Rawfiles = fs.readdirSync("public/temp/tempraw");
                    Rawfiles.sort();
                    fs.appendFileSync('public/temp/test.nrrd','NRRD0001\n# my first nrrd\ntype: uchar\ndimension: 3\nsizes: 111 512 512\nencoding: raw\n');
                    
                    for (var i=0; i<Rawfiles.length; ++i){
                        var tmp= fs.readFileSync('public/temp/tempraw/'+Rawfiles[i]+'');
                        fs.appendFileSync('public/temp/test.nrrd',tmp);
                    }

                    //var NRRDbuffer = new Buffer(8);
                    exec('rm public/temp/' + file.path +'');
                    res.redirect('viewer');
                    });
                });
            });
        });
    }

};


/////////////////////////
// SOCKET IO test but we're going to use WS (check e-mail)

exports.send_pixel_data = function(socket){
    var array = new Uint16Array(10);
    for (var i=0; i<array.length; ++i)
        array[i] = i * 10000.0 / 1.23658;

    socket.emit('data', {
        name: 'Charlie',
        pixel_data: array
    });
};

