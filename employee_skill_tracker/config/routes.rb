Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#create'
      post '/register', to: 'users#create'
      delete '/logout', to: 'sessions#destroy'
      resources :metrics, only: [:index, :create] do
        collection do
          get :averages
        end
      end
    end
  end
end