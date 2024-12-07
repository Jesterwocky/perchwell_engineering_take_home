class CreateClientsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :clients_tables do |t|
      t.string :name
      t.timestamps
    end
  end
end
