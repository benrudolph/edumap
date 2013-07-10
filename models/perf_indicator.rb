class PerfIndicator < ActiveRecord::Base
  attr_accessible :output, :name

  belongs_to :action
  has_many :data
end
