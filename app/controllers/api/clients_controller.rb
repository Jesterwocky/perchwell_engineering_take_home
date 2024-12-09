class Api::ClientsController < ApplicationController
  def index
    @clients = Client
      .includes(:custom_fields)
      .as_json(include: :custom_fields)

    render json: @clients
  end
end
