class PicksController < ApplicationController
  before_action :authenticate_user!

  def create
    unless Game.find(params[:game_id]).started?
      # Perhaps here is where we would look for an existing pick in order to modify it?
      # Something like
      # current_user_id = current_user.id
      # existing_pick = Pick.where('game_id = ? AND user_id = ?', params[:game_id], current_user_id]).first
      # if existing_pick
      #   existing_pick.picked_team_id: params[:picked_team_id]
      #   existing_pick.fav_pick = params[:fav_pick] if params[:fav_pick]
      #   existing_pick.save
      # else
      pick = Pick.new(game_id: params[:game_id], picked_team_id: params[:picked_team_id])
      pick.user = current_user
      pick.fav_pick = params[:fav_pick] if params[:fav_pick]
      pick.save
      
      render :nothing => true
    end
  end

  # GET /picks/1.json
  def find_pick_by_game_id
    game_id = params[:game_id]
    render :json => Pick.where(["game_id = ? and user_id = ?", game_id, current_user.id]).first
  end

  def destroy
    pick = Pick.find(params[:id])
    unless pick.game.started?
      pick.destroy
    end
  end

end
