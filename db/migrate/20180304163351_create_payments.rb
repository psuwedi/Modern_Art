class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.integer  :order_id
      t.decimal :amount, precision: 19, scale: 2, :default => 0.00
      t.string   :status
      t.timestamps
    end
  end
end
