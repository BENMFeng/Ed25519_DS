var fs            = require('fs');
var ds            = require("./DS");

var argv = require('yargs').argv;

function toUint8Array(buffer) {
    var out = new Uint8Array(buffer.length);
    for (var i = 0; i < buffer.length; ++i) {
        out[i] = buffer[i];
    }
    return out;
}

function readFile(file){
    fs.readFile(file, function(err, data){
        if(err)
            console.log("读取文件fail " + err);
        else{
            // 读取成功时
            // 输出字节数组
            //console.log(data);
            // 把数组转换为gbk中文
            //var str = iconv.decode(data, 'utf-8');
            //console.log(str);
            return data;
        }
    });
}

//生成密钥对过程
var genrate_key =function(id){
  var public_key = ds.KeyGenerator(id);  //生成密钥API
  return public_key;
}

//签名过程
var sign_data = function(id, _message){
  var private_key = toUint8Array(fs.readFileSync(id+"_private.pem"));
  var ds_para = {
    "curves": "curves25519",
    "private_key": private_key
  };
  var method = "EdDSA";
  _sig = ds.DsSigner(_message, method, ds_para); //签名API
  return _sig
}

//验证过程
var verify_sign = function(id, _message,_sig){
  public_key = toUint8Array(fs.readFileSync(id+"_public.pem"));
  ds_para = {
    "curves": "curves25519",
    "public_key": public_key
  };
  var method = "EdDSA";
  v = ds.DsVerifier(_message, _sig, method, ds_para); //验证签名API
  return v;
}

//var check_string = function(str){
//    fs.stat(str, function(err, stats) {
//    if (err==null) {
//        if(stats.isFile()) {
//            return false;
//        }else{
//            return true;
//        }
//    }else{
//        return true;
//    }});
//}

var id = argv.id;

if (argv.gen_key && id){
    var public_key = genrate_key(id);
    console.log("Generate ed25519  key-pair succeed!")
    console.log("Public key:",new Buffer(public_key).toString('base64'));
}else if(argv.sign && id){
    
    var _message;
    if (argv._.length>0){
        _message  = toUint8Array(fs.readFileSync(argv._[0]));  //ds.string_to_Uint8Array("This is my message. You can tell people about this one.");
        console.log("Input data file:",argv._[0]);
    }else{
        _message  = toUint8Array(fs.readFileSync(argv.sign));
        console.log("Input data file:",argv.sign);
    }
    
    //console.log(_message);
    
    var _sig=sign_data(id,_message);
    console.log("Signature base64 string:",new Buffer(_sig).toString('base64'));
    //console.log(_sig.length);
    var v=verify_sign(id,_message,_sig);
    console.log("Signature verification :",v);
}else if (argv.verify && id){
    var _message;
    //var _sig;
    if (argv._.length>1){
        _message = toUint8Array(fs.readFileSync(argv._[1]));
        _sig = ds.base64_to_Uint8Array(argv._[0]);
    }else{
        _message = toUint8Array(fs.readFileSync(argv._[0]));
        _sig = ds.base64_to_Uint8Array(argv.verify);
    }
    var v=verify_sign(id,_message,_sig);
    console.log("Signature verification :",v);
}else{
    console.log("demo.js");
    console.log("----------------------------------------------------------");
    console.log("1. Generate Key-pair CMD: node.js --id user_id --gen_key");
    console.log(" Example: node demo.js --id 7654321 --gen_key");
    console.log();
    console.log("2. Sign Message CMD: node.js --id user_id --sign input.dat");
    console.log(" Example: node demo.js --id 7654321 --sign demo.js");
    console.log();
    console.log("3. Verify Message's signature CMD: node.js --id user_id --verify signature_base64String input.dat");
    console.log(" Example: node demo.js --id 7654321 --verify 'vANC2fpFGKJU21Mm1a2mEj1EAN1LTNRoRqeoif892W0WbVsdgETsMYZ6Hm3D/mRDOUZ4SZnl2JJqVKYth/QRCw==' demo.js")
}
