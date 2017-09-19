namespace :games do
  desc "TODO"
  task update: :environment do

    today = Date.today
    last_day = Date.new(2018, 2, 22)
    first_day = Date.new(2017, 8, 22)

    return if today > last_day || today < first_day
    current_week = ((today - first_day)).to_i/7-1

    require 'stattleship'

    query_params = Stattleship::Params::FootballGamesParams.new
    query_params.week = current_week
    games_response = Stattleship::FootballGames.fetch(params: query_params)

    puts games_response

    games_response.each do |stattleship_game|
      game = Game.find_by_stattleship_id(stattleship_game.id)
      game.update(
        score: stattleship_game.score,
        scoreline: stattleship_game.scoreline,
        status: stattleship_game.status,
        away_team_score: stattleship_game.away_team_score,
        home_team_score: stattleship_game.home_team_score,
        winning_team_id: Team.find_by(stattleship_id: stattleship_game.winning_team_id).try(:id)
      )
      puts "Updated " + game.label
    end

    Team.all.each do |team|
      games_count = Game.where("away_team_id = ? or home_team_id = ?", team.id, team.id).where(status: "closed").count
      team.wins = Game.where(winning_team_id: team.id).count
      team.losses = games_count - team.wins
      # WHAT IF THERES A TIE?!
      team.save
    end

  end

end
