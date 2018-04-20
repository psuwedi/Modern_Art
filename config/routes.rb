Rails.application.routes.draw do
  get 'promotion/promotion'

  get 'search/search'

  get 'order_items/create'

  get 'order_items/update'

  get 'order_items/destroy'
  get 'carts/show'
  get 'promotion/promotion'
  post 'promotion/promotion'
  get 'search/search'
  post 'search/search'
  devise_for :users, :controllers => { registrations: 'registrations' }
  devise_scope :user do
    get '/signout', to: 'devise/sessions#destroy', as: :signout
  end
  get '/cms/show_art'
  post '/cms/show_art'
  get '/cms/update_art'
  post '/cms/update_art'
  get 'cms/add_staff'
  post 'cms/add_staff'
  post "/home/login"
  get '/home/login'
  get 'ims/index'
  get 'ims/summary'
  post 'ims/summary'
  get 'password_resets/new'
  get 'password_resets/edit'
  post 'cms/show_customers'
  get 'cms/show_customers'
  post 'cms/delete_customer'
  get 'cms/delete_customer'
  post 'cms/view_artists'
  get 'cms/view_artists'
  post 'cms/delete_artist'
  get 'cms/delete_artist'

  resources :customers, only: [:index, :create,:new, :destroy, :update]
  resource :cart, only: [:show]
  resources :order_items, only: [:create, :update, :destroy]
  root to: "home#index"
  resources :dashboard
  get "/index/:id" => "arts#index"
  get "order_items/destroy_all"
  post "order_items/destroy_all"
  get "order_items/checkout"
  get "members/new"
  post "members/new"
  get "members/create"
  post "members/create"
  get "customers/create"
  post "customers/create"
  post "/customers/login"
  get "/customers/login"
  get "/customers/profile"
  get "/cms/index"
  get "/cms/new_category"
  post "/cms/new_category"
  post "/cms/login"
  get  "/cms/login"
  post "arts/show_art"
  get "arts/show_art" 
  post "arts/index"
  get "arts/index"
  get "/cms/new_arts"
  post "/cms/new_arts"
  get "/cms/all_arts"
  post "/cms/all_arts"
  post "arts/show"
  get "arts/show"
  get "/cms/delete_category"
  post "/cms/delete_category"
  get "/cms/all_categories"
  post "/cms/all_categories"
  post "/cms/show_category"
  get "/cms/show_category"
  post "/cms/update_category"
  get "/cms/update_category"
  post "/customers/profile"
 get "users/sign_out"
  get "*unmatched_route", to: "application#not_found"

end



