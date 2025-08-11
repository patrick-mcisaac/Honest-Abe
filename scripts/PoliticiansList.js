export const PoliticiansList = async () => {
	/* 	const response = await fetch("http://localhost:8088/politicians")
	const politicians = await response.json()

	const response2 = await fetch(
		"http://localhost:8088/pacdonations?_expand=pac"
	)
	const pacDonations = await response2.json() */

	const promise1 = fetch("http://localhost:8088/politicians")
	const promise2 = fetch("http://localhost:8088/pacdonations?_expand=pac")
	const promise3 = fetch(
		"http://localhost:8088/politicianlegislations?_expand=legislation"
	)
	const promise4 = fetch(
		"http://localhost:8088/corporateinterests?_expand=corporation"
	)
	const promise5 = fetch(
		"http://localhost:8088/legislations?_expand=interest"
	)

	const result = await Promise.all([
		promise1,
		promise2,
		promise3,
		promise4,
		promise5
	])

	const [
		politicians,
		pacDonations,
		politicianBills,
		corporateInterests,
		legislations
	] = await Promise.all([
		result[0].json(),
		result[1].json(),
		result[2].json(),
		result[3].json(),
		result[4].json()
	])

	const politicianListHTML = politicians
		.map(politician => {
			const donations = pacDonations
				.filter(filter => filter.politicianId === politician.id)
				.map(donation => `<li>${donation.pac.registeredName}</li>`)
				.join("")

			// get bill that matches politician
			const politicianBill = politicianBills.find(
				bill => bill.politicianId === politician.id
			)

			// get the interest of that bill
			const billInterest = legislations.find(bill => {
				return (
					bill.interest.id === politicianBill.legislation.interestId
				)
			})

			// get corporations with same interest
			const corporateBills = corporateInterests
				.filter(
					interest => interest.interestId === billInterest.interest.id
				)
				.map(bill => `<li>${bill.corporation.company}</li>`)
				.join("")

			return `
                 <section class='politician'>
                    <header class='politician-name'>
                            <h1>${politician.name.first} ${politician.name.last}</h1>
                        </header>
                        <div class='politician-info'>
                            <p>Age: ${politician.age}</p>
                            <p>Represents: ${politician.district}</p>
                        </div>
                        <div class='politician-bills'>
                            <h2>Sponsored Bills</h2>
							<p>${politicianBill.legislation.name} (${billInterest.interest.about})</p>
                        </div>
                        <div class='pac-donations'>
                            <h2>Related PACs</h2>
                            <ul>
                                ${donations}
                            </ul>
                        </div>
                        <div class='politician-influencers'>
                            <h3>Influencing Corporations</h3>
                            <ul>
							 ${corporateBills}
                            </ul>
                        </div>
                    </section>
                `
		})
		.join("")

	return politicianListHTML
}
