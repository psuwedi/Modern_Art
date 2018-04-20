rails g model Product name 'price:decimal{12,3}' active:boolean
rails g model OrderStatus name:string
rails g model Order 'subtotal:decimal{12,3}' 'tax:decimal{12,3}' 'shipping:decimal{12,3}' 'total:decimal{12,3}' order_status:references
rails g model OrderItem product:references order:references 'unit_price:decimal{12,3}' quantity:integer 'total_price:decimal{12,3}'
rake db:migrate




class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer   :customer_id
      t.text    :description
      t.decimal :price, precision: 10, scale: 2,  :default => 0.00
      t.integer :stock_level, :default => 0
      t.integer :status, :default => 0
      t.text    :comment
      t.timestamps
    end
  end
end



class CreateOrderProducts < ActiveRecord::Migration
  def change
    create_table :order_products do |t|
      t.integer  :product_code
      t.integer  :order_id
      t.integer  :qty
      t.decimal :price, precision: 19, scale: 2 , :default => 0.00
      t.timestamps
    end
  end
end



