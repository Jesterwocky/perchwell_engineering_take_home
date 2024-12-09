# Migration 3

class CreateCustomFieldsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_fields do |t|
      t.references :client, null: false, foreign_key: true
      t.string :data_type
      t.string :name
      t.string :options, array: true

      t.timestamps
    end
  end
end
