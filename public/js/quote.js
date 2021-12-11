var quoteContainer = $('#quote-container')

// Quote API Function
function getQuote() {
    fetch("https://type.fit/api/quotes")
        .then(res => {
            return res.json()
        })
        .then(data => {
            // Random quote and Author details from array
            let chosenQuote = data[Math.floor(Math.random() * data.length)]
            let author = ''
            if (chosenQuote.author == null) {
                author = 'anonymous'
            } else {
                author = chosenQuote.author
            }

            quoteContainer.addClass('animate__fadeIn')
            setTimeout(() => {
                quoteContainer.removeClass('animate__fadeIn')
            }, 1000)

            quoteContainer.empty()
            quoteContainer.append(`"${chosenQuote.text}" -${author}`)
        })
}

getQuote()

// Get a new quote on button click
$('#quoteBtn').on('click', getQuote)