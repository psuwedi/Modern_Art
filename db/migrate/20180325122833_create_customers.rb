class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string  :approved_by, :default => "via email"
      t.string  :email
      t.string   :surname
      t.string   :firstname
      t.text     :description
      # t.integer  :auth_id, null: false
      t.string   :city
      t.string   :phone
      t.string   :image
      t.string   :address
      t.integer   :status, :default => 1
      t.string   :country
      t.timestamps
    end
  end
end


