class PPG < ActiveRecord::Base
  has_many :impact_indicators
  has_many :perf_indicators
end
