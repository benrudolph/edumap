class ImpactIndicator < ActiveRecord::Base
  attr_accessible :objective, :olbudget, :aolbudget, :indicator, :baseline, :standard, :oltarget, :optarget, :myr, :yer

  belong_to :action

end
