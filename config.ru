if ENV['RAILS_ENV'] == 'production'
    ENV['HOME'] = '/home/dreamhostusername'
    ENV['GEM_HOME'] = '/home/dreamhostusername/.gems'
    ENV['GEM_PATH'] = '/home/dreamhostusername/.gems'
  end
  # This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)
run Lainonrails::Application
