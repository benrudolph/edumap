class Datum < ActiveRecord::Base
  attr_accessible :olbudget, :aolbudget, :baseline, :standard, :oltarget, :optarget, :myr, :year, :yer

  default_scope { includes([:operation, :indicator, :ppg]) }

  belongs_to :indicator, polymorphic: true
  belongs_to :ppg
  belongs_to :operation
end
