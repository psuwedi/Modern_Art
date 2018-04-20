class CmsController < ApplicationController
 skip_before_action :verify_authenticity_token
    before_action :check_valid_user, except: [:login]

    # check if user is logged in before any action
    def check_valid_user
        if user_signed_in?
            if current_user.role == "admin" or current_user.role == "employee"
                   true
            else
                   flash[:error] =  'Please login first'
                render  "/cms/login"
            end
           else
               flash[:error] =  'Please login first'
               render  "/cms/login"
        end
      end
      # homepage for CMS module           
    def index
          
    end


    # show all arts
    def all_arts
          @arts = Art.all.where(:stock_level => 1)
    end

         # end of arts
     def show_art
         id = params[:id].to_i
         @art = Art.where(id: id).first

     end

     def update_art
         art = Art.where(id: params[:id]).first
         art.name = params[:name]
         art.title = params[:title]
         art.price = params[:price]
         art.stock_level = params[:qty]
         art.save
         flash[:notice] =  'Details were updated!'
         @arts = Art.all
         render '/cms/all_arts'
     end


    def new_arts
        @category = Category.all
        @size = Size.all
        @frame = Frame.all
        @color = Color.all
        @artist = Artist.all
      
        if params[:name].present?
            @arts = Art.new()
            current_user = 1
            @arts.artist_id = 1
            @arts.title = params[:title]
            @arts.name = params[:name]
            @arts.color = params[:color]
            @arts.size = params[:size]
            @arts.description = params[:description]
            @arts.category_id = params[:category]
            @arts.frame = params[:frame]
            @arts.art_path = uploaded_file(params[:image])
            @arts.price = params[:price]
            # @arts.art_under = params[:art_under]
            @arts.stock_level = params[:qty]
            if @arts.save
              flash[:notice] =  'New Art Piece Entry Was Created'
              render :new_arts
            end
     
         end
    end

    # adding image of the art piece into a gallary

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


end
