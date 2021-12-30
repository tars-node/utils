var fs = require("fs");
var path = require("path");
var Configure = require("../index").Config;

describe("test tars-config.js", function(){
    test("test parseFile", function(){
        var configure = new Configure();
        configure.parseFile(path.resolve(__dirname, "./config.conf"), "utf8");
        expect(configure.get("tars.application.server.localip")).toBe("127.0.0.1");
        expect(configure.getDomain("tars.application.server")).toContainEqual("Adapter");
        expect(configure.getDomainLine("tars.application.server")).toEqual([ "localip=127.0.0.1", "local=tcp -h 127.0.0.1 -p 10031 -t 3000" ]);
        expect(configure.getDomainValue("tars.application.server")).toEqual([ { endpoint: "tcp -h 127.0.0.1 -p 10000 -t 60000" } ]);
        expect(configure.data).toHaveProperty("tars");
        expect(configure.json).toHaveProperty("tars");
    })

    test("test asyncParseFile", function(done){
        var configure = new Configure();
        configure.asyncParseFile(path.resolve(__dirname, "./config.conf"), "utf8", function(){
            expect(configure.get("tars.application.server.localip")).toBe("127.0.0.1");
            done();
        });
    })

    test("test parseText", function(){
        var sText = fs.readFileSync(path.resolve(__dirname, "./config.conf"), "utf8")
        var configure = new Configure();
        configure.parseText(sText, "utf8");
        expect(configure.get("tars.application.server.localip")).toBe("127.0.0.1");
    })
})