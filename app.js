const nbaHead2Head = 'https://api.the-odds-api.com/v3/odds/?apiKey=01ba738d2790f3c724c675e1927b247d&sport=basketball_nba&region=us&mkt=h2h&dateFormat=iso'
const nbaSpread = 'https://api.the-odds-api.com/v3/odds/?apiKey=01ba738d2790f3c724c675e1927b247d&sport=basketball_nba&region=us&mkt=spreads&dateFormat=iso'
const nbaOverUnder = 'https://api.the-odds-api.com/v3/odds/?apiKey=01ba738d2790f3c724c675e1927b247d&sport=basketball_nba&region=us&mkt=totals&dateFormat=iso'


async function getNBA() {

  try {
    const response = await axios.get(`${nbaHead2Head}`);
    const response2 = await axios.get(`${nbaSpread}`);
    const response3 = await axios.get(`${nbaOverUnder}`);
    //calling the APIS to have access to their data
    const responseH2H = response.data.data
    const responseSpread = response2.data.data
    const responseOU = response3.data.data
    // storing the APIs into variables to traverse through later. 

    addGames(responseH2H)
    addMoneyLine(responseH2H)
    addSpreads(responseSpread)
    addTotals(responseOU)
    // these are calling the below functions that display the API data on the browser
    
  } catch (error) {
    console.log(error)
  }
}
getNBA() //this calls everything above








function addGames(responseH2H) {
  let gameContainer = document.querySelector('.game-container') //declaring the game-container to append items below to

  responseH2H.forEach((game) => {
    let newGame = document.createElement('div')
    newGame.classList.add('each-game') //going through each API array and putting them into a div with the class each-game. 

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
  }) //declaring a variable (gameData) for the actual API data that i need for each game and creating HTML elements from them and appending them to the game-container. 
}
let fixTime = (isoDate) => {
  let localDate = new Date(isoDate)
  let dateString = localDate.toString()
  let dateFormat = `${dateString.slice(0, 10)}`
  let timeFormat = ` ${dateString.slice(16, 21)}`

  return dateFormat + timeFormat
} // adjusting the time data to display in this order: the day of the week, the month, the date, and the local time of the user. it originally came through as iso 8601 format. The way this reads as an endpoint is: commence_time: "2021-02-02T00:40:00Z".
//https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time help from this site with first part








function addMoneyLine(responseH2H) {
  let moneyLineContainer = document.querySelector('.moneyline-container') //declaring the moneyline-container to append the below data to. 

  responseH2H.forEach((game) => {

    let newMoneyLine = document.createElement('div')
    newMoneyLine.classList.add('each-gamble') //for eaching through each data point and assigning the each-gamble class for the div each endpoint is assigned to. 

    let moneyLineData = `
    <div class="moneyline-spacing" id="${adjustedOdds((game.sites[0].odds.h2h[1]))}">
      <div class="odds-text" id="${adjustedOdds((game.sites[0].odds.h2h[1]))}">${adjustedOdds((game.sites[0].odds.h2h[1]))}</div> 
    </div>

    <div class="moneyline-spacing2" id="${adjustedOdds(game.sites[0].odds.h2h[0])}">
      <div class="odds-text" id="${adjustedOdds(game.sites[0].odds.h2h[0])}">${adjustedOdds(game.sites[0].odds.h2h[0])}</div>
    </div>
    `
    moneyLineContainer.appendChild(newMoneyLine)
    newMoneyLine.insertAdjacentHTML('beforeend', moneyLineData) //pull the data i want and appending to the moneyline container using insert adjacent html. I'm assigning these values Divs to be able to style and grab later through my event listener. 

    let moneyLineDiv = document.querySelectorAll('.moneyline-spacing') //creating buttons for each class listed above. i'm grabbing the div's that have the specific class moneyline-spacing, in this case the ones that have the hover styling. Then, i'm using a callback function that has the specific endpoints I want to listen for as the parameters. 
    moneyLineDiv.forEach((moneyLine) => {
      moneyLine.addEventListener('click', (e) => moneyLineClick(e, adjustedOdds((game.sites[0].odds.h2h[1])), game.teams[1]))
    })

    let moneyLineDiv2 = document.querySelectorAll('.moneyline-spacing2')
    moneyLineDiv2.forEach((moneyLine2) => {
      moneyLine2.addEventListener('click', (e) => moneyLineClick(e, adjustedOdds((game.sites[0].odds.h2h[0])), game.teams[0]))
      // creating event listeners for clicking. the moneyline callback function to outline the parameters of which to traverse the API data to single out the end points i want to grab. This will need to be redone once i learn more.  
  })
    })
}


