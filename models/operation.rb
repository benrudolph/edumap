class Operation < ActiveRecord::Base
  attr_accessible :country

  has_many :ppgs
end
