export const PoliticiansList = async () => {
	const response = await fetch("http://localhost:8088/politicians")
	const politicians = await response.json()

	const politicianListHTML = politicians
		.map(politician => {
			return `
                    <section class='politician'>
                        <header class='politician-name'>
                            <h1>${politician.name.first} ${politician.name.last}</h1>
                        </header>
                        <div class='politician-info'>
                            <p>Age: ${politician.age}</p>
                            <p>Represents: ${politician.district}</p>
                        </div>
                    </section>
                `
		})
		.join("")

	return politicianListHTML
}
