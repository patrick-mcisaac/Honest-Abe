export const PacList = async () => {
	const response = await fetch("http://localhost:8088/pacs")
	const pacs = await response.json()

	const response2 = await fetch(
		"http://localhost:8088/corporatedonations?_expand=corporation"
	)
	const corpDonors = await response2.json()

	return pacs.map(pac => {
		let html = `
        <section class='pac'>
            <header class='pac-name'>
                <h1>${pac.registeredName}</h1>
            </header>
            <div class='pac-info'>
                <p>${pac.address}</p>
            </div>
            <div class='pac-donors'>
                <h2>Donors</h2>
                <ul>`

		const listHTML = corpDonors
			.filter(corp => corp.pacId === pac.id)
			.map(
				filteredCorp =>
					`<li>${
						filteredCorp.corporation.company
					} (${filteredCorp.amount.toLocaleString("en-US", {
						style: "currency",
						currency: "USD"
					})})</li>`
			)
			.join("")

		html += `
                    ${listHTML}
                </ul>
            </div>
        </section>
        `

		return html
	})
}
