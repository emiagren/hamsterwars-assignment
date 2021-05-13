const getDataBase = require('../database.js');
const db = getDataBase();
const express = require('express');
const router = express.Router();


// GET /losers

router.get('/', async (req, res) => {

	try {

		const hamstersRef = db.collection('hamsters');
		const snapshot = await hamstersRef.orderBy('defeats', 'desc').limit(5).get();

		loserList = []

		snapshot.forEach(doc => {

			loserList.push(doc.data());
		})
		res.status(200).send(loserList)

	} catch(error) {
		res.status(500).send('Oops! Something went wrong... ' + error.message);
	}
})

module.exports = router;