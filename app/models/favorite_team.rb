class FavoriteTeam < ActiveRecord::Base
  belongs_to :user
  belongs_to :team

  def find_game_by_week(week)
    Game.where(week: week).where("away_team_id = ? or home_team_id = ?", team.id, team.id).first
  end
end
