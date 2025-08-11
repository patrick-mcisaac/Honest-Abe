import { CorporationsList } from "./CorporationsList.js"

export const Corporations = async () => {
	const corporationsHTML = await CorporationsList()

	return `
    <article class='corporations'>
        ${corporationsHTML}    
    </article>
    `
}
