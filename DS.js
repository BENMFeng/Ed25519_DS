// __author__ = "BENM(Binxiao) FENG <binxiaofeng@gmail.com>"
// __copyright__ = "Copyright (c) 2016 BENM(Binxiao) FENG (Atom2Bit)"
// __version__ = "v0.1.0, 2016-05-21"

var crypto        = require('crypto');
var assert        = require('assert');
var Benchmark     = require('benchmark');
var fs            = require('fs');
var randomstring  = require("randomstring");

var tweetnacl     = require('tweetnacl');
var tweetnaclfast = require('tweetnacl/nacl-fast');
// var jsnacl        = require('js-nacl');

exports.base64_to_Uint8Array = function(input) {
  var raw = new Buffer(input, 'base64');
  var arr = new Uint8Array(new ArrayBuffer(raw.length));
  for(i = 0; i < raw.length; i++) {
    arr[i] = raw[i];
  }
  return arr;
};

exports.string_to_Uint8Array = function(str) {
  var raw = new Buffer(str, 'utf8');
  var arr = new Uint8Array(new ArrayBuffer(raw.length));
  for(i = 0; i < raw.length; i++) {
    arr[i] = raw[i];
  }
  return arr;
};

var base64_to_Uint8Array = function(input) {
  var raw = new Buffer(input, 'base64');
  var arr = new Uint8Array(new ArrayBuffer(raw.length));
  for(i = 0; i < raw.length; i++) {
    arr[i] = raw[i];
  }
  return arr;
};

var saveByteArray = (function () {
    return function (data, name) {
      var _bytes = new Buffer(data.length);
      for (var i = 0;i < data.length;i++) {
            _bytes[i] = data[i];
      }
      fs.writeFile(name, _bytes,  "binary",function(err) {
        if(err) {
            console.log(err);
        }
      });
    };
}());

exports.KeyGenerator = function(id){
    var seed = tweetnacl.randomBytes(32);
    var keypair = tweetnacl.sign.keyPair.fromSeed(seed);
    var KeyPair ={
      "private_key": keypair.secretKey,
      "public_key" : keypair.publicKey
    };
    saveByteArray(keypair.secretKey,id+"_private.pem");
    saveByteArray(keypair.publicKey,id+"_public.pem");

    return keypair.publicKey;
};

exports.DsSigner = function(_MessageBytes, method, para) {
  var private_key = para.private_key;
  var _SignatureBytes = tweetnacl.sign.detached(_MessageBytes, private_key);
  return _SignatureBytes
}

exports.DsVerifier = function(_MessageBytes, _SignatureBytes, method, para) {
  var public_key = para.public_key;
  var _VerifyCheckBoolean = tweetnacl.sign.detached.verify(_MessageBytes, _SignatureBytes, public_key);
  return _VerifyCheckBoolean
}

var DS = function() {
  this.base64_to_Uint8Array = base64_to_Uint8Array;
  this.string_to_Uint8Array = string_to_Uint8Array;
  this.KeyGenerator = KeyGenerator;
  this.DsSigner =  DsSigner;
  this.DsVerifier = DsVerifier;
}
