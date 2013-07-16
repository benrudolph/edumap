class Operation < ActiveRecord::Base
  attr_accessible :country, :lat, :lng

  has_many :data

  def self.public_models(options = {})
    Operation.all.to_json
  end
end
