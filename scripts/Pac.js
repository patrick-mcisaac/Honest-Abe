import { PacList } from "./PacList.js"

export const Pac = async () => {
	const pacHTML = await PacList()

	return `
    <article class='pacs'>
        ${pacHTML}
    </article>
    `
}