let moneyLineClick = (e, moneyLine, team) => {
  let betslip = document.querySelector('.button-container')
  let newBet = document.createElement('div')
  if (e.target.id === moneyLine) {
    newBet = `${moneyLine} ${team}<br>
    `
    betslip.insertAdjacentHTML('afterbegin', newBet)
  }
} // append the data grabbed through clicking to the betslip. selecting currently by the ID of the API data point and the corresponding team. this is somewhat flawed and I will have to rework at a later date. the break allows for lines between the the one being appended and the next one. 







function addSpreads(responseSpread) {
  let spreadsContainer = document.querySelector('.spread-container') //same stuff as above. just using a different endpoint, specified by the responseSpread variable as the parameter to traverse to grab the information I need.  

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

    newBet = `${spread} ${odds} ${team}<br>
    `
    betslip.insertAdjacentHTML('afterbegin', newBet)
  }
} //same stuff as above. 





function addTotals(responseOU) {
  let totalsContainer = document.querySelector('.totals-container') //same stuff as above. 
  
  responseOU.forEach((game) => {

    let newTotals = document.createElement('div')
    newTotals.classList.add('each-gamble')

    let totalsData = `
    <div class="totalpoints-spacing" id="${game.sites[0].odds.totals.points[0]}" id="${adjustedOdds(game.sites[0].odds.totals.odds[0])}">
    <div id="${game.sites[0].odds.totals.points[0]}">O ${game.sites[0].odds.totals.points[0]}</div> 
    <div class="odds-text" id="${adjustedOdds(game.sites[0].odds.totals.odds[0])}">${adjustedOdds(game.sites[0].odds.totals.odds[0])}</div>
    </div>

    <div class="totalpoints-spacing2" id="${game.sites[0].odds.totals.points[1]}" id="${adjustedOdds(game.sites[0].odds.totals.odds[1])}">
    <div id="${game.sites[0].odds.totals.points[1]}">U ${game.sites[0].odds.totals.points[1]}</div>
    <div class="odds-text" id="${adjustedOdds(game.sites[0].odds.totals.odds[1])}">${adjustedOdds(game.sites[0].odds.totals.odds[1])}</div>
    </div>
    `
    totalsContainer.appendChild(newTotals)
    newTotals.insertAdjacentHTML('beforeend', totalsData)

    let totalDiv = document.querySelectorAll('.totalpoints-spacing')
    totalDiv.forEach((total) => {
      total.addEventListener('click', (e) => totalClick(e, game.sites[0].odds.totals.points[0], adjustedOdds(game.sites[0].odds.totals.odds[0]), game.teams[0], game.teams[1]))
    })
    let totalDiv2 = document.querySelectorAll('.totalpoints-spacing2')
    totalDiv2.forEach((total2) => {
      total2.addEventListener('click', (e) => totalClick(e, game.sites[0].odds.totals.points[1], adjustedOdds(game.sites[0].odds.totals.odds[1]), game.teams[0], game.teams[1]))
    })
  })
}

let totalClick = (e, total, odds, team, team1) => {
  let betslip = document.querySelector('.button-container')
  let newBet = document.createElement('div')
  if (e.target.id === total, odds) {
    newBet = `${total} ${odds} ${team} ${team1}<br>`
    betslip.insertAdjacentHTML('afterbegin', newBet)
  }
} //same stuff as above. 



let adjustedOdds = (odds) => {
  let americanOdds = ''
  if (odds >= 2) {
    americanOdds = `+${Math.round((odds - 1) * 100)}`
  } else {
    americanOdds = ` ${Math.round(100 / (1 - odds))}`
  }
  return americanOdds
}
//this is a modifier function for each API data point with the class list of "odds-text". it converts it from it's decimal form to the + or - large number that is displayed.  





























// function addMoneyLine(responseH2H) {
//   let moneyLineContainer = document.querySelector('.moneyline-container')

//   responseH2H.forEach((game) => {

//     let newMoneyLine = document.createElement('div')
//     newMoneyLine.classList.add('each-gamble')

//     let moneyLineData = `
//     <div class="moneyline-spacing">
//       <div class="odds-text">${adjustedOdds((game.sites[0].odds.h2h[1]))}</div> 
//     </div>

//     <div class="moneyline-spacing2">
//       <div class="odds-text">${adjustedOdds(game.sites[0].odds.h2h[0])}</div>
//     </div>
//     `
//     moneyLineContainer.appendChild(newMoneyLine)
//     newMoneyLine.insertAdjacentHTML('beforeend', moneyLineData) 
//   })

//   let clickableMoneyLineDiv = document.querySelectorAll('.moneyline-spacing')
//   clickableMoneyLineDiv.addEventListener('click', callback)

//   function callback(responseH2H) {
//     for (let i = 0; i < responseH2H.length; i++) {

//       responseH2H[i].forEach((game) => {
//         let clickablePair = game.teams[0] + game.sites[0].odds.h2h[0]
//         let clickablPair2 = game.teams[1] + game.sites[1].odds.h2h[1]
//       })
//     }
//   }

// }



