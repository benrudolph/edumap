class Operation < ActiveRecord::Base
  attr_accessible :country

  default_scope { includes(:ppgs) }

  has_many :ppgs

  def self.public_models(options = {})
    Operation.all.to_json({
      :include => {
        :ppgs => {
          :include => [:impact_indicators, :perf_indicators]
        }
      }
    })
  end
end
