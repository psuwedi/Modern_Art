class CreateAuths < ActiveRecord::Migration
  def change
    create_table :auths do |t|
      t.string :email
      # t.string :role
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
