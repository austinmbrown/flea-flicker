class Game < ActiveRecord::Base
  has_many :picks

  def away_team
    Team.find(away_team_id)
  end

  def home_team
    Team.find(home_team_id)
  end

  def winning_team
    winning_team_id ? Team.find(winning_team_id) : nil
  end

  def started?
    kickoff < DateTime.now
  end

  def user_pick(user)
    picks.find_by(user_id: user.id, fav_pick: false)
  end

  def user_pick_team(_user)
    team_id = picks.find_by(user_id: _user.id).try(:picked_team_id)
    if team_id
      Team.find(team_id)
    end
  end

  def fav_pick(user)
    picks.find_by(user_id: user.id, fav_pick: true)
  end
end
