Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      resources :metrics, only: [:index, :create] do
        collection do
          get :averages
        end
      end
      resources :employees, only: [:index, :show, :create, :update, :destroy]
    end
  end

  # Add Devise routes for authentication
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
