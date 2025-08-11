export const PoliticiansList = async () => {
	const response = await fetch("http://localhost:8088/politicians")
	const politicians = await response.json()

	const response2 = await fetch(
		"http://localhost:8088/pacdonations?_expand=pac"
	)
	const pacDonations = await response2.json()

	const politicianListHTML = politicians
		.map(politician => {
			let html = `
                    <section class='politician'>
                        <header class='politician-name'>
                            <h1>${politician.name.first} ${politician.name.last}</h1>
                        </header>
                        <div class='politician-info'>
                            <p>Age: ${politician.age}</p>
                            <p>Represents: ${politician.district}</p>
                        </div>
                        <div class='pac-donations'>
                            <h2>PAC Donations</h2>
                            <ul>
                            `
			let donations = pacDonations
				.filter(filter => filter.politicianId === politician.id)
				.map(
					donation =>
						`<li>${
							donation.pac.registeredName
						} (${donation.amount.toLocaleString("en-US", {
							style: "currency",
							currency: "USD"
						})})</li>`
				)
				.join("")

			html += `
                                ${donations}
                            </ul>
                        </div>
                    </section>
                `
			return html
		})
		.join("")

	return politicianListHTML
}
