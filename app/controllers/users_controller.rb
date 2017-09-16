class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all.sort_by{|u| u.picks.correct.count }.reverse
  end
end
