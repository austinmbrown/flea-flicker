# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'stattleship'

Game.destroy_all
Team.destroy_all

puts "Getting teams"
query_params = Stattleship::Params::FootballTeamsParams.new
teams = Stattleship::FootballTeams.fetch(params: query_params)

teams.each do |team|
  Team.create(
    stattleship_id: team.id,
    location: team.location,
    name: team.nickname,
    logo_url: team.nickname + ".png"
  )
  puts team.nickname
end

puts "Getting games"
query_params = Stattleship::Params::FootballGamesParams.new
games = Stattleship::FootballGames.fetch(params: query_params)

games.each do |game|
  Game.create(
    stattleship_id: game.id,
    label: game.label,
    score: game.score,
    scoreline: game.scoreline,
    status: game.status,
    away_team_score: game.away_team_score,
    home_team_score: game.home_team_score,
    week: game.interval_number,
    kickoff: game.started_at,
    away_team_id: Team.find_by(stattleship_id: game.away_team_id).id,
    home_team_id: Team.find_by(stattleship_id: game.home_team_id).id,
    winning_team_id: Team.find_by(stattleship_id: game.winning_team_id).try(:id)
  )
  puts game.label
end


