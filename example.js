var fs            = require('fs');
var ds            = require("./DS");

function toUint8Array(buffer) {
    var out = new Uint8Array(buffer.length);
    for (var i = 0; i < buffer.length; ++i) {
        out[i] = buffer[i];
    }
    return out;
}

//生成密钥对过程
var test1 =function(id){
  var public_key = ds.KeyGenerator(id);  //生成密钥API
}

//签名过程
var test2 = function(id, _message){
  var private_key = toUint8Array(fs.readFileSync(id+"_private.pem"));
  var ds_para = {
    "curves": "curves25519",
    "private_key": private_key
  };
  var method = "Ed25519";
  _sig = ds.DsSigner(_message, method, ds_para); //签名API
  return _sig
}

//验证过程
var test3 = function(id, _message,_sig){
  public_key = toUint8Array(fs.readFileSync(id+"_public.pem"));
  ds_para = {
    "curves": "curves25519",
    "public_key": public_key
  };
  var method = "Ed25519";
  v = ds.DsVerifier(_message, _sig, method, ds_para); //验证签名API
  return v;
}

var id = "1234567";
var _message  = ds.string_to_Uint8Array("This is my message. You can tell people about this one.");
_sig=test2(id,_message);
console.log(new Buffer(_sig).toString('base64'));
console.log(_sig.length);
v=test3(id,_message,_sig);
console.log(v);
