json.extract! game, :id, :start_time, :home_team, :away_team, :created_at, :updated_at
json.url game_url(game, format: :json)
