const promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        //1.5s timeout
        //We call resolve when it succeeds, reject when it fails
        /*resolve({
            name: 'Chocola',
            age: 30
        });*/
        reject('Something went wrong!');
    }, 1500);
});

console.log('before');

//we wait for the promise to resolve. We use catch when it fails
//then can also take two arguments -> two functions
//one executes on resolve, and one on reject
promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log('error: ', error);
});

console.log('after');