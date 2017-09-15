class AddFieldsToGames < ActiveRecord::Migration
  def change
    add_column :games, :stattleship_id, :string
    add_column :games, :label, :string
    add_column :games, :score, :string
    add_column :games, :scoreline, :string
    add_column :games, :status, :string
    add_column :games, :away_team_score, :integer
    add_column :games, :home_team_score, :integer
    add_column :games, :week, :integer
    add_column :games, :kickoff, :datetime
    add_column :games, :away_team_id, :integer
    add_column :games, :home_team_id, :integer
    add_column :games, :winning_team_id, :integer
    remove_column :games, :home_team
    remove_column :games, :away_team
    remove_column :games, :start_time
  end
end
