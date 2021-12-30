var tarsPromise = require("../index").Promise;

describe("test tars-promise.js", function(){
    test("test tarsPromise", function(done){
        new tarsPromise(function(resolve, reject){
            setTimeout(function(){
                resolve()
                done()
            }, 200)
        })
    })

    test("test tarsPromise defer resolve", function(done){
        var defer = tarsPromise.defer()
        defer.promise.then(function(){
            done()
        })
        setTimeout(function(){
            defer.resolve()
        }, 200)
    })

    test("test tarsPromise defer reject", function(done){
        var defer = tarsPromise.defer()
        defer.promise.catch(function(){
            done()
        })
        setTimeout(function(){
            defer.reject()
        }, 200)
    })
})