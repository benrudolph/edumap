class Ppg < ActiveRecord::Base
  attr_accessible :name

  belongs_to :operation
  has_many :impact_indicators
  has_many :perf_indicators
end
