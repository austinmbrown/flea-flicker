class SetTeamsDefaults < ActiveRecord::Migration
  def change
    change_column_default :teams, :wins, 0
    change_column_default :teams, :losses, 0
    change_column_default :teams, :ties, 0
  end
end
