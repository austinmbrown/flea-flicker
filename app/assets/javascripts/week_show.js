window.addEventListener('load', function () {
  var Week ={
    props: ['week', 'teams', 'user_id'],
    template: `
      <div class="week">
        <start-time id="start-time" :start_time="start_time" v-for="start_time in week" v-bind:key="start_time.id" :teams="teams" :user_id="user_id" ></start-time>
        <!-- <game-details id="game" :game="game" v-for="(game, index) in week" v-bind:key="game.id"></game-details> -->
      </div>`
  };

  Vue.component('start-time', {
    props: ['start_time', 'teams', 'user_id'],
    template: `
      <div class="start-time">
        <div class="start-time__text start-time__text--gametime">{{ formatGameTime(start_time.gameTime) }}</div>
        <game-details id="game" :game="game" v-for="game in start_time.games" v-bind:key="game.id" :teams="teams" :hasBegun="determinePickability(start_time.gameTime)" :user_id="user_id" ></game-details>
      </div>`,
    methods: {
      formatGameTime: function (_gameTime) {
        return moment(_gameTime).format("[WK] ddd - hh:mmA");
      },
      determinePickability: function (_gameTime) {
        return moment().diff(_gameTime, 'minutes') < 0;
      }
    }
  });

  Vue.component('game-details', {
    props: ['game', 'teams', 'hasBegun', 'user_id'],
    template: `
      <div class="game" v-bind:class="[hasBegun ? 'game--is-pickable' : 'game--is-frozen']">
        <team-details id="team" :pick="pick" :team="getTeamDataById(game.away_team_id)" :isHome="false" :isDisabled="!hasBegun" :user_id="user_id" ></team-details>
        <team-details id="team" :pick="pick" :team="getTeamDataById(game.home_team_id)" :isHome="true" :isDisabled="!hasBegun" :user_id="user_id" ></team-details>
      </div>`,
    data: function() {
      return { pick: {} }
    },
    mounted: function() {
      let self = this;
      find_pick_by_game_id_url = '/picks/' + self.game.id
      $.ajax({
        method: "GET",
        url: find_pick_by_game_id_url,
        success: (pick_data => {self.pick = pick_data}),
        error: (error => {console.log(error)})
      })
    },
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
    props: ['team', 'isHome', 'isDisabled', 'user_id', 'pick'],
    template: `
      <!-- Have Vue tell Rails to create a pick if there is no pick -->
      <!-- And maybe modify the pick if there is an existing pick -->
      <!-- ALSO making a selection, doesn't dynamically refresh the pick data that's being passed through -->
      <button class="team" v-on:click="createPick(user_id)" v-bind:disabled="isDisabled" v-bind:class="[[isHome ? 'team--home' : 'team--away'],{'team--picked' : isPicked}]">
        <div class="team__logo">
          <img src=""/>
        </div>
        <div class="team__text-container" v-bind:class="[isHome ? 'team__text-container--home' : 'team__text-container--away']">
          <div class="team__text team__text--name">{{ getName(team) }}</div>
          <div class="team__text team__text--record">{{ getWins(team) }} - {{ getLosses(team) }}</div>
          <div>{{isPicked}}</div>
        </div>
      </button>`,
    computed: {
      isPicked: function() {
        let self = this
        if(self.pick && self.team)
          return self.pick.picked_team_id === self.team.id
        else
          return false
      }
    },
    methods: {
      createPick: function (_userId, _isFavTeamPick) {
        let self = this

        gameId = self.$parent.game.id
        teamId = self.team.id
        userId = _userId
        pickUrl = '/picks' + '?game_id=' + gameId + '&picked_team_id=' + teamId
        if(_isFavTeamPick) {
          pickUrl = pickUrl + '&fav_pick=' + true
        }
        console.log(gameId, teamId, userId, _isFavTeamPick)
        console.log(pickUrl)
        // [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "pick"
        $.ajax({
          method: "POST",
          url: pickUrl,
          success: (pick_data => {self.pick = pick_data}),
          error: (error => {console.log(error)})
        })
      },
      // The weirdest thing is happening here
      // _SOMETIMES_ Vue doesn't load team fast enough in the template
      // So we get 32 warnings, and 32 undefineds before they load
      // But not all the time. No love on SO yet, but I'll keep looking
      getName: function (_team) { return _team.name },
      getWins: function (_team) { return _team.wins },
      getLosses: function (_team) { return _team.losses }
    }
  });

  const vm_weeks_show = new Vue({
    el: '#week',
    mounted: function () {
      currentSearch = location.search;

      getCurrentlyViewedWeek = function() {
        weekNumber = parseInt(currentSearch.replace(/[^0-9\.]/g, ''), 10);
        if (isNaN(weekNumber)) {
          today = Date.now();
          firstDay = Date.parse('Aug 22, 2017');
          lastDay = Date.parse('Feb 22, 2018');

          if (today < firstDay || today > lastDay) {
            return
          } else {
            weekNumber = moment(today).startOf('week').diff(firstDay, 'weeks') - 1;
          }
        }
        return weekNumber;
      };

      thisWeek = getCurrentlyViewedWeek();

      let self = this;
      let weekUrl = "/weeks/" + thisWeek + ".json";

      // Maybe I need to put the teams GET in a .then?
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
