---
---
<!-- This file is machine generated: DO NOT EDIT! -->

# DS
---

DS is a javascript to call A2B CodeMap API methods of KeyGenerator(), DsSigner() and DsVerifier()

- - -
## Version:

* v0.1.0, 2016-05-21
* SHA1: 20b9cf082f0214b0620c7c2399281eeb4db198da *DS.js

- - -
## Requires:
* node (~=v0.10.32)
* crypto
* benchmark
* fs
* randomstring
* tweetnacl
* tweetnacl/nacl-fast
* js-nacl

- - -
## Functions and Classes

### <span id="ds">`src=api.atom2bit.com.cn/DS.js`</span>

Attributes:

  EdDSA: Edwards-curve Digital Signature Algorithm

- - -
#### <span id="KeyGenerator">`DS.KeyGenerator(id)`</span>

KeyPair generation using asymmetric random seed

##### Args:

* <b>`id`</b>: user id, char[16]

##### Return:

<b>`public_key`</b>: public key

**<font color=#DC143C>Save keyparis in local folder (Temporary disposal options)</font>

#### <span id="DsSigner">`DS.DsSigner(_MessageBytes, method, para)`</span>

Digital signature generation using asymmetric encryption private key

##### Args:

* <b>`_MessageBytes`</b>: information messages in bytes

* <b>`method`</b>: digital signautre method

	* EdDSA: EdDSA

 * <b>`para`</b>:
  * "curves": curves25519, default
	* "private_key": private key file path

##### Return:

<b>`_SignatureBytes`</b>: signature data bytes

- - -
#### <span id="DsVerifier">`DS.DsVerifier(_MessageBytes, _SignatureBytes, method, para)`</span>

Digital signature verifiy using asymmetric encryption public key

##### Args:

* <b>`_MessageBytes`</b>: information messages in bytes

* <b>`_SignatureBytes`</b>: signature data bytes from '_MessageBytes'

* <b>`method`</b>: digital signautre verified method

	* EdDSA: EdDSA, default

 * <b>`para`</b>:

	* "curves": curves25519, default
	* "public_key": public key file path

##### Return:

<b>`_VerifyCheckBoolean`</b>: boolean value of signature validation result

- - -
## Example

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


- - -
## Bug Contest

If you happen to find any bugs, join our [slack](http://atom2bit.slack.com) and tell us about it there.

- - -
## Troubleshooting
If you have any problems running the DS, here are a few things to try:
* Make sure you setup the right version of node using npm or nvm。
* If none of that helps, feel free to [email me](mailto:binxiaofeng@gmail.com) or [submit an issue](https://github.com/Atom2Bit/CodeMapAPI/issues). I might have left out an important detail here or there :).

- - -
## Contributors

* BENM <binxiaofeng@gmail.com>

- - -
## License

The MIT License (MIT)

Copyright &copy; 2016 [Atom2Bit](http://www.atom2bit.com.cn)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
