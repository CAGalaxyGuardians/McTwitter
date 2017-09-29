# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
  * ruby 2.4.0

  * gem
    ```
    gem 'devise'
    gem 'bootstrap-sass', '~> 3.3.6'
    gem 'jquery-rails'
    gem 'acts_as_votable', '~> 0.10.0'
    gem "font-awesome-rails"
    ```

  * Database initialization
    - Nuggets => this is for the main feed
    - User:devise => this is User
    - acts_as_votable => votable(like,unlike)

  * [gem instraction acts_as_votable](https://github.com/ryanto/acts_as_votable)

1. gem install

2. generate migration file  => rails generate acts_as_votable:migration
3. migrate => rake db:migrate
4. models =>  add "acts_as_votable" and "belongs_to :user" to Nugets models and user model add "has_many: nuggets"
5. route => create routes
resources :nuggets do
  member do
    put "like", to: "nuggets#upvote"
    put "dislike", to: "nuggets#downvote"
  end
end
6. controller => create method
def upvote
  @nugget = Nugget.find(params[:id])
  @nugget.upvote_by current_user
  redirect_back fallback_location: root_path
end

def downvote
  @nugget = Nugget.find(params[:id])
  @nugget.downvote_by current_user
  redirect_back fallback_location: root_path
end

7.  view => create views (/nuggets/index.html.erb)
  <!-- using font-awesome & bootstrap -->
<td class="btn-group" data-toggle="buttons">
    <%= link_to like_nugget_path(nugget), method: :put, class: "btn btn-outline-primary btn-sm" do %>
      <!-- font-awesome thumbs-up icon -->
       <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
       nuggets
       <%= nugget.get_upvotes.size %>
     <% end %>
     <%= link_to dislike_nugget_path(nugget), method: :put, class: "btn btn-outline-primary btn-sm" do %>
      <!-- font-awesome thumbs-down icon -->
       <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
       unnugget
       <%= nugget.get_downvotes.size %>
    <% end %>
  </td>

# method should put inside of the iterator

URL
https://github.com/ryanto/acts_as_votable
http://www.mattmorgante.com/technology/votable
