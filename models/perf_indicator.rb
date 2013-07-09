class PeftIndicator < ActiveRecord::Base
  attr_accessible :output, :olbudget, :aolbudget, :indicator, :oltarget, :optarget, :myr, :yer

  belongs_to :action
end
