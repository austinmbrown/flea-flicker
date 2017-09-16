class CreatePicks < ActiveRecord::Migration
  def change
    create_table :picks do |t|
      t.belongs_to :user, index: true
      t.belongs_to :game, index: true
      t.integer :picked_team_id
      t.boolean :correct

      t.timestamps null: false
    end
  end
end
