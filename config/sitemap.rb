# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://www.lainadelgaza.net"
SitemapGenerator::Sitemap.ping_search_engines

SitemapGenerator.verbose = false

SitemapGenerator::Sitemap.create do
  
  add '/blog', :changefreq => 'daily'
  
  Entrada.find_each do |entrada|
    add '/entradas/' + entrada.slug, :lastmod => entrada.updated_at
  end
  
  add '/metodo'
  
  add '/nosotros'
  
  add '/politicas'
  
  Producto.find_each do |producto|
    add '/productos/' + producto.slug, :lastmod => producto.updated_at
  end
  
  add '/productos', :changefreq => 'monthly'
  
  I18n.available_locales.each do |localer|

    group(:filename => localer) do
      add '/' + localer.to_s + '/home'
      add '/' + localer.to_s + '/contactos/new'
      add '/' + localer.to_s + '/sucursales', :changefreq => 'monthly'
      add '/' + localer.to_s + '/testimonios', :changefreq => 'daily'
      add '/' + localer.to_s + '/computests/new'
    end
  
  end

end
