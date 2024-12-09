class Client < ApplicationRecord
  has_many :building
  has_many :custom_fields

  validates :name, presence: true
end