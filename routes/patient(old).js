
/*
 * GET patient viewer.
 */

 
exports.viewer = function(req, res){
    
    var libxmljs = require("libxmljs");//npm install libxmljs
    var fs = require("fs");//pour lire un fichier


    var xml = fs.readFileSync("public/temp/test.xml", "utf-8");

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
        exec("dcmdump " +file.path+" +W public/temp",puts);
        res.redirect('viewer');
        }


    else if (str[(str.length)-1]=='zip'){
        exec("unzip " +file.path+ " -d public/temp");
        //exec("unzip -l "+file.path+" > public/temp/list.txt");

        var callbackzip=function (error, response, body) {
            fs.readFile("public/temp/list.txt",'utf-8', function (err, contenu) {
                if (err) throw err;
        

                var tab = contenu.split(".dcm\n");

                function executiondcm(tab){
                    console.log("a"+tab[0]+"b");
                    function puts(error, stdout, stderr) { sys.puts(stdout)}
                    exec("dcm2xml "+ tab[0] +".dcm public/temp/test.xml",puts);
                    exec("dcmdump "+ tab[0] +".dcm +W public/temp",puts);
                    res.redirect('viewer');
                    };

                executiondcm (tab);
                });
        };

        //fonction non robuste a debugger
        exec("find public/temp/CT -name *.dcm | sort -d > public/temp/list.txt",callbackzip);
        //exec("head -n 1 public/temp/list.txt");
        

        //exec("dcm2xml "+ char +" public/temp/test.xml", puts);
        //exec("dcmdump " +char+" +W public/temp",puts);
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

