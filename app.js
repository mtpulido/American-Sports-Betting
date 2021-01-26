const nbaHead2Head = 'https://api.the-odds-api.com/v3/odds/?apiKey=1adff616ae7885d1cbaffb201a292c9f&sport=basketball_nba&region=us&mkt=h2h&dateFormat=iso'
const nbaSpread = 'https://api.the-odds-api.com/v3/odds/?apiKey=1adff616ae7885d1cbaffb201a292c9f&sport=basketball_nba&region=us&mkt=spreads&dateFormat=iso'
const nbaOverUnder = 'https://api.the-odds-api.com/v3/odds/?apiKey=1adff616ae7885d1cbaffb201a292c9f&sport=basketball_nba&region=us&mkt=totals&dateFormat=iso'


async function getNBA() {
  try {
    const response = await axios.get(`${nbaHead2Head}`);
    const response2 = await axios.get(`${nbaSpread}`);
    const response3 = await axios.get(`${nbaOverUnder}`);
    const responseH2H = response.data.data
    const responseSpread = response2.data.data
    const responseOU = response3.data.data
    
    addGames(responseH2H)
    addSpread(responseSpread)
    addOverUnder(responseOU)
  } catch (error) {
    console.log(error)
  }
}
getNBA()


// right now i am looping through each array separetely and just visually creating a div for each piece because i can't nest forEach's
// it might be possible once in flexbox to give each below function a column layout so they're each next to each other and set their sizes the same
// what i'd like to do is append each piece of additional data to the corresponding gameDIV, but that makes it out of scope. 


function addGames(responseH2H) {
  let gameContainer = document.querySelector('#game-content')

  responseH2H.forEach((game) => {

    let newGame = document.createElement('div')
    newGame.classList.add('each-game')

    let gameData = `
    <p>${game.teams[1]} 
    <br>
    <br>
    ${game.teams[0]} (home)
    <br>
    <span class="start-text">${game.commence_time}</span></p>
    <p>${game.sites[0].odds.h2h[1]}
    <br>
    <br>
    ${game.sites[0].odds.h2h[0]}</p>
    <p>Fill Spread</p>
    <p>Fill O/U</p>
    `
    gameContainer.appendChild(newGame)
    newGame.insertAdjacentHTML('beforeend', gameData)
  })
}




function addSpread(responseSpread) {
  let gameContainer = document.querySelector('#game-content')

  responseSpread.forEach((game) => {

    let newGame = document.createElement('div')
    newGame.classList.add('each-game')

    let spreadData = `
  <p>away team points ${game.sites[0].odds.spreads.points[1]}</p>
  <p> away team odds ${game.sites[0].odds.spreads.odds[1]}</p>
  <p>home team points ${game.sites[0].odds.spreads.points[0]}</p>
  <p> home team odds ${game.sites[0].odds.spreads.odds[0]}</p>
  `
    gameContainer.appendChild(newGame)
    newGame.insertAdjacentHTML('beforeend', spreadData)
  })
}




function addOverUnder(responseOU) {
  let gameContainer = document.querySelector('#game-content')
  
  responseOU.forEach((game) => {

    let newGame = document.createElement('div')
    newGame.classList.add('each-game')

    let overUnderData = `
    <p> over points ${game.sites[0].odds.totals.points[0]}</p>
    <p> over odds ${game.sites[0].odds.totals.odds[0]}</p>
    <p> under points ${game.sites[0].odds.totals.points[1]}</p>
    <p> under odds ${game.sites[0].odds.totals.odds[1]}</p>
    `
    gameContainer.appendChild(newGame)
    newGame.insertAdjacentHTML('beforeend', overUnderData)
  })
}
