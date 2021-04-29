var admin = require("firebase-admin");

const serviceAccount = require("./firebase-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hamsterwars-assigment-default-rtdb.europe-west1.firebasedatabase.app"
});

function getDataBase() {
	return admin.firestore()
}

module.exports = getDataBase