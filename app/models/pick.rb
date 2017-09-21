class Pick < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  scope :correct, -> { where(correct: true) }
  scope :incorrect, -> { where(correct: false) }
  scope :unevaluated, -> { where(correct: nil) }

  def team_name
    Team.find(picked_team_id).name
  end

  def evaluate
    if game.winning_team_id
      if picked_team_id == game.winning_team_id
        self.update(correct: true)
      else
        self.update(correct: false)
      end
    end
  end
end
