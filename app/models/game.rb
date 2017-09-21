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

  def away_team_wins
    winning_team_id == away_team_id
  end

  def home_team_wins
    winning_team_id == home_team_id
  end

  def started?
    kickoff < DateTime.now
  end

  def user_pick(user, juju_pick=false)
    picks.find_by(user_id: user.id, fav_pick: juju_pick)
  end

  def user_pick_team(user, juju_pick=false)
    team_id = picks.find_by(user_id: user.id, fav_pick: juju_pick).try(:picked_team_id)
    if team_id
      Team.find(team_id)
    end
  end

end
