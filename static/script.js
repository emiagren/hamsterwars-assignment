const getHamsters = document.querySelector('#getHamsters');
const displayHamsters = document.querySelector('#displayHamsters');

getHamsters.addEventListener('click', async event => {

	try {
		const response = await fetch('/hamsters');
		const json = await response.json();

		let text = JSON.stringify(json);
		displayHamsters.innerHTML = text;

	} catch {
		console.log('Oops! Something went wrong...');
	}
})