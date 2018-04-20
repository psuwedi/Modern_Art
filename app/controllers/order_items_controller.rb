class OrderItemsController < ApplicationController
skip_before_action :verify_authenticity_token
  def create
    @order = current_order
    # raise @order.inspect

    @order_item = @order.order_items.new(order_item_params)
    @order.save

    session[:order_id] = @order.id

  end

  def update
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.update_attributes(order_item_params)
    @order_items = @order.order_items

  end

  def destroy
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.destroy
    @order_items = @order.order_items
  end

  def destroy_all
 
    @order = current_order
    # @order_statuses = OrderStatus.where
    
    @order_item = @order.order_items.where(:order_id => current_order.id)
    @order_item.destroy_all
    @order_items = @order.order_items
  end

  def check_out
    @order = current_order
  end


private
  def order_item_params
    params.require(:order_item).permit(:quantity, :art_id)
  end
end
