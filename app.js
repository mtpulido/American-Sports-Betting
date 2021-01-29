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
    // console.log(responseOU)
    // console.log(responseSpread)

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
      <div>${game.teams[0]}<br><span class="start-text">${fixTime(game.commence_time)}</span></div>
    </div>
    `
    gameContainer.appendChild(newGame)
    newGame.insertAdjacentHTML('beforeend', gameData)
  })
}
let fixTime = (isoDate) => {
  let localDate = new Date(isoDate)
  let dateString = localDate.toString()
  let dateFormat = `${dateString.slice(0, 10)}`
  let timeFormat = ` ${dateString.slice(16, 21)}PM`

  return dateFormat + timeFormat
}
//https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time help from this site with first part








function addMoneyLine(responseH2H) {
  let moneyLineContainer = document.querySelector('.moneyline-container')

  responseH2H.forEach((game) => {

    let newMoneyLine = document.createElement('div')
    newMoneyLine.classList.add('each-gamble')

    let moneyLineData = `
    <div class="moneyline-spacing" id="${adjustedOdds((game.sites[0].odds.h2h[1]))}">
      <div class="odds-text" id="${adjustedOdds((game.sites[0].odds.h2h[1]))}">${adjustedOdds((game.sites[0].odds.h2h[1]))}</div> 
    </div>

    <div class="moneyline-spacing2" id="${adjustedOdds(game.sites[0].odds.h2h[0])}">
      <div class="odds-text" id="${adjustedOdds(game.sites[0].odds.h2h[0])}">${adjustedOdds(game.sites[0].odds.h2h[0])}</div>
    </div>
    `
    moneyLineContainer.appendChild(newMoneyLine)
    newMoneyLine.insertAdjacentHTML('beforeend', moneyLineData)

    let moneyLineDiv = document.querySelectorAll('.moneyline-spacing')
    moneyLineDiv.forEach((moneyLine) => {
      moneyLine.addEventListener('click', (e) => moneyLineClick(e, adjustedOdds((game.sites[0].odds.h2h[1])), game.teams[1]))
      // console.log(moneyLineDiv)
    })
    let moneyLineDiv2 = document.querySelectorAll('.moneyline-spacing2')
    moneyLineDiv2.forEach((moneyLine2) => {
      moneyLine2.addEventListener('click', (e) => moneyLineClick(e, adjustedOdds((game.sites[0].odds.h2h[0])), game.teams[0]))
      // console.log(moneyLineDiv)
  })
    })
}


let moneyLineClick = (e, moneyLine, team) => {
  // console.log(e.target.id)
  let betslip = document.querySelector('.button-container')
  let newBet = document.createElement('div')
  if (e.target.id === moneyLine) {
    newBet = `${moneyLine} ${team} <br>`
    betslip.insertAdjacentHTML('afterbegin', newBet)
  }
}







function addSpreads(responseSpread) {
  let spreadsContainer = document.querySelector('.spread-container')

  responseSpread.forEach((game) => {

    let newSpread = document.createElement('div')
    newSpread.classList.add('each-gamble')

    let spreadData = `
    <div class="pointsspread-spacing" id="${game.sites[0].odds.spreads.points[1]}" id="${adjustedOdds(game.sites[0].odds.spreads.odds[1])}">
      <div id="${game.sites[0].odds.spreads.points[1]}">${game.sites[0].odds.spreads.points[1]}</div> 
      <div class="odds-text" id="${adjustedOdds(game.sites[0].odds.spreads.odds[1])}">${adjustedOdds(game.sites[0].odds.spreads.odds[1])}</div>
    </div>

    <div class="pointsspread-spacing2" id="${game.sites[0].odds.spreads.points[0]}" id="${adjustedOdds(game.sites[0].odds.spreads.odds[0])}">
      <div id="${game.sites[0].odds.spreads.points[0]}">${game.sites[0].odds.spreads.points[0]}</div>
      <div class="odds-text" id="${adjustedOdds(game.sites[0].odds.spreads.odds[0])}">${adjustedOdds(game.sites[0].odds.spreads.odds[0])}</div>
    </div>
      `
    spreadsContainer.appendChild(newSpread)
    newSpread.insertAdjacentHTML('beforeend', spreadData)

    let spreadDiv = document.querySelectorAll('.pointsspread-spacing')
    spreadDiv.forEach((spread) => {
      spread.addEventListener('click', (e) => spreadClick(e, game.sites[0].odds.spreads.points[1], adjustedOdds(game.sites[0].odds.spreads.odds[1]), game.teams[1]))
    })
    let spreadDiv2 = document.querySelectorAll('.pointsspread-spacing2')
    spreadDiv2.forEach((spread2) => {
      spread2.addEventListener('click', (e) => spreadClick(e, game.sites[0].odds.spreads.points[0], adjustedOdds(game.sites[0].odds.spreads.odds[0]), game.teams[0]))
    })
  })
}


let spreadClick = (e, spread, odds, team) => {
  // console.log(e.target.id)
  let betslip = document.querySelector('.button-container')
  let newBet = document.createElement('div')
  if (e.target.id === spread) {
    newBet = `${spread} ${odds} ${team}<br>`
    betslip.insertAdjacentHTML('afterbegin', newBet)
  }
}







function addTotals(responseOU) {
  let totalsContainer = document.querySelector('.totals-container')
  
  responseOU.forEach((game) => {

    let newTotals = document.createElement('div')
    newTotals.classList.add('each-gamble')

    let totalsData = `
    <div class="totalpoints-spacing">
    <div>O ${game.sites[0].odds.totals.points[0]}</div> 
    <div class="odds-text">${adjustedOdds(game.sites[0].odds.totals.odds[0])}</div>
    </div>

    <div class="totalpoints-spacing">
    <div>U ${game.sites[0].odds.totals.points[1]}</div>
    <div class="odds-text">${adjustedOdds(game.sites[0].odds.totals.odds[1])}</div>
    </div>
    `
    totalsContainer.appendChild(newTotals)
    newTotals.insertAdjacentHTML('beforeend', totalsData)

    // let totalDiv = document.querySelectorAll('.totalpoints-spacing')
    // totalDiv.forEach((total) => {
    //   total.addEventListener('click', (e) => totalClick(e, game.sites[0].odds.totals.points[0], adjustedOdds(game.sites[0].odds.totals.odds[0]), game.teams[0], game.teams[1]))
    // })
  })
}

let totalClick = (e, total, odds, team, team1) => {
  // console.log(e.target.id)
  let betslip = document.querySelector('.button-container')
  let newBet = document.createElement('div')
  if (e.target.id === total) {
    newBet = `${total} ${odds} ${team} ${team1}<br>`
    betslip.insertAdjacentHTML('afterbegin', newBet)
  }
}



let adjustedOdds = (odds) => {
  let americanOdds = ''
  if (odds >= 2) {
    americanOdds = `+${Math.round((odds - 1) * 100)}`
  } else {
    americanOdds = ` ${Math.round(100 / (1 - odds))}`
  }
  return americanOdds
}

