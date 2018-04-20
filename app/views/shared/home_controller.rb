class HomeController < ApplicationController

  def index
    @category = Category.all.limit(100).order("created_at DESC")
    @arts = Art.all.limit(100).order("created_at DESC")
    @slidder = Art.all.limit(10).order("updated_at DESC")
    @color = Color.all
    @size = Size.all
    @frame = Frame.all
    # render json: @arts
    # render json: @frame
    # render 'slidder'
  end
end
