class Pick < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  def team_name
    Team.find(picked_team_id).name
  end
end
