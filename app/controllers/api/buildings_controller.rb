class Api::BuildingsController < ApplicationController
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

  def show
    @building = Building.find(params[:id])
    render json: @building, status: :ok
  end

  def create
    @building = Building.new(building_request_body_params)

    if @building.save
      render json: @building, status: :created
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  def update
    @building = Building.find(params[:id])
    if @building.update(building_request_body_params)
      render json: @building
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  private

  def building_request_body_params
    params.require(:building).permit(:client_id, :address, :state, :zip)
  end
end