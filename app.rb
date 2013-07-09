require 'rubygems'
require 'sinatra'
require 'mongo'
require 'bson_ext'

set :haml, :format => :html5

get '/' do
  haml :index
end
