Rails.application.routes.draw do
  devise_for :users , controllers: { registrations: 'users/registrations' }
  resources :nuggets do
    member do
      put "like", to: "nuggets#upvote"
      put "dislike", to: "nuggets#downvote"
    end
  end

  root   "nuggets#index"

  get "nuggets/new", to: "nuggets#new"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
