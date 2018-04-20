class ArtsController < ApplicationController

   skip_before_action :verify_authenticity_token


  def index
    @category = Category.all.limit(100).order("id DESC")
    @slidder = Art.all.limit(10).order("id DESC")
    @color = Color.all
    @size = Size.all
    @frame = Frame.all
    @order_item = current_order.order_items.new
    @order_items = current_order.order_items
    @where_am_id = ""
    
    if params[:name].present?
      cat = Category.where(name: params[:name]).first
      id  = cat.id 
      # raise cat_name.inspect

       @arts = Art.where(id: id).limit(100).order("updated_at DESC") rescue "No art available"
    end

        if params[:name].present?
             @where_am_id = params[:name]
             # raise

          end
    # if 

    if params[:id].present?

        filter = params[:id].split("-")
          @where_am_id = filter[0]
          # raise @where_am_id.inspect
          @sub_cat = filter[2]

          if params[:name].present?
             @where_am_id = params[:name]
             # raise

          end


        case filter[0]

        when "Size"
            @arts = Art.where(size: filter[1].to_i ).limit(100).order("updated_at DESC") rescue "No art available"

        when "Category"
            @arts = Art.where(category_id: filter[1].to_i ).limit(100).order("updated_at DESC") rescue "No art available"
        when "Frame"
           @where_am_id = filter[0]
              @arts = Art.where(frame: filter[1].to_i ).limit(100).order("updated_at DESC") rescue "No art available"
        when "color"
              @arts = Art.where(color: filter[1].to_i ).limit(100).order("updated_at DESC") rescue "No art available"
        when "Latest"
          # more conditions here
              @arts = Art.all.limit(10).order("updated_at DESC") rescue "No art available"
        else

        end

      else

          @arts = Art.all.limit(100).order("updated_at DESC")
      end


  end


  def search
     @category = Category.all.limit(100).order("created_at DESC")

    if  params[:search_type] == "arts"

      @arts = Art.where(category_id: filter[1].to_i ).limit(100).order("updated_at DESC") rescue "No art available"



        query = Art.find_by_sql("select * from arts  where (name  like '%#{params[:search]}%' and description like '%#{params[:search]}%'") rescue nil



    else

    end
    
  end


  def new

    @arts = Art.new

    
    @category = Category.all.limit(100).order("created_at DESC")
    initial_params

  end


  def show
    
  end

  def show_art

    @category = Category.all.limit(100).order("created_at DESC")
    if params[:id]
      @art = Art.where(id: params[:id].to_i).first


      @arts = Art.where(category_id: @art.id).limit(100).order("updated_at DESC")

    else
      @arts = Art.all.limit(100).order("updated_at DESC")

      render "arts/index"
    end
   
    # raise params.inspect
  end


  def uploaded_file(file_field)
    # raise file_field.inspect
   name = base_part_of(file_field.original_filename)
   # data = file_field.read

    File.open(Rails.root.join('app/assets/images', 'gallary', file_field.original_filename), 'wb') do |f|
      f.write(file_field.read)
    end
   image_url =  "gallary/" + name
   return image_url

     # raise
 end


# accessing file name field
 def base_part_of(file_name)
    File.basename(file_name)
 end



  def create

    # raise params[:description].inspect
    image_url = uploaded_file(params[:art][:image])
    # params = params[:art]
    @arts = Art.new()
    current_user = 1
    @arts.artist_id = current_user
    @arts.name = params[:art][:name]
    @arts.color = params[:color]["title"]
    @arts.size = params[:size][:title]
    @arts.description = params[:art][:description]
    @arts.category_id = params[:category][:title]
    @arts.frame = params[:frame][:title]
    @arts.art_path = image_url
    @arts.price = params[:art][:price]
    # @arts.art_under = params[:art][:art_under][:title]
    @arts.stock_level = params[:art][:stock_level]



    if @arts.save
      redirect_to root_url, notice: 'New Art Pieces Entry Was Created'
    else
      render :new
    end



  end



  def initial_params
    @color = Color.all
    @size = Size.all
    @frame = Frame.all
  end



def show
  
end
end
