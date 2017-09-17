class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: [:show]

  # GET /games
  # GET /games.json
  def index
    current_user.picks.unevaluated.each(&:evaluate)
    @current_week = current_week
    if params[:week]
      @week = params[:week]
      @games = Game.where(week: params[:week])
    else
      @week = @current_week
      @games = Game.where(week: @week)
    end
  end

  # GET /games/1
  # GET /games/1.json
  def show
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    def current_week
      today = Date.today
      last_day = Date.new(2018, 2, 22)
      first_day = Date.new(2017, 8, 22)

      return if today > last_day || today < first_day
      ((today - first_day)).to_i/7-1
    end

end
