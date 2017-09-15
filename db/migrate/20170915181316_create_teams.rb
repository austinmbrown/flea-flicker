class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :location
      t.string :name
      t.string :stattleship_id
      t.string :logo_url
      t.integer :wins
      t.integer :losses
      t.integer :ties

      t.timestamps null: false
    end
  end
end
