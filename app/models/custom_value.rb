class CustomValue < ApplicationRecord
  belongs_to :building
  belongs_to :custom_field

  validates :building, presence: true
  validates :custom_field, presence: true
  validate :data_type_and_field_value_matches_field, on: create

  private

  def data_type_and_field_value_matches_field
    field_config = Custom_Field.find_by(id: custom_field_id)

    case field_config.data_type
    when 'number'
      unless string_value.blank?
        errors.add(:number_value, "wrong value type; value must be a number")
      end
    when 'string'
      unless number_value.blank?
        errors.add(:string_value, "wrong value type; value must be a string")
      end
    when 'enum'
      unless number_value.blank?
        errors.add(:string_value, "wrong value type; value must be a string")
      end

      options = field_config.options || []

      if options.empty
        errors.add(:string_value, "not a valid selection. Field has no options configured")
      else
        unless options.include?(string_value)
          errors.add(:string_value, "invalid selection")
        end
      end
    end
  end
end