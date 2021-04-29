const getDataBase = require('../database.js')
const db = getDataBase()
const express = require('express')
const router = express.Router()


// GET /hamsters

router.get('/', async (req, res) => {

	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()

	if( snapshot.empty ) {
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


// GET /hamsters/random

router.get('/random', async (req, res) => {

	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()

	hamsterList = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		hamsterList.push(data)
	})
	
	function randomHamster(hamsterList) {
		return hamsterList[Math.floor(Math.random()*hamsterList.length)]
	}

	res.send(randomHamster)

} )


// GET /hamsters/:id

router.get('/:id', async (req, res) => {

	const id = req.params.id
	const hamsterRef = await db.collection('hamsters').doc(id).get()

	if( !hamsterRef.exists ) {
		res.status(404).send('Hamster does not exist')
		return
	}

	const data = hamsterRef.data()
	res.send(data)
})

// POST /hamsters

router.post('/', async (req, res) => {

	const newHamsterObject = req.body

	if( !isObject(newHamsterObject) ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('hamsters').add(newHamsterObject)
	res.send(docRef.id)
})

function isObject(hamsterObject) {

	if( !hamsterObject || !hamsterObject.name || !hamsterObject.age || !hamsterObject.favFood || !hamsterObject.loves || !hamsterObject.imgName || !hamsterObject.wins || !hamsterObject.defeats || !hamsterObject.games )
		return false

	return true
}


// PUT /hamsters/:id

router.put('/:id', async (req, res) => {

	const hamsterObject = req.body
	const id = req.params.id

	if( !hamsterObject || !id ) {
		req.sendStatus(400)
		return
	}

	const docRef = db.collection('hamsters').doc(id)
	await docRef.set(hamsterObject, { merge: true })
	res.sendStatus(200)
})


// DELETE /hamsters/:id
router.delete('/:id', async (req, res) => {

	const id = req.params.id

	if( !id ) {
		res.sendStatus(400)
		return
	}

	await db.collection('hamsters').doc(id).delete()
	res.sendStatus(200)
})

module.exports = router