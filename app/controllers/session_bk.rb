require 'bcrypt'
class SessionsController < ApplicationController
	 # include SessionsHelper
  
    def new


  end
 
  def create

     # raise params.inspect

    if params[:username].present? && params[:password].present?

         user = User.authenticate(params[:username],params[:password])

    end

    if user

      # raise "mmmmmmmmmmmmmm".inspect
      session[:user_id] = user.id


      if not user.role == "admin"
        # redirect_to root_url, notice: 'New Art Pieces Entry Was Created'


        render '/'
      else

        flash[:notice] =  'New Art Piece Entry Was Created'
        # render :new_arts

        render '/cms/index'
      end


      

    else    
      render 'new'
    end

    
  end

  def destroy   
    session[:user_id] = nil   
    redirect_to root_url, notice: 'Logged out!'   
  end



  
end



