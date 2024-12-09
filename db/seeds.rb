# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

brick = Client.find_or_create_by(name: 'brick_brothers')
rock = Client.find_or_create_by(name: 'rockin_homes')
clay = Client.find_or_create_by(name: 'clay_and_carpenter')
wood = Client.find_or_create_by(name: 'wood_workers_inc')
straw = Client.find_or_create_by(name: 'straw_men_at_work')

# CUSTOM FIELDS -------------------------------------------------------------------
brick_color = CustomField.find_or_create_by(client: brick, name: 'brick_color', data_type: 'enum', options: ['red', 'black', 'white', 'beige', 'gray'])
mortar_color = CustomField.find_or_create_by(client: brick, name: 'mortar_color', data_type: 'enum', options: ['red', 'black', 'white', 'beige', 'gray'])
brick_count = CustomField.find_or_create_by(client: brick, name: 'brick_count', data_type: 'number')

rock_type = CustomField.find_or_create_by(client: rock, name: 'rock_type', data_type: 'enum', options: ['limestone', 'marble', 'granite'])
engraving_text = CustomField.find_or_create_by(client: rock, name: 'engraving_text', data_type: 'string')
slab_thickness_inches = CustomField.find_or_create_by(client: rock, name: 'slab_thickness_inches', data_type: 'number')

clay_texture = CustomField.find_or_create_by(client: clay, name: 'clay_texture', data_type: 'enum', options: ['smooth', 'stippled', 'striated'])
clay_source = CustomField.find_or_create_by(client: clay, name: 'clay_source', data_type: 'enum', options: ['north_america', 'asia', 'europe', 'africa'])
clay_color = CustomField.find_or_create_by(client: clay, name: 'clay_color', data_type: 'enum', options: ['red', 'green', 'gray', 'brown'])

tree_type = CustomField.find_or_create_by(client: wood, name: 'tree_type', data_type: 'enum', options: ['fir', 'pine', 'cedar'])
weather_proofing = CustomField.find_or_create_by(client: wood, name: 'weather_proofing', data_type: 'enum', options: ['yes', 'no'])
tree_age = CustomField.find_or_create_by(client: wood, name: 'tree_age', data_type: 'number')

straw_type = CustomField.find_or_create_by(client: straw, name: 'straw_type', data_type: 'enum', options: ['wheat', 'rye', 'barley'])
straw_packing_density = CustomField.find_or_create_by(client: straw, name: 'straw_packing_density', data_type: 'enum', options: ['light', 'medium', 'dense'])
bushel_count = CustomField.find_or_create_by(client: straw, name: 'bushel_count', data_type: 'number')

# BUILDINGS -------------------------------------------------------------------
building1 = Building.find_or_create_by(client: brick, address: '101 Cobble Street', state: 'NY', zip: '10001')
CustomData.find_or_create_by(
  building: building1,
  custom_field: brick_color,
  string_value: 'black')
CustomData.find_or_create_by(
  building: building1,
  custom_field: mortar_color,
  string_value: 'white')
CustomData.find_or_create_by(
  building: building1,
  custom_field: brick_count,
  number_value: 300)

building2 = Building.find_or_create_by(client: brick, address: '102 Gargoyle Glen', state: 'NY', zip: '10001')
CustomData.find_or_create_by(
  building: building2,
  custom_field: brick_color,
  string_value: 'red')
CustomData.find_or_create_by(
  building: building2,
  custom_field: mortar_color,
  string_value: 'red')
CustomData.find_or_create_by(
  building: building2,
  custom_field: brick_count,
  number_value: 4000)

building3 = Building.find_or_create_by(client: brick, address: '103 Cliff Circle', state: 'NY', zip: '10001')
CustomData.find_or_create_by(
  building: building3,
  custom_field: brick_color,
  string_value: 'beige')
CustomData.find_or_create_by(
  building: building3,
  custom_field: mortar_color,
  string_value: 'black')
CustomData.find_or_create_by(
  building: building3,
  custom_field: brick_count,
  number_value: 3500)

building4 = Building.find_or_create_by(client: rock, address: '201 Eveningstar Way', state: 'NY', zip: '10002')
CustomData.find_or_create_by(
  building: building4,
  custom_field: rock_type,
  string_value: 'marble')
CustomData.find_or_create_by(
  building: building4,
  custom_field: engraving_text,
  string_value: 'Vandalay')
CustomData.find_or_create_by(
  building: building4,
  custom_field: slab_thickness_inches,
  number_value: 2.1)

building5 = Building.find_or_create_by(client: rock, address: '202 Railway Blvd', state: 'NY', zip: '10002')
CustomData.find_or_create_by(
  building: building5,
  custom_field: rock_type,
  string_value: 'limestone')
