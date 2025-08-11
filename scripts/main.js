import { Politicians } from "./Politicians.js"
import { Corporations } from "./Corportaions.js"

const render = async () => {
	const politiciansHTML = await Politicians()
	const corporateHTML = await Corporations()
	const container = document.getElementById("container")

	const html = `
    ${politiciansHTML}
    ${corporateHTML}
    `

	container.innerHTML = html
}

render()
