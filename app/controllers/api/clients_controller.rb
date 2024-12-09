class Api::ClientsController < ApplicationController
  def index
    @clients = Client
      .includes(:custom_fields)
      .as_json(include: :custom_fields)

     # @buildings = Building
    #   .includes(:custom_values, :client)
    #   .as_json(include: [:custom_values, :client])
    # render json: @buildings

    render json: @clients
  end
end
