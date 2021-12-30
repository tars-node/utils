var Endpoint = require('../index').Endpoint;

describe("test tars-endpoint.js", function(){
    test("test parse endpoint", function(){
        var endpoint = Endpoint.parse('tcp -h 127.0.0.1 -p 10000 -t 60000');
        expect(endpoint.toString()).toBe("tcp -h 127.0.0.1 -p 10000 -t 60000");
        expect(endpoint.copy().toString()).toBe("tcp -h 127.0.0.1 -p 10000 -t 60000");
    })

    test("test parse not support", function(){
        var endpoint = Endpoint.parse('ws://127.0.0.0:8080');
        expect(endpoint).toBe(undefined);
    })

})