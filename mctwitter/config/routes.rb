Rails.application.routes.draw do
  devise_for :users , controllers: { registrations: 'users/registrations' }

  get "nuggets/mynugget", to:"nuggets#mynugget"

  resources :nuggets do
    member do
      put "like", to: "nuggets#upvote"
      put "dislike", to: "nuggets#downvote"
    end
  end

  root   "nuggets#index"

  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
