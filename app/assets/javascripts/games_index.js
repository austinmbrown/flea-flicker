window.addEventListener('load', function () { 
  Vue.component('games-group', {
    props: ['games_group'],
    template: '<div>{{ games_group.text }}</div>'
  })
  var vm = new Vue({
    el: '#games',
    data: {
      // games_groups: Game.where(week: @week).group_by(&:kickoff).sort_by{|group| group[0]}
      message: 'Hello Vue.js!',
      games_groups: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]

    }
  })
})