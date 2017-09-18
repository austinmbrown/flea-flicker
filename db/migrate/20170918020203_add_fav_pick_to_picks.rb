class AddFavPickToPicks < ActiveRecord::Migration
  def change
    add_column :picks, :fav_pick, :boolean, default: false
  end
end
