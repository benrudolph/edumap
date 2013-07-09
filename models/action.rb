class Action < ActiveRecord::Base
  attr_accessible :name

  has_many :impact_indicators
  has_many :perf_indicators
end
