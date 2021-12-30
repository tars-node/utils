var timeProvider = require("../index").timeProvider;

describe("test tars-timer.js", function(){
    test("test dateTimestamp", function(){
        var now = timeProvider.dateTimestamp();
        expect(now).toHaveProperty("hrtime");
        expect(now).toHaveProperty("timestamp");
    })

    test("test dateTimestampDiff", function(done){
        var t1 = timeProvider.dateTimestamp();
        setTimeout(function(){
            var t2 = timeProvider.dateTimestampDiff(t1);
            expect(t2).toBeGreaterThanOrEqual(1000);
            done();
        }, 1000);
    })

    test("test dateTimestamp", function(){
        expect(timeProvider.nowTimestamp()).toBeGreaterThan(0)
    })

    test("test diff", function(done){
        var t1 = timeProvider.nowTimestamp();
        setTimeout(function(){
            var t2 = timeProvider.diff(t1);
            expect(t2).toBeGreaterThanOrEqual(1000);
            done();
        }, 1000);
    })
})