CustomData.find_or_create_by(
  building: building5,
  custom_field: engraving_text,
  string_value: 'Home Sweet Home')
CustomData.find_or_create_by(
  building: building5,
  custom_field: slab_thickness_inches,
  number_value: 1.5)

building6 = Building.find_or_create_by(client: rock, address: '203 Timid Deer Path', state: 'NY', zip: '10002')
CustomData.find_or_create_by(
  building: building6,
  custom_field: rock_type,
  string_value: 'granite')
CustomData.find_or_create_by(
  building: building6,
  custom_field: engraving_text,
  string_value: 'No Soliciting')
CustomData.find_or_create_by(
  building: building6,
  custom_field: slab_thickness_inches,
  number_value: 2.8)

building7 = Building.find_or_create_by(client: clay, address: '301 Ululation Ave', state: 'NY', zip: '10003')
CustomData.find_or_create_by(
  building: building7,
  custom_field: clay_texture,
  string_value: 'striated')
CustomData.find_or_create_by(
  building: building7,
  custom_field: clay_source,
  string_value: 'north_america')
CustomData.find_or_create_by(
  building: building7,
  custom_field: clay_color,
  string_value: 'brown')

building8 = Building.find_or_create_by(client: clay, address: '302 Celebration Center', state: 'NY', zip: '10003')
CustomData.find_or_create_by(
  building: building8,
  custom_field: clay_texture,
  string_value: 'smooth')
CustomData.find_or_create_by(
  building: building8,
  custom_field: clay_source,
  string_value: 'africa')
CustomData.find_or_create_by(
  building: building8,
  custom_field: clay_color,
  string_value: 'red')

building9 = Building.find_or_create_by(client: clay, address: '303 Bonfire Row', state: 'NY', zip: '10003')
CustomData.find_or_create_by(
  building: building9,
  custom_field: clay_texture,
  string_value: 'stippled')
CustomData.find_or_create_by(
  building: building9,
  custom_field: clay_source,
  string_value: 'asia')
CustomData.find_or_create_by(
  building: building9,
  custom_field: clay_color,
  string_value: 'gray')

building10 = Building.find_or_create_by(client: wood, address: '401 Visionary Vale', state: 'NY', zip: '10004')
CustomData.find_or_create_by(
  building: building10,
  custom_field: tree_type,
  string_value: 'fir')
CustomData.find_or_create_by(
  building: building10,
  custom_field: weather_proofing,
  string_value: 'yes')
CustomData.find_or_create_by(
  building: building10,
  custom_field: tree_age,
  string_value: 2.5)

building11 = Building.find_or_create_by(client: wood, address: '402 Barnacle Blvd', state: 'NY', zip: '10004')
CustomData.find_or_create_by(
  building: building11,
  custom_field: tree_type,
  string_value: 'pine')
CustomData.find_or_create_by(
  building: building11,
  custom_field: weather_proofing,
  string_value: 'no')
CustomData.find_or_create_by(
  building: building11,
  custom_field: tree_age,
  string_value: 1)

building12 = Building.find_or_create_by(client: wood, address: '403 Fancyfeast Lane', state: 'NY', zip: '10004')
CustomData.find_or_create_by(
  building: building12,
  custom_field: tree_type,
  string_value: 'cedar')
CustomData.find_or_create_by(
  building: building12,
  custom_field: weather_proofing,
  string_value: 'yes')
CustomData.find_or_create_by(
  building: building12,
  custom_field: tree_age,
  string_value: 4)

building13 = Building.find_or_create_by(client: straw, address: '501 River Heights', state: 'NY', zip: '10005')
CustomData.find_or_create_by(
  building: building13,
  custom_field: straw_type,
  string_value: 'wheat')
CustomData.find_or_create_by(
  building: building13,
  custom_field: straw_packing_density,
  string_value: 'light')
CustomData.find_or_create_by(
  building: building13,
  custom_field: bushel_count,
  string_value: 11)

building14 = Building.find_or_create_by(client: straw, address: '502 Weatherby Street', state: 'NY', zip: '10005')
CustomData.find_or_create_by(
  building: building14,
  custom_field: straw_type,
  string_value: 'rye')
CustomData.find_or_create_by(
  building: building14,
  custom_field: straw_packing_density,
  string_value: 'dense')
CustomData.find_or_create_by(
  building: building14,
  custom_field: bushel_count,
  string_value: 25)

building15 = Building.find_or_create_by(client: straw, address: '503 Highfalutin Circle', state: 'NY', zip: '10005')
CustomData.find_or_create_by(
  building: building15,
  custom_field: straw_type,
  string_value: 'barley')
CustomData.find_or_create_by(
  building: building15,
  custom_field: straw_packing_density,
  string_value: 'medium')
CustomData.find_or_create_by(
  building: building15,
  custom_field: bushel_count,
  string_value: 18)
