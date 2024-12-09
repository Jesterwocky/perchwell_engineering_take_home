class CustomField < ApplicationRecord
  belongs_to :client
  has_many :custom_datas

  VALID_DATA_TYPES = ["string", "number", "enum"]
  validates :data_type, inclusion: { in: VALID_DATA_TYPES }
end