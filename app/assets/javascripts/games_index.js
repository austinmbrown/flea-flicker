window.addEventListener('load', function () {
  var Week ={
    props: ['week', 'teams'],
    template: `
      <div class="week">
        <start-time id="start-time" :start_time="start_time" v-for="start_time in week" v-bind:key="start_time.id" :teams="teams"></start-time>
        <!-- <game-details id="game" :game="game" v-for="(game, index) in week" v-bind:key="game.id"></game-details> -->
      </div>`
  };

  Vue.component('start-time', {
    props: ['start_time', 'teams'],
    template: `
      <div class="start-time">
        <div class="start-time__text start-time__text--gametime">{{ formatGameTime(start_time.gameTime) }}</div>
        <game-details id="game" :game="game" v-for="game in start_time.games" v-bind:key="game.id" :teams="teams"></game-details>
      </div>`,
    methods: {
      formatGameTime: function (_gameTime) {
        return moment(_gameTime).format("[WK] ddd - hh:mmA");
      }
    }
  });

  Vue.component('game-details', {
    props: ['game', 'teams'],
    template: `
      <div class="game">
        <team-details id="team" :team="getTeamDataById(game.away_team_id)" :isHome="false"></team-details>
        <team-details id="team" :team="getTeamDataById(game.home_team_id)" :isHome="true"></team-details>
      </div>`,
    methods: {
      getTeamDataById: function(_id) {
        let self = this;
        function isTeamMatch(element) {
          return element.id == _id;
        }
        return self.teams.find(isTeamMatch);
      }
    }
  });

  Vue.component('team-details', {
    props: ['team', 'isHome'],
    template: `
      <div class="team" v-bind:class="{ 'team--home': isHome }">
        <div class="team__logo">
          <img src=""/>
        </div>
        <div class="team__text-container team__text-container--away">
          <div class="team__text team__text--name">{{ team.name }}</div>
          <div class="team__text team__text--record">{{ team.wins }} - {{ team.losses }}</div>
        </div>
      </div>`,
    methods: {  }
  });

  const vm_games_index = new Vue({
    el: '#week',

    mounted: function (_weekId) {
      this.$nextTick(function () {})
      let self = this;
      let weekUrl = "/games.json";

      $.ajax({
        method: "GET",
        url: weekUrl,
        success: (week_data => {self.week = week_data}),
        error: (error => {console.log(error)})
      })
      $.ajax({
        method: "GET",
        url: "/teams.json",
        success: (teams_data => {self.teams = teams_data}),
        error: (error => {console.log(error)})
      })
    },
    components: {
      'week' : Week
    },
    data: function() {
      return { week: [], teams: [] }
    },
    computed: {  },
    methods: {
      groupGamesByKickoff: function(_gamesArray) {

        let makeKickoffObject = function (_id, _time) {
          newKickoffObject = {};
          newKickoffObject.id = _id;
          newKickoffObject.gameTime = _time;
          newKickoffObject.games = [];
          return newKickoffObject
        }

        let week = [];
        let kickoff = makeKickoffObject(1, "To be overwritten");

        for (n = 0; n < _gamesArray.length; n++) {
          let thisGame = _gamesArray[n];
          if (thisGame.kickoff === kickoff.gameTime) {
            kickoff.games.push(thisGame);
          } else {
            if (kickoff.games.length > 0) { week.push(kickoff); }

            kickoff = makeKickoffObject(kickoff.id + 1, thisGame.kickoff);
            kickoff.games.push(thisGame);

            if (n === _gamesArray.length - 1) { week.push(kickoff); }
          }
        }
        reversedWeek = week.reverse();
        return reversedWeek;
      }
    },
    actions: {  }
  });
})
