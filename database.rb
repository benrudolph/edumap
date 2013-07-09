#env = 'development'
#
#DB_CONFIG = YAML::load(File.open('config/database.yml')[env])
#
#set :database, "mysql://#{DB_CONFIG['username']}:#{DB_CONFIG['password']}@#{DB_CONFIG['host']}:#{DB_CONFIG['port']}/#{DB_CONFIG['database']}"
#
#
##ActiveRecord::Base.establish_connection(
##  adapter: 'mysql2',
##  host: settings.db_host,
##  database: settings.db_name,
##  username: settings.db_username,
##  password: settings.db_password)
#
## At this point, you can access the ActiveRecord::Base class using the
## "database" object:
#puts "the foos table doesn't exist" if !database.table_exists?('foos')
