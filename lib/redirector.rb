require 'sinatra'

get '/nosotros.php' do
  redirect '/nosotros'
end

get '/testimonios.php' do
  redirect '/testimonios'
end

get '/paises.php' do
  redirect '/paises'
end

get '/metodo.php' do
  redirect '/metodo'
end

get '/blog.php' do
  redirect '/blog'
end

get '/inicio.php' do
  redirect '/pe/home'
end

get '/sacian.php' do
  redirect '/productos/sacian'
end

get '/trabaja-en-lain.php' do
  redirect '/pe/contactos/new'
end

get '/contacto-peru.php' do
  redirect '/pe/contactos/new'
end

get '/contacto-uruguay.php' do
  redirect '/uy/contactos/new'
end

get '/contacto-bolivia.php' do
  redirect '/bo/contactos/new'
end

get '/contacto-costarica.php' do
  redirect '/cr/contactos/new'
end

get '/contacto-elsalvador.php' do
  redirect '/sv/contactos/new'
end

get '/contacto-guatemala.php' do
  redirect '/gt/contactos/new'
end

get %r{[\/][a-z0-9.-]*.php$} do
  redirect '/'
end