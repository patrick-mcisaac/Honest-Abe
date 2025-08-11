import { Politicians } from "./Politicians.js"
import { Corporations } from "./Corporations.js"
import { Pac } from "./Pac.js"

const render = async () => {
	const politiciansHTML = await Politicians()
	const corporateHTML = await Corporations()
	const pacHTML = await Pac()

	const container = document.getElementById("container")

	const html = `
    ${politiciansHTML}
    ${corporateHTML}
    ${pacHTML}
    `

	container.innerHTML = html
}

render()
