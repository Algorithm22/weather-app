const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  // fetching API
fetch(`weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = `Error: ${data.error}`
    } else {
      messageOne.textContent = `Location: ${data.location}`
      messageTwo.textContent = `Forecast: ${data.forecast}`
    }
  })
})

  e.preventDefault();
})