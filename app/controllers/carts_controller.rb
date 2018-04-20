class CartsController < ApplicationController
  def show
    @order_items = current_order.order_items
    @total = 0
    # @sub_total = 0
    @sub_total = @order_items.count
    @order_items.each do |t|
    	@total = @total + bd_to_double(t.total_price)
    	
    end



  end

  def bd_to_double(t)
  	return t.to_s.to_f
  end
end
