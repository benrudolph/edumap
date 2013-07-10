require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'rake'
require 'yaml'
require 'protected_attributes'
require 'json'

# Models
Dir["./models/*.rb"].each {|file| require file }

set :database, "sqlite3:///edumap.sqlite3"
set :haml, :format => :html5

get '/' do
  haml :index
end

get '/bootstrap' do
  content_type :json
  # Terrible form to reparse data... have to fix later
  {
    :operations => JSON.parse(Operation.all.to_json(:include => { :data => { :include => [:indicator, :ppg]}})),
    :impact_indicators => ImpactIndicator.all,
    :perf_indicators => PerfIndicator.all
  }.to_json
end
