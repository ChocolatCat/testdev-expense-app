//
//Object Destructuring
//
/*console.log('bruh');

const person = {
    name: 'Chocola',
    age: 30,
    location: {
        city: 'Santiago',
        temp: 13
    }
};

Looks for properties of the same key as the variable name
variable = defaultValue/'DefaultValue'/0, etc
const {name = 'Anonymous', age} = person;

const name = person.name;
const age = person.age;

console.log(`${name} is ${age}. `);

easier to read than city = person.location.city and temp = person.location.temp
key: variableName
const {city, temp: temperature = 0} = person.location;

if(city && temperature){
    console.log(`It's ${temperature}C in ${city}`);
}
*/

/*
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const {name: publisherName = "Self-Published"} = book.publisher;

console.log(publisherName);
*/

//
//Array Destructoring
//

//const address = ['Arcilla 1625', 'La Florida', 'Santiago', '1111111'];

//They are defined by index position. We don't need to define items we don't need. For elements before the last index used, we need to leave the empty commas
/*
const [, city, state] = address;

console.log(`You are in ${city}, ${state}`);
*/

//product, small, medium, large
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [product, , price] = item;

console.log(`A medium ${product} costs ${price}`);