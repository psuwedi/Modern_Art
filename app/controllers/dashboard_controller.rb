class DashboardController < ApplicationController

  def index
  
  end

  def show

    check_valid_user

    id = params[:id].to_i
    user = User.where(:id => id).first
    email = user.email

    customer = Customer.where(:email => email).first
     # raise @customer.inspect
    artist =  Artist.where(:email => email).first
    role  = user.role

    if role == "customer"
      @image = customer.image
      @data = customer

    elsif role == "artist"
      @image = artist.image
      @data = artist

    elsif role == "both"
      @image = customer.image
      @data = customer
    else
      @image = customer.image
       @data = customer
      # @data = Employee.where(:email => email).fisrt
    end

    if @image.blank?
      @image = "gallary/default.png"
    end 

    # redirect_to '/' id: => 1
        
    
  end


  def check_valid_user
    if user_signed_in?
      if current_user.role == "admin" or current_user.role == "employee"
        redirect_to  "/cms/index"
      else
            flash[:error] =  'Please login first'
        render  "/cms/login"
      end
        else
          flash[:error] =  'Please login first'
          render  "/cms/login"
      end
  end
      


  def show_cart

  end
  
end

