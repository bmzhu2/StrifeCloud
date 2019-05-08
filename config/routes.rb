Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, default: {format: :json} do 
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:create, :update, :show, :destroy] do 
      resources :comments, only: [:create, :destroy]
    end
  end

  root to: 'static_pages#root'
end
