class AuthsController < ApplicationController

  def new
  	@auth = Auth.new
  end

  def create
  	# raise "all".inspect
  		@auth = Auth.new(params[:username])
      # hashed_password = BCrypt::Password.create( params[:Password], cost: 10 )
  	if @auth.save
    	session[:username] = @auth.username
    	redirect_to root_url, notice: "Thank you for signing up!"
  	else
    	render "new"
  	end
   end
end

