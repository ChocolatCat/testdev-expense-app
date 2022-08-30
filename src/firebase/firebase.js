
//FIREBASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ15wRA1ZCqx0Q7qLhaXX1HM7soZ4SIJw",
  authDomain: "chocola-expenses-app.firebaseapp.com",
  databaseURL: "https://chocola-expenses-app-default-rtdb.firebaseio.com",
  projectId: "chocola-expenses-app",
  storageBucket: "chocola-expenses-app.appspot.com",
  messagingSenderId: "88382520082",
  appId: "1:88382520082:web:52dc0fbb38a4c358e051cb",
  measurementId: "G-HSX91JSEE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get reference to database
const db = getDatabase();

export {app, db as default };

/*

//Read the data. Fires whenever the data changes
onValue(expensePath, (snapshot) => {
  const expenses = [];
  snapshot.forEach((childSnap)=>{
    expenses.push({
      id: childSnap.key,
      ...childSnap.val()
    });
  });
  console.log(expenses);
});

//Fires when a child is removed. The snapshot returns the deleted object
onChildRemoved(expensePath, (snapshot) => {
  //On success
  console.log(snapshot.key, snapshot.val());
}, {
  //On failure

});

//Fires when a child is changed. The snapshot returns the modified object
onChildChanged(expensePath, (snapshot) => {
  //On success
  console.log(snapshot.key, snapshot.val());
}), {
  //On failure
};

//Fires when a child is added or for past data. The snapshot returns the added object
onChildAdded(expensePath, (snapshot) => {
  //On success
  console.log(snapshot.key, snapshot.val());
}, {
  //On failure
});
*/

/*
push(expensePath, {
  description: 'Expense 1',
  note: 'So true!',
  amount: 99999,
  createdAt: 0
});
*/


/*
//Add to the child, creates a random unique id
push(notePath, {
  title: 'Course Topics!',
  body: 'React, Angular, Python'
}); 
*/
/*
const fireBaseNotes = {
  notes: {
    dqwdkjsanuw: {
      title: 'First note!',
      body: 'This is a note'
    },
    qwacmsacsl: {
      title: 'Another note!',
      body: 'This is a note too!'
    }
  }
};

const notes = [
    {
      id: '12',
      title: 'First note!',
      body: 'This is a note'
    },
    {
      id: '761ase',
      title: 'Another note!',
      body: 'This is a note too!'
    }
];

set(ref(db, 'notes'), notes);
*/


///////////////////////////////////////////////////////////
//Firebase reference
//Firebase doesn't support arrays
//Firebase converts arrays into objects with a key referencing their index

//Write data to database
//ref gives us a reference to a specific part of our database
//Empty ref gives us a reference to our root
//Set is for writing values. It can take any data type. It will wipe any old value
/*
set(ref(db), {
    name: 'Chocola',
    age: 30,
    stressLevel: 5,
    job: {
      title: 'Software Dev',
      company: 'Juanitocorp'
    },
    location: {
        city: 'Santiago',
        country: 'Chile'
    }
}).then(() => {
  console.log('Data is saved!');
}).catch((e) => {
  console.log('This failed.', e);
});;
*/
//We can call the key with specific paths to change it
//set(ref(db, 'location/city'), 'La Florida');

//We can add new keys 
/*
set(ref(db, 'attributes'), {
        height: 168,
        weight: 78
}).then(()=>{
  console.log('Added attributes!');
}).catch((e)=>{
  console.log('Something failed:', e);
});
*/

//Remove data
//We can also call set() with null as the value
/*
remove(ref(db, 'isSingle')).then(()=>{
  console.log('Removed isSingle!');
}).catch((e)=>{
  console.log('Failed: ', e);
});
*/

//Wipe the Database
/*
remove(ref(db)).then(()=>{
  console.log('Wiped database!');
}).catch((e)=>{
  console.log('Failed: ', e);
});
*/

//Update database. We can add new childs and also remove with null.
//It doesn't go further into children
/*
update(ref(db), {
  name: 'Koku',
  age: 8001,
  isSingle: null,
  job: 'Fighter'
}).then(()=>{
  console.log('Data updated!');
}).catch((e)=>{
  console.log('Failure:', e);
});
*/

//When calling a child, you need to add the 'quotes/forthechild'
/*
update(ref(db), {
  stressLevel: 9,
  'job/company': 'Choco Inc',
  'location/city': 'La Florida'
}).then(()=>{
  console.log("Updated location, job and stress level!");
}).catch((e)=>{
  console.log("Failure :(", e);
});
*/

//Reading data. Autosubscribes to changes
/*
onValue(ref(db), (snapshot) => {
    const data = snapshot.val();
    console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
}, (e) => {
  console.log('Error fetching data', e);
});
*/

//Removes listeners. First argument is reference/query
//Second argument is event. "value", "child_added", "child_changed", "child_removed", or "child_moved."
//off doesn't remove child listeners
/*
setTimeout(() => {
  off(dbRef);
}, 3500);

setTimeout(() => {
  set(ref(db, 'age'), 30);
}, 4000);
*/