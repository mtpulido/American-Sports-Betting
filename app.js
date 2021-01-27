const nbaHead2Head = 'https://api.the-odds-api.com/v3/odds/?apiKey=01ba738d2790f3c724c675e1927b247d&sport=basketball_nba&region=us&mkt=h2h&dateFormat=iso'
const nbaSpread = 'https://api.the-odds-api.com/v3/odds/?apiKey=01ba738d2790f3c724c675e1927b247d&sport=basketball_nba&region=us&mkt=spreads&dateFormat=iso'
const nbaOverUnder = 'https://api.the-odds-api.com/v3/odds/?apiKey=01ba738d2790f3c724c675e1927b247d&sport=basketball_nba&region=us&mkt=totals&dateFormat=iso'


async function getNBA() {

  try {
    const response = await axios.get(`${nbaHead2Head}`);
    const response2 = await axios.get(`${nbaSpread}`);
    const response3 = await axios.get(`${nbaOverUnder}`);
    const responseH2H = response.data.data
    const responseSpread = response2.data.data
    const responseOU = response3.data.data
    console.log(responseH2H)
    console.log(responseOU)
    console.log(responseSpread)

    addGames(responseH2H)
    addMoneyLine(responseH2H)
    addSpreads(responseSpread)
    addTotals(responseOU)
  } catch (error) {
    console.log(error)
  }
}
getNBA()



function addGames(responseH2H) {
  let gameContainer = document.querySelector('.game-container')

  responseH2H.forEach((game) => {
    let newGame = document.createElement('div')
    newGame.classList.add('each-game')

    let gameData = `
    <div class="game-spacing">
      <div>${game.teams[1]}</div>
    </div>

    <div class="game-spacing">
      <div>${game.teams[0]} (home) <br><span class="start-text">${game.commence_time}</span></div>
    </div>
    `
    gameContainer.appendChild(newGame)
    newGame.insertAdjacentHTML('beforeend', gameData)
  })
}



function addMoneyLine(responseH2H) {
  let moneyLineContainer = document.querySelector('.moneyline-container')

  responseH2H.forEach((game) => {

    let newMoneyLine = document.createElement('div')
    newMoneyLine.classList.add('each-gamble')

    let moneyLineData = `
    <div class="moneyline-spacing">
      <div class="odds-text">${(game.sites[0].odds.h2h[1])} </div> 
    </div>

    <div class="moneyline-spacing">
      <div class="odds-text">${game.sites[0].odds.h2h[0]}</div>
    </div>
    `
    moneyLineContainer.appendChild(newMoneyLine)
    newMoneyLine.insertAdjacentHTML('beforeend', moneyLineData)
  })
}



function addSpreads(responseSpread) {
  let spreadsContainer = document.querySelector('.spread-container')

  responseSpread.forEach((game) => {

    let newSpread = document.createElement('div')
    newSpread.classList.add('each-gamble')

    let spreadData = `
    <div class="pointsspread-spacing">
      <div>${game.sites[0].odds.spreads.points[1]}</div> 
      <div class="odds-text">${game.sites[0].odds.spreads.odds[1]}</div>
    </div>

    <div class="pointsspread-spacing">
      <div>${game.sites[0].odds.spreads.points[0]}</div>
      <div class="odds-text">${game.sites[0].odds.spreads.odds[0]}</div>
    </div>
      `
    spreadsContainer.appendChild(newSpread)
    newSpread.insertAdjacentHTML('beforeend', spreadData)
  })
}



function addTotals(responseOU) {
  let totalsContainer = document.querySelector('.totals-container')
  
  responseOU.forEach((game) => {

    let newTotals = document.createElement('div')
    newTotals.classList.add('each-gamble')

    let totalsData = `
    <div class="totalpoints-spacing">
    <div>O ${game.sites[0].odds.totals.points[0]}</div> 
    <div class="odds-text">${game.sites[0].odds.totals.odds[0]}</div>
    </div>

    <div class="totalpoints-spacing">
    <div>U ${game.sites[0].odds.totals.points[1]}</div>
    <div class="odds-text">${game.sites[0].odds.totals.odds[1]}</div>
    </div>
    `
    totalsContainer.appendChild(newTotals)
    newTotals.insertAdjacentHTML('beforeend', totalsData)
  })
}






// function addGames(responseH2H) {
//   let gameContainer = document.querySelector('.game-container')

//   responseH2H.forEach((game) => {
//     let newGame = document.createElement('div')
//     newGame.classList.add('each-game')

//     let gameTime = `
//       <div><span>class="start-text">${game.commence_time}</span></div>
//     `
//     gameContainer.appendChild(newGame)
//     newGame.insertAdjacentHTML('beforeend', gameTime)

//     console.log(gameTime)
//   })
// }
