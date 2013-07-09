require 'sinatra'

set :haml, :format => :html5

get '/' do
  'Hello world!'
end
