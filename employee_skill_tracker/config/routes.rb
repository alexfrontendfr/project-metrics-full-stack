Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#create'
      post '/register', to: 'users#create'
      delete '/logout', to: 'sessions#destroy'
      get 'current_user', to: 'users#current'
      
      resources :metrics, only: [:index, :create]
      
      resources :employees, only: [:index, :show] do
        collection do
          get :top_performers
        end
        member do
          get :skills
        end
      end
    end
  end
end