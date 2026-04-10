const autocannon = require('autocannon')
const url = 'http://localhost:3000/' //route
const duration = 10; //10 seconds

const instance = autocannon({
    url,
    duration

},(err, result)=>{
    if (err) {
        console.log("Server test fail", err);
    } else {
        console.log("Server Test Results:");
        console.log(result);
    }
},
);

autocannon.track(instance);


