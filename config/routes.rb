Rails.application.routes.draw do
  resources :compras
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "compras#index"
end
