class CreateNuggets < ActiveRecord::Migration[5.1]
  def change
    create_table :nuggets do |t|
      t.string :message

      t.timestamps
    end
  end
end
