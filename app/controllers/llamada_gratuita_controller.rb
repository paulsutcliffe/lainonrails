class LlamadaGratuitaController < ApplicationController
  require "uri"
  require 'net/http'

  def index
  end

  def llamar
    url = URI.parse('https://sv1.soamisa.com:8901/cgi/web/receive.pl')
    req = Net::HTTP::Post.new(url.path)
    req.form_data = params
    req.basic_auth url.user, url.password if url.user
    con = Net::HTTP.new(url.host, url.port)
    con.use_ssl = true
    con.start {|http| http.request(req)}
  end

end
