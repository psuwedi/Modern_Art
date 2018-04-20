class UsersController < ApplicationController
  
  skip_before_action :verify_authenticity_token
    # before_action :authenticate_user!
    before_action :check_valid_user, except: [:login]
    # ims and cms user management
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










  def show
    @user = User.find(params[:id])
  end

  def new


    # raise params.inspect

    @user = User.new
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

 # raise User.where(:username => params[:username]).count.inspect
    if User.where(:username => params[:username]).count <= 0

   user_params = {"name"=>params[:name],
     "username"=>params[:username],
     "dob"=>params[:date],
     "sex"=>params[:sex],
     "role"=>params[:role],
     "password"=>params[:password],
     "email" => params[:email],
     # "password_confirmation"=>params[:password_confirmation],
     "active" => 1
     # "image"=> uploaded_file(params[:image])
    }






   @user = User.new(user_params)



   # raise user_params.inspect
    if @user.save
      if params[:form] == "portal"
        redirect_to  '/'
      else
         # flash[:sucess] = "You signed up successfully"
         flash[:notice] = "New account has been created!"
         render 'new' 
      
      end
    end

    else

         flash[:error] = "The account already  exists!"
         render 'new' 

    end
   

  end

   def edit
    @user = User.find(params[:id])
   end

   def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      #handle a successful update
      flash[:success] = "profile updated"
      redirect_to @user
    else 
      render 'edit'
    end
   end

   def sign_out

    redirect_to signout_path and return
   end

   


  #Before filters

  #confirms a logged-in user.
    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Plese log in."
        redirect_to login_url
      end
    end




  # def authenticate
  #   @user = User.find(params[:username])
  #   unless @user.blank?
  #     if @user.password == params[:password]
  #       flash[:notice] = "Welcome #{params[:username]}"
  #       session[:current_user_id] = @user.id
  #       User.current_user = @user
  #       redirect_to ('/') and return
  #     else
  #       flash[:error] = 'Wrong username/password combination'
  #       redirect_to (users_login_path) and return
  #     end
  #   else
  #     flash[:error] = 'Wrong username/password combination'
  #     redirect_to (users_login_path) and return
  #   end
  # end



  #confirms the correct user.
  def correct_user
   
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
      
    end
  

end