class HomeController < ApplicationController

  def index
    @arts = Art.all
    @category = Category.all.limit(100).order("id DESC")
    @slidder = Art.all.limit(10).order("id DESC")
    @color = Color.all
    @size = Size.all
    @frame = Frame.all
    @order_item = current_order.order_items.new
    @order_items = current_order.order_items

  end

end

