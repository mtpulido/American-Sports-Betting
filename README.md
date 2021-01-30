# American-Sports-Betting

# Project Overview

## Project Name

American Sports-Book

## Project Description

My website will have navigation functionality to show real-time NBA Basketball odds in the main body of the website with access to each game within that category and 3 options of bets for those games (head-to-head, spread, and over/under).


## API and Data Sample

[Odds API](https://the-odds-api.com/liveapi/guides/v3/#overview)

```
success": true,
    "data": [
        {
            "sport_key": "americanfootball_nfl",
            "sport_nice": "NFL",
            "teams": [
                "Kansas City Chiefs",
                "Tampa Bay Buccaneers"
            ],
            "commence_time": 1612740600,
            "home_team": "Tampa Bay Buccaneers",
            "sites": [
                {
                    "site_key": "unibet",
                    "site_nice": "Unibet",
                    "last_update": 1611591222,
                    "odds": {
                        "totals": {
                            "position": [
                                "over",
                                "under"
                            ],
                            "odds": [
                                1.93,
                                1.89
                            ],
                            "points": [
                                56.5,
                                56.5
                            ]
                        }
                    }
                },
                {
```

## Wireframes

[link to wireframe](https://wireframe.cc/Uk1vUI)

### MVP/PostMVP

#### MVP 

- access sports API for NBA to utilize up-to-date odds for the user.
- Render all the bets for that day in the body of the website
- Allow user to click on bet and append to the "betslip"

#### PostMVP  

- Apply the MVPs above to NFL, NCAA Basketball, and NHL Hockey
- Create "placing your bet" animation for when a bet is placed before it hits the "betslip".
- Create a landing page for users to sign up and display promotional content.

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Jan 25-26| Project Planning and Prjoect Approval | Incomplete
|Jan 26| start HTML structure, code API data fetches for each sport | Incomplete
|Jan 27| finalize HTML structure, code functionality to display/remove game odds according to navigation | Incomplete
|Jan 28| code clickable bet selections and append to "bet slip"  | Incomplete
|Jan 29| CSS: flexbox positioning, overall styling, media queries to finish off MVP | Incomplete
|Feb 1| Presentations/Project Submission | Incomplete

## Priority Matrix

[link to priority matrix](https://app.conceptboard.com/board/di08-1nh7-xtis-5104-qs17)

## Timeframes

|          Component            | Priority | Estimated Time | Time Invested | Actual Time |
|---|---| ---| ---| ---|
|     Project Planning          |    Low   |    4 hours     |    4 hours    |   4 hours   |
| Initial HTML Structure        |    Low   |    30 min      |    30 min     |   1 hour    |
|      API Fetches NBA          |    High  |    3 hours     |    3 hours    |   3 hours   |
|  Adjust to EST & adjust odds  |    High  |    3 hours     |    3 hours    |   3 hours   |
|  Render Dynamic API Content   |    High  |    3 hours     |    3 hours    |   3 hours   |
| Click-Bet Functionality.      |    High  |    4.5 hours   |    10 hours   |   10 hours  |
| "Betslip" functionality.      |  medium  |    3.5 hours   |    1 hour     |   1 hour    |
|  append user selected bet data|    High  |    3 hours     |    3 hours    |   3 hours   |
|   CSS Flexbox container/items |  medium  |    4 hours     |    6 hours    |   6 hours   |
|   assign/build CSS elements   |  medium  |    3 hours     |    2 hours    |   2 hours   |
|    Media Queries (mobile)     |   low    |    3 hours     |    3 hours    |   3 hours   |
|             Total             |    High  |    34.5 hours  |    38.5 hours |   38.5 hours|



## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
// within the function to append the teams playing and start times in the far left column, I had to solve how to edit the "game.commence_time" endpoint to have the look of a normal date and time. It's orginal format was iso8601.

//...

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
  }) //declaring a variable (gameData) for the actual API data that i need for each game and creating HTML elements from them and appending them to the game container. 
}

let fixTime = (isoDate) => {
  let localDate = new Date(isoDate)
  let dateString = localDate.toString()
  let dateFormat = `${dateString.slice(0, 10)}`
  let timeFormat = ` ${dateString.slice(16, 21)}PM`

  return dateFormat + timeFormat
}
}
```

## Change Log
 There was no need to remove API data as I was firmly instructed to stop working and not accomplish my post MVP goal of displaying the data for the football, college basketball, and hockey. I thus removed it from my timeframes. Due to this I also removed "render other API content". 

 Also, I had to adjust the odds data as it came in a decimal format and i needed it to display the +/- larger numbers. I added this in next to the adjusting the time. 
