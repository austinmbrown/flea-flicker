window.addEventListener('load', function () {
  var GamesGroups = {
    props: ['games_groups'],
    template: `
      <div class="games">
        <game-group :games_group="games_group" v-for="(games_group, index) in games_groups" v-bind:key="games_group.id"></game-group>
      </div>`
  };

  Vue.component('game-group', {
    props: ['games_group'],
    template: `
      <div class="games__group">
        <div class="games__text games__text--gametime">{{ games_group.game_time }}</div>
        <game-details :game="game" v-for="(game, index) in games_group.games" v-bind:key="game.id"></game-details>
      </div>`
  });

  Vue.component('game-details', {
    props: ['game', 'isPickable'],
    template: `
      <div class="game">
        <!-- This should be a loop over teams -->
        <team-details :team="team" v-for="team in game.teams" v-bind:key="team.id">{{ index }}</team-details>
      </div>`
  });

  Vue.component('team-details', {
    props: ['team'],
    template: `
      <div class="team">
        <div class="team__logo">
          <img src=""/>
        </div>
        {{ team.name }}
      </div>
    `
  });

  const vm_games = new Vue({
    el: '#games',
    components: {
      'games-groups-list' : GamesGroups
    },
    data: function() {
      return {
        games_groups: [
          {
            id: 1,
            game_time: new Date(2017, 0, 15),
            games: 
            [
              {
                id: 1,
                label: 'Berlin',
                teams: [{
                    id: 123,
                    name: 'Cardinals',
                    location: 'Arizona'
                  },
                  {
                    id: 124,
                    name: 'Texans',
                    location: 'Houston'
                }],
                home_team_score: 10,
                away_team_score: 40
              }, {
                id: 2,
                label: 'London',
                teams: [
                  {
                    id: 125,
                    name: 'Falcons',
                    location: 'Atlanta'
                  },
                  {
                    id: 126,
                    name: 'Bills',
                    location: 'Buffalo'
                  }
                ],
                home_team_score: 10,
                away_team_score: 40
              }, {
                id: 3,
                label: 'New York',
                teams: [
                  {
                    id: 127,
                    name: 'Ravens',
                    location: 'Baltimore'
                  },
                  {
                    id: 128,
                    name: 'Buccaneers',
                    location: 'Tampa Bay'
                  }
                ],
                home_team_score: 10,
                away_team_score: 40
              }
            ]
          }, {
            id: 2,
            game_time: new Date(2017, 0, 18),
            games: [
              {
                id: 4,
                label: 'Moscow',
                teams: [
                  {
                    id: 129,
                    name: 'Steelers',
                    location: 'Pittsburgh'
                  },
                  {
                    id: 130,
                    name: 'Packers',
                    location: 'Green Bay'
                  }
                ],
                home_team_score: 10,
                away_team_score: 40
              }, {
                id: 5,
                label: 'Seoul',
                teams: [
                  {
                    id: 131,
                    name: 'Vikings',
                    location: 'Minnesota'
                  },
                  {
                    id: 132,
                    name: 'Raiders',
                    location: 'Oakland'
                  }
                ],
                home_team_score: 10,
                away_team_score: 40
              }, {
                id: 6,
                label: 'Paris',
                teams: [
                  {
                    id: 133,
                    name: 'Patriots',
                    location: 'New England'
                  },
                  {
                    id: 134,
                    name: 'Rams',
                    location: 'Los Angeles'
                  }
                ],
                home_team_score: 10,
                away_team_score: 40
              }
            ]
          }
        ]
      }
    },
    methods: {

    },
    actions: {

    }
  });
})