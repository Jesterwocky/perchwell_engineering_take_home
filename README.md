# Perchwell Engineering Take-Home

Welcome to the Perchwell take-home assignment!

# Requirements

Please see the requirements [here](https://github.com/RivingtonHoldings/engineering_take_home/blob/main/REQUIREMENTS.md).

# JESSIE WALKER NOTE

Spent a long time getting the FE to work and ran out of time to dig into Ruby and SQL.
My basic DB design, which saves custom field data in separate tables based on data type:

1. Clients table
  Fields:
    a. id (primary key)
    b. name
2. Buildings table
  Fields:
    a. id (primary key)
    b. client_id (foreign key)
    c. address
    d. state
    e. zip
3. Custom Fields table
  Fields:
    a. id (primary key)
    b. client_id (foreign key)
    c. type
        type: enum/string
        options:
          - freeform
          - enum
          - number 
    d. name
    d. options
        type: string; labels separated by commas or other delimiters
        note: only used for enums
4. Custom Numbers table
  Fields:
    a. id (primary key)
    b. custom_field_id (foreign key)
    c. building_id (foreign key)
    d. value
        type: number
5. Custom Text table
  Fields:
    a. id (primary key)
    b. custom_field_id (foreign key)
    c. building_id (foreign key)
    d. value
        type: text
        note: represents freeform or enum value

APIs would accept:
  - The names of common fields as keys in creat or update building requests
  - A custom_fields object mapping field ID to value (could alternatively make
    sure to enforce unique names so custom_fields can be sent by name as well)

The dummy data in helpers/api give an idea of what the return values would look like
