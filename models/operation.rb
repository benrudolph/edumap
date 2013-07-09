class Operation < ActiveRecord::Base
  attr_accessible :country, :ppgs

  has_many :ppgs
end
