class Pick < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  scope :correct, -> { where(correct: true) }

  def team_name
    Team.find(picked_team_id).name
  end
end
