class WeeksController < ApplicationController
  before_action :authenticate_user!

  # GET /weeks
  def index
    current_user.picks.unevaluated.each(&:evaluate)

    week_number = params[:week] ? params[:week] : current_week

    favorite_team_game = current_user.favorite_team.find_game_by_week(week_number) if current_user.favorite_team
  end

  # GET /weeks/1.json
  def show
    week_number = params[:id]
    render :json => Game.where(week: week_number)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def current_week
      today = Date.today
      last_day = Date.new(2018, 2, 22)
      first_day = Date.new(2017, 8, 22)
      
      return if today > last_day || today < first_day
      ((today - first_day)).to_i/7-1
    end
  # end private
end
