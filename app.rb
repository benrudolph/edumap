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
  # Terrible form to reparse operations... have to fix later
  {
    :operations => JSON.parse(Operation.public_models),
    :impact_indicators => ImpactIndicator.uniq.pluck(:indicator),
    :perf_indicators => PerfIndicator.uniq.pluck(:indicator)
  }.to_json
end
