require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'rake'
require 'yaml'

set :database, "sqlite3:///edumap.sqlite3"
set :haml, :format => :html5

get '/' do
  haml :index
end
