const getDataBase = require('../database.js');
const db = getDataBase();
const express = require('express');
const router = express.Router();


// GET /hamsters

try {

router.get('/', async (req, res) => {

	const hamstersRef = db.collection('hamsters');
	const snapshot = await hamstersRef.get();

	if(snapshot.empty) {
		res.send([])
		return
	}

	hamsterList = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		hamsterList.push(data)
	})
	res.send(hamsterList)
})

} catch(error) {
	res.status(500).send('Oops! Something went wrong... ' + error.message);
}


// GET /hamsters/random

try {

router.get('/random', async (req, res) => {

	const hamstersRef = db.collection('hamsters');
	const snapshot = await hamstersRef.get();

	if(snapshot.empty) {
		res.send(404).send('Oh no! No hamsters to be found.');
		return
	}

	hamsterList = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		hamsterList.push(data)
	})
	
	res.send(hamsterList[Math.floor(Math.random()*hamsterList.length)]);

} )

} catch(error) {
	res.status(500).send('Oops! Something went wrong... ' + error.message);
}


// GET /hamsters/:id

try {

router.get('/:id', async (req, res) => {

	const id = req.params.id;
	const hamsterRef = await db.collection('hamsters').doc(id).get();

	if(!hamsterRef.exists) {
		res.status(404).send(`Oh no! Hamster with id:${id} does not exist.`);
		return
	}

	const data = hamsterRef.data();
	res.send(data);
})

} catch(error) {
	res.status(500).send('Oops! Something went wrong... ' + error.message);
}


// POST /hamsters

try {

router.post('/', async (req, res) => {

	const newHamsterObject = req.body;

	if(!isObject(newHamsterObject)) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('hamsters').add(newHamsterObject);
	res.send(docRef.id);
})

function isObject(hamsterObject) {

	if(hamsterObject && ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games'].every(p => hamsterObject.hasOwnProperty(p))) {

		if(!Number.isInteger(hamsterObject.age) || hamsterObject.age < 0) return false;
		if(!Number.isInteger(hamsterObject.wins) || hamsterObject.wins < 0) return false;
		if(!Number.isInteger(hamsterObject.defeats) || hamsterObject.defeats < 0) return false;
		if(!Number.isInteger(hamsterObject.games) || hamsterObject.games < 0) return false;

		return true;
	}
		
	return false;	
}

} catch(error) {
	res.status(500).send('Oops! Something went wrong... ' + error.message);
}


// PUT /hamsters/:id

try {

router.put('/:id', async (req, res) => {

	const hamsterObject = req.body;
	const id = req.params.id;
	const hamsterRef = await db.collection('hamsters').doc(id).get();

	if(!hamsterObject || !id) {
		res.sendStatus(400);
		return;
	}

	if(!hamsterRef.exists) {
		res.status(404).send('Oh no! Hamster does not exist.');
		return;
	}

	const docRef = db.collection('hamsters').doc(id);
	await docRef.set(hamsterObject, { merge: true });

	if(Object.keys(hamsterObject).length === 0) {
		res.sendStatus(400);
		return;
	}
	res.sendStatus(200);
})

} catch(error) {
	res.status(500).send('Oops! Something went wrong... ' + error.message);
}

// DELETE /hamsters/:id

try {

router.delete('/:id', async (req, res) => {

	const id = req.params.id;
	const hamsterRef = await db.collection('hamsters').doc(id).get();

	if(!id) {
		res.sendStatus(400);
		return;
	}

	if(!hamsterRef.exists) {
		res.status(404).send('Oh no! Hamster does not exist.');
		return;
	}

	await db.collection('hamsters').doc(id).delete();
	res.sendStatus(200);
})

} catch(error) {
	res.status(500).send('Oops! Something went wrong... ' + error.message);
}


module.exports = router;