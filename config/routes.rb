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

    resources :computests

    resources :informaciones

    resources :ads

    resources :banners

    resources :slides

    devise_for :admins

    devise_for :usuarios

    resources :metas
  
    root :to => "home#index"
  end
  
  #match '*path', :to => redirect("/#{I18n.default_locale}/%{path}"), :constraints => lambda { |req| !req.path.starts_with? "/#{I18n.default_locale}/" }
  #match '', :to => redirect("/#{I18n.default_locale}")

end
