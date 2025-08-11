export const CorporationsList = async () => {
	const response = await fetch("http://localhost:8088/corporations")
	const corporations = await response.json()

	return corporations
		.map(corp => {
			return `
        <section class='corporation'>
            <header class='corporation-name'>
                <h1>${corp.company}</h1>
            </header>
            <div class='corporation-info'>
                <p>Address: ${corp.address}</p>
            </div>
        </section>
        `
		})
		.join("")
}
