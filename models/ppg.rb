class Ppg < ActiveRecord::Base
  attr_accessible :name

  has_many :data
end
