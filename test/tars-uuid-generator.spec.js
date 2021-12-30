var uuidGenerator = require('../index').uuidGenerator;

describe("test tars-uuid-generator.js", function(){
    test("test uuidGenerator", function(){
        expect(uuidGenerator.genID()).toHaveLength(32);
    })

    test("test init", function(){
        uuidGenerator.init("127.0.0.1")
        expect(uuidGenerator.genID()).toHaveLength(32);
    })
})