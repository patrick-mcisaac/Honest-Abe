import { PoliticiansList } from "./PoliticiansList.js"

export const Politicians = async () => {
	const politiciansList = await PoliticiansList()
	let html = `
    <article class='politicians'>
        ${politiciansList}
    </article>
    `

	return html
}
