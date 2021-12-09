// Quote API Function
function getQuote() {
    fetch("https://type.fit/api/quotes")
        .then(res => {
            return res.json()
        })
        .then(data => {
            // Choose a random quote from quote array (data comes back as an array of objects which contain text and author)
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