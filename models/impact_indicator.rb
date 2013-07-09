class ImpactIndicator < ActiveRecord::Base
  attr_accessible :objective, :olbudget, :aolbudget, :indicator, :baseline, :standard, :oltarget, :optarget, :myr, :yer

  belongs_to :action

end
