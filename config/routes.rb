Lainonrails::Application.routes.draw do

  match '/paises' => "paises#index"

  scope '(:locale)', :locale => /#{I18n.available_locales.join("|")}/ do

    match '/home' => "home#index"

    match '/llamada-gratuita' => "llamada_gratuita#index", :via => :get, :as => :llamadas

    match '/llamada-gratuita' => "llamada_gratuita#llamar", :via => :post, :as => :hacer_llamada

    resources :promociones

    resources :ofertas

    resources :recetas

    resources :productos

    resources :cabecera_banners

    match '/politicas' => "politicas#index"

    resources :contactos

    match '/blog' => "entradas#index"

    resources :entradas

    resources :sucursales

    match '/metodo' => "metodo#index"

    resources :testimonios

    match '/nosotros' => "nosostros#index"

    resources :computests

    resources :informaciones

    resources :ads

    resources :banners

    resources :slides

    resources :metas

    devise_for :usuarios, :path => "usuarios", :path_names => { :sign_in => 'ingresar', :sign_out => 'salir', :password => 'secreto', :confirmation => 'verificacion', :unlock => 'desbloquear', :registration => 'registro', :sign_up => 'inscribirse' }

    devise_for :admins, :controllers => { :registrations => "admins/registrations" }, :path => "admins", :path_names => { :sign_in => 'ingresar', :sign_out => 'salir', :password => 'secreto', :confirmation => 'verificacion', :unlock => 'desbloquear', :registration => 'registro', :sign_up => 'inscribirse' }

    resources :admins
    get '/usuarios/lista' => "usuarios#lista"

    match '/usuarios/:id' => "usuarios#ver", :via => :get

    authenticated :usuario do
      root :to => 'home#index'
    end

    authenticated :admin do
      root :to => 'home#index'
    end

    root :to => "paises#index"
  end

  redirect("/#{I18n.default_locale}")

end
