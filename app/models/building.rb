class Building < ApplicationRecord
  belongs_to :client
  has_many :custom_datas

  validates :address, presence: true
end