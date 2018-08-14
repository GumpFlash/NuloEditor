//WebScript
const {remote} = require('electron');
var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

var filename = "";
var contentcache = "";

function minimize(){
     var window = remote.getCurrentWindow();
     window.minimize(); 
}

function maximize(){
     var window = remote.getCurrentWindow();
     if (!window.isMaximized()) {
         window.maximize();          
     } else {
         window.unmaximize();
     }
}

function closeBtn(){
     var window = remote.getCurrentWindow();
     window.close();
}

function save(){
    dialog.showSaveDialog((fileName) =>{
        if(fileName == undefined){
            alert("failed to Save");
            return;   
        }
    
        var content = myCodeMirror.getValue();

        fs.writeFile(fileName,content,(err)=>{
            if(err)console.log(err);
            alert("The File has been Saved!");
            filename = fileName;
            contentcache = content;
            document.getElementById('title').innerText = fileName;
            setInterval(verify,500);
        });
    });
}

function verify(){
    if(myCodeMirror.getValue() !== contentcache)
    document.getElementById('title').innerText = filename + "(unsaved)";
}

function closeMenu(){
    if(open){
        fileMenu(false);
    }
}

var open = false;

function fileMenu(bool){
    var tabMenu = document.getElementById('menu1');
    if(bool){
        tabMenu.style.zIndex = 5;
        tabMenu.style.opacity = 1;
        open = true;
    }else{
        tabMenu.style.zIndex = -2;
        tabMenu.style.opacity = 0;
        open = false;
    }
}


