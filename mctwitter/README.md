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
    gem 'rails_emoji_picker'
    ```


* Database initialization
    - Nuggets => this is for the main feed
    - User:devise => this is User
    - acts_as_votable => votable(like,unlike)



* gem instruction
> acts_as_votable (https://github.com/ryanto/acts_as_votable)


1. gem install

2. generate migration file  => ```rails generate acts_as_votable:migration ```

3. migrate => ```rake db:migrate```

4. models =>  
add   ```acts_as_votable  ``` to Nuggets models

5. route => create routes
  ```
  resources :nuggets do
    member do
      put "like", to: "nuggets#upvote"
      put "dislike", to: "nuggets#downvote"
    end
  end
  ```

6. controller => create method
  ```
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
  ```

7.  view => create views (/nuggets/index.html.erb)

  ```
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

    # method(this table) should put inside of the iterator
  ```

URL:
http://www.mattmorgante.com/technology/votable

* Emoji gem instruction
  1. gem install -- using rails g rails_emoji_picker:install
  2. add //= require rails_emoji_picker to application.js
  3. add '@import rails_emoji_picker' to application.scss

  URL:
  https://github.com/ID25/rails_emoji_picker

*  Create Mypage

 >create database association

  1. create user_id to nugget
  ```  
  rails g migration add_user_id_to_nugget user_id:string:index
   ```

  2. model change
  ```  
  Nugget model => belongs_to :user
  User model => has_many :nugget
  ```  

  3. controller
  ```  
  def new
   @nugget = current_user_nugget_built
  end
  ```  
    - This method would automatically fill in the user_id


> modify user page

  4. install the devise registration controller
  ```  
  rails generate devise:controllers [scope]
  ```  

  5. fix route
  ```  
  devise_for :users, controllers: { sessions: 'users/sessions' }
  ```  

  6. create function (controller)

  #app/controllers/users/registrations_controller.rb  
    ```  
     def edit
        @nugget = current_user.posts
     end
       ```  

  #app/views/devise/registrations/edit.html.erb
    ```  
  <% if @nugget.present? %>
     <% @nugget.each do |nugget| %>
        <%= nugget.message %>
     <% end %>
  <% end %>
    ```  
