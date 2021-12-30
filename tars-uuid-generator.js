/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */

'use strict';
var os = require("os");

function UuidGenerator(){
    this.ip = 0;
    this.pid = 0;
    this.seq = 0;
    this.initOK = false;
    this.uuidBuf = "allocUnsafe" in Buffer ? Buffer.allocUnsafe(16) : new Buffer(16)
    this.init("")
}

//最大 uint32，超过后写入会报错
UuidGenerator.MAX_SEQ = 4294967295;
/**
 * 初始化uuid生成器
 * @param {*} sIP 
 * @returns 
 */
UuidGenerator.prototype.init = function(sIP){
    if (this.isIPV4(sIP))
    {
        this.ip = this.ipv4Toint(sIP);
    } else {
        this.ip = this.ipv4Toint(this.getLocalIP());
    }
    if (this.ip == 0)
    {
        this.initOK = false;
        return;
    }
    this.pid = process.pid;
    this.seq = 0;
    this.uuidBuf.writeUInt32BE(this.ip);
    this.uuidBuf.writeUInt32BE(this.pid, 4);
    this.initOK = true;
}

/**
 * 判断是否是ipv4字符
 * @param {*} sIp 
 * @returns 
 */
UuidGenerator.prototype.isIPV4 = function(sIp){
    if(!sIp) return false
    var vs = sIp.split(".");
    if (vs.length != 4)
    {
        return false;
    }
    for (var i = 0; i < vs.length; i++)
    {
        if(isNaN(vs[i])) return false;
        var vsItem = Number(vs[i]);
        if(vsItem < 0 ||vsItem > 255)
        {
            return false;
        }
    }
    return true;
}

/**
 * ipv4字符转int
 * @param {*} sIp 
 * @returns 
 */
UuidGenerator.prototype.ipv4Toint = function(sIp){
    var vs = sIp.split(".");
    if (vs.length != 4)
    {
        return 0;
    }
    var ipInt = 0;
    for (var i = 3; i >= 0; i--)
    {
        if(isNaN(vs[i])) return 0;
        var vsItem = Number(vs[i]);
        if (vsItem < 0 || vsItem > 255)
        {
            return 0;
        }
        else
        {
            ipInt = ((ipInt << 8) + vsItem) >>> 0;
        }
    }
    return ipInt;
}

UuidGenerator.prototype.getLocalIP = function(){
    var interfaces = os.networkInterfaces();
    for(var key in interfaces){
        var face = interfaces[key];
        for(var i =0; i < face.length; i++){
            let alias = face[i];
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                return alias.address;
            }
        }
    }
    return "127.0.0.1";
}

UuidGenerator.prototype.genID = function(){
    if(!this.initOK) return "";
    this.uuidBuf.writeUInt32BE(new Date().getTime() / 1000, 8);
    if(this.seq >= UuidGenerator.MAX_SEQ) this.seq = 0;
    this.uuidBuf.writeUInt32BE(this.seq, 12);
    this.seq++;
    return this.uuidBuf.toString("hex");
}

module.exports = new UuidGenerator()