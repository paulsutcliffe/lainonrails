Lainonrails::Application.routes.draw do
  
  scope '(:locale)', :locale => /#{I18n.available_locales.join("|")}/ do
  
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
    
    match '/computest' => "computests#index"

    resources :computests

    resources :informaciones

    resources :ads

    resources :banners

    resources :slides

    resources :metas
    
    devise_for :admins

    root :to => "home#index"
  end
  
  devise_for :usuarios, :path => "usuarios", :path_names => { :sign_in => 'ingresar', :sign_out => 'salir', :password => 'secreto', :confirmation => 'verificacion', :unlock => 'desbloquear', :registration => 'registro', :sign_up => 'inscribirse' }
  
  
  #match '*path', :to => redirect("/#{I18n.default_locale}/%{path}"), :constraints => lambda { |req| !req.path.starts_with? "/#{I18n.default_locale}/" }
  #match '', :to => redirect("/#{I18n.default_locale}")

end
