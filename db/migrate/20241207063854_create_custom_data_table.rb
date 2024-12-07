# Migration 4

class CreateCustomDataTable < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_data do |t|
      t.references :building, null: false, foreign_key: true
      t.references :custom_field, null: false, foreign_key: true
      t.decimal :number_value
      t.string :string_value

      t.timestamps
    end
  end
end
