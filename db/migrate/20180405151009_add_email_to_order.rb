class AddEmailToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :email, :string, :default => "new_customer"
   
  end
end
