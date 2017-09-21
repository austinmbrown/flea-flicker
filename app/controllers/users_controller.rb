class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    Pick.unevaluated.each(&:evaluate)
    @users = User.all.sort_by{|u| u.picks.correct.count }.reverse
  end
end
