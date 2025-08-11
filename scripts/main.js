import { Politicians } from "./Politicians.js"

const render = async () => {
	const politiciansHTML = await Politicians()
	const container = document.getElementById("container")

	const html = `
    ${politiciansHTML}
    `

	container.innerHTML = html
}

render()
