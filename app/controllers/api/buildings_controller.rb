class Api::BuildingsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index, :create, :update]

  def index
    @buildings = Building.includes(:custom_value, :client)

    res = @buildings.map do |building|
      {
        id: building.id,
        address: building.address,
        state: building.state,
        zip: building.zip,
        client_name: building.client.name,
        client_id: building.client.id,
        custom_fields: building.client&.custom_fields.map do |custom_field|
          {
            name: custom_field.name,
            type: custom_field.data_type,
            options: custom_field.options
          }
        end
      }.merge(
        building.custom_value.reduce({}) do |accum, custom_value|
          accum[custom_value.custom_field&.name] = custom_value.custom_field&.data_type === 'number' ?
            custom_value.number_value :
            custom_value.string_value
          accum
        end
      )
    end

    render json: res
  end

  def create
    basic_vals = request_body_params
      .select { |param, val| ['client_id', 'address', 'state', 'zip'].include?(param) }

    custom_vals = request_body_params
      .reject { |param, val| ['client_id', 'address', 'state', 'zip'].include?(param) }

    puts 'BASIC VALS -------------------'
    puts basic_vals
    puts 'CUSTOM VALS -------------------'
    puts custom_vals

    @building = Building.new(basic_vals)

    if @building.save
      @custom_values = custom_vals.to_h.map do |param, val|
        custom_fields = @building.client&.custom_fields || []
        custom_field = custom_fields.find(param)

        CustomValue.create!({
          building_id: @building.id,
          custom_field_id: custom_field.id,
          number_value: custom_field.data_type === 'number' ? val : nil,
          string_value: custom_field.data_type === 'number' ? nil : val
        })
      end

      # TODO: make helper functions
      res = [{
        id: @building.id,
        address: @building.address,
        state: @building.state,
        zip: @building.zip,
        client_name: @building.client.name,
        client_id: @building.client.id,
        custom_fields: @building.client&.custom_fields.map do |field|
          {
            name: field.name,
            type: field.data_type,
            options: field.options
          }
        end
      }.merge(
       @building.custom_value.reduce({}) do |accum, custom_value|
          accum[custom_value.custom_field&.name] = custom_value.custom_field&.data_type === 'number' ?
            custom_value.number_value :
            custom_value.string_value
          accum
        end
      )]
  
      render json: res
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  def update
    basic_vals = request_body_params
      .select { |param, val| [:client_id, :address, :state, :zip].include?(param) }

    custom_vals = request_body_params
      .reject { |param, val| [:client_id, :address, :state, :zip].include?(param) }

    @building = Building.find(params[:id])
    if @building.update(basic_vals)
      @custom_values = custom_vals.map do |param, val|
        custom_fields = @building.client&.custom_fields || []
        custom_field = custom_fields.find(param)

        # TODO: add validations
        custom_value = CustomValue.find_or_create_by(building_id: building.id, custom_field_id: custom_field.id) do |new_custom_value|
          if custom_field.data_type == 'number'
            new_custom_value.number_value = val
          else
            new_custom_value.string_value = val
          end
        end

        if custom_field.data_type == 'number'
          custom_value.number_value = val
        else
          custom_value.string_value = val
        end
      end

      # TODO: helper
      res = {
        id: building.id,
        address: building.address,
        state: building.state,
        zip: building.zip,
        client_name: building.client.name,
        client_id: building.client.id,
        custom_fields: building.client&.custom_fields.map do |custom_field|
          {
            name: custom_field.name,
            type: custom_field.data_type,
            options: custom_field.options
          }
        end
      }.merge(
        building.custom_value.reduce({}) do |accum, custom_value|
          accum[custom_value.custom_field&.name] = custom_value.custom_field&.data_type === 'number' ?
            custom_value.number_value :
            custom_value.string_value
          accum
        end
      )
  
      render json: res
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  private

  def request_body_params
    client_id = params.dig(:building, :client_id)
    client = Client.find_by(id: client_id)
    custom_field_names = client ? client.custom_fields.pluck(:name) : []

    params.require(:building).permit(:client_id, :address, :state, :zip, *custom_field_names)
  end
end