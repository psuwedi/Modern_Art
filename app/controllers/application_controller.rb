class ApplicationController < ActionController::Base
   protect_from_forgery with: :exception
    # protect_from_forgery with: :null_session

    #protect_from_forgery with: :null_session



    # helper_method :current_order

    # def current_order
    #   if !session[:order_id].nil?
    #     Order.find(session[:order_id])
    #   else
    #     Order.new
    #   end
    # end

    protect_from_forgery with: :exception
   helper_method :current_order

   def current_order
    if session[:order_id]
      Order.find(session[:order_id])
    else
      Order.new
    end



  end

    
    def not_found


      # handle invalid url
      render :file => "#{Rails.root}/public/404.html", :status => 404, :layout => false
    end


  def after_sign_in_path_for(resource)    
     # if resource.role == "customer" or resource.role == "artist" or resource.role == "both"   
     #   stored_location_for(resource) || dashboard_path     
     if  resource.role == "employee" 
       stored_location_for(resource) || cms_path(current_user.id)
     else
        stored_location_for(resource) || dashboard_path(current_user.id)
     end       
  end       




    protected 
    def authenticate_user


      if session[:user_id]
         # set current user object to @current_user object variable
        @current_user = User.find session[:user_id] 
        raise @current_user.inspect

        return true 
      else
        redirect_to(:controller => 'sessions', :action => 'login')
        return false
      end
    end
    def save_login_state
      if session[:user_id]

        @current_user = session[:user_id]
        
        # redirect_to ''

        # raise @current_user.inspect
        return false
      else
        return true
      end
    end

end



# 