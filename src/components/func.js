var data=0;

function add(){
    data++;
}

export var a=()=>{add();
    console.info("exporting",data)};