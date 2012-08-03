# This file is used by Rack-based servers to start the application.

require 'sinatra/base'
require './lib/redirector'
require ::File.expand_path('../config/environment',  __FILE__)

use Sinatra::Application
run Lainonrails::Application
