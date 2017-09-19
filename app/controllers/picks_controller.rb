class PicksController < ApplicationController
  before_action :authenticate_user!

  def create
    if Game.find(params[:game_id]).started?
      redirect_to games_url
    else
      pick = Pick.new(game_id: params[:game_id], picked_team_id: params[:picked_team_id])
      pick.user = current_user
      pick.fav_pick = params[:fav_pick] if params[:fav_pick]
      pick.save
      redirect_to games_url
    end
  end

  def destroy
    pick = Pick.find(params[:id])
    if pick.game.started?
      redirect_to games_url
    else
      pick.destroy
      redirect_to games_url
    end
  end

end
