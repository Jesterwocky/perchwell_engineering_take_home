# Migration 3

class CreateCustomFieldsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_fields do |t|
      t.references :client, null: false, foreign_key: true
      t.string :type # enum - set up options in the model: enum, freeform, or number
      t.string :name
      t.string :options # comma-separated values

      t.timestamps
    end
  end
end
