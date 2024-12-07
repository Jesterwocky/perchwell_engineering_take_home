# Migration 2

class CreateBuildingsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :buildings do |t|
      t.references :client, null: false, foreign_key: true
      t.string :address
      t.string :state
      t.string :zip

      t.timestamps
    end
  end
end
