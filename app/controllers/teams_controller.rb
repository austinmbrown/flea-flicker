class TeamsController < ApplicationController

  # GET /teams
  # GET /teams.json
  def index
    render :json => Team.all
  end

  # GET /teams/1
  # GET /teams/1.json
  def show
    team_id = params[:id]
    render :json => Team.find(team_id)
  end


  private
    # Use callbacks to share common setup or constraints between actions.

end