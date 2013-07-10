class ImpactIndicator < ActiveRecord::Base
  attr_accessible :objective, :name

  belongs_to :action
  has_many :data

end
