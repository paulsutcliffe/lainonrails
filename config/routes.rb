Lainonrails::Application.routes.draw do
  
  scope '(:locale)', :locale => /#{I18n.available_locales.join("|")}/ do
  
    resources :ofertas

    resources :recetas

    resources :productos

    resources :cabecera_banners

    match '/politicas' => "politicas#index"
    
    match '/contacto' => "contactos#new"

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
    
    devise_for :usuarios, :path => "usuarios", :path_names => { :sign_in => 'ingresar', :sign_out => 'salir', :password => 'secreto', :confirmation => 'verificacion', :unlock => 'desbloquear', :registration => 'registro', :sign_up => 'inscribirse' }
    
    devise_for :admins, :path => "admins", :path_names => { :sign_in => 'ingresar', :sign_out => 'salir', :password => 'secreto', :confirmation => 'verificacion', :unlock => 'desbloquear', :registration => 'registro', :sign_up => 'inscribirse' }

    root :to => "home#index"
  end
  
  
  
  #match '*path', :to => redirect("/#{I18n.default_locale}/%{path}"), :constraints => lambda { |req| !req.path.starts_with? "/#{I18n.default_locale}/" }
  #match '', :to => redirect("/#{I18n.default_locale}")

end
