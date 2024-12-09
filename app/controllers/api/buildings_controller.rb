class Api::BuildingsController < ApplicationController
  def index
    @buildings = Building.all
    render json: @buildings, status: :ok
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