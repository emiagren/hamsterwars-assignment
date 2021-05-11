const admin = require("firebase-admin");

let serviceAccount;

if(process.env.PRIVATE_KEY) {

	serviceAccount = JSON.parse(process.env.PRIVATE_KEY);

} else {

	serviceAccount = require("./firebase-private-key.json");

}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hamsterwars-assigment-default-rtdb.europe-west1.firebasedatabase.app"
});

function getDataBase() {
	return admin.firestore();
}

module.exports = getDataBase;