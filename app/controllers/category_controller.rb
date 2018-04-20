class CategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token


 def index
   @category = Category.all.limit(100).order("created_at DESC")
   @arts = Art.all.limit(100).order("created_at DESC")
   @color = Color.all
   @size = Size.all
   @frame = Frame.all

 end

 def new
   # raise @arts.inspect
   @category = Category.new

 end

 def show

 end


 def uploaded_file(file_field)

  name = base_part_of(file_field.original_filename)
  File.open(Rails.root.join('app/assets/images', 'gallary', file_field.original_filename), 'wb') do |f|
     f.write(file_field.read)
   end
  image_url =  "gallary/" + name
  return image_url
end

# accessing file name field
def base_part_of(file_name)
   File.basename(file_name)
end



 def create
   image_url = uploaded_file(params[:category][:image])
   # params = params[:category]

   @category = Category.new()
   @category[:subject] = params[:category][:subject]
   @category[:path] = image_url
   @category[:name] = params[:category][:name]
   if @category.save
     redirect_to root_url, notice: 'New Art Pieces Entry Was Created'
   else
     render :new
   end



 end

 # private
 #
 # def art_params
 #   # params.require(:rt).permit
 #
 #   params.require(:art).permit(:email, :price, :art_path, :stock_level, :description, :category, :frame,:color )
 #
 #
 # end


end
