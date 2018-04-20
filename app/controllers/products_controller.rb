class ProductsController < ApplicationController
  def index
    @products = Product.all
   


    @category = Category.all.limit(100).order("id DESC")
    
    @slidder = Art.all.limit(10).order("id DESC")
    # if not slidder.present?
    #   slidder = Category.all.limit(10).order("updated_at DESC")
    # end
    # @slidder = slidder
    @color = Color.all
    @size = Size.all
    @frame = Frame.all




    # @products = Product.all
    @order_item = current_order.order_items.new

     @order_items = current_order.order_items


  end
end
