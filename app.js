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
    
    displayGames(responseH2H)
  } catch (error) {
    console.log(error)
  }
}
getNBA()




function displayGames(responseH2H, responseSpread, responseOU) {
  let gameContainer = document.querySelector('#game-content')

  responseH2H.forEach((game) => {

    let newGame = document.createElement('div')
    newGame.classList.add('each-game')

    let gameData = `
    <p>${game.teams[1]} vs. </p>
    <p>${game.teams[0]} (home)</p>
    <p>start time ${game.commence_time}</p>
    <p>away team H2H odds ${game.sites[0].odds.h2h[1]}
    <p>home team H2H odds ${game.sites[0].odds.h2h[0]}
    `
    gameContainer.appendChild(newGame)
    newGame.insertAdjacentHTML('beforeend', gameData)
  })
  
}