class Building < ApplicationRecord
  belongs_to :client
  has_many :custom_value

  validates :address, presence: true
end