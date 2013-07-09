require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'rake'
require 'yaml'
require 'protected_attributes'

# Models
Dir["./models/*.rb"].each {|file| require file }

set :database, "sqlite3:///edumap.sqlite3"
set :haml, :format => :html5

get '/' do
  haml :index
end
