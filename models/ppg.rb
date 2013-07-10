class Ppg < ActiveRecord::Base
  attr_accessible :name

  default_scope { includes([:impact_indicators, :perf_indicators]) }

  belongs_to :operation
  has_many :impact_indicators
  has_many :perf_indicators
end
