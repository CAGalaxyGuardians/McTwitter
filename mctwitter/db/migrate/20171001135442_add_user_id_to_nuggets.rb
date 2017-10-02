class AddUserIdToNuggets < ActiveRecord::Migration[5.1]
  def change
    add_column :nuggets, :user_id, :string
    add_index :nuggets, :user_id
  end
end
