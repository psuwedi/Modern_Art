class RegistrationsController < Devise::RegistrationsController

	private

	def sign_up_params
		   raise params.inspect
		   
  	if params[:user][:password_confirmation].mb_chars.length >= 0
  		@lastname = params[:lastname]
  		@firstname = params[:firstname]
  		@telephone = params[:phone]
  		@email = params[:user][:email]
  		@country = params[:country]
  		@city = params[:city]
  		@address = params[:address]
  		@description = params[:description]
  		@role = params[:role]
  		@newsletter = params[:newsletter].to_i
  		if  @newsletter == 1
  			newsletter
  		end

  		if params[:src] == "public"
  			if params[:role] == "customer"
	    		# create customer
	    		save_customer
	    	elsif params[:src] == "artist"
	    		# create artist
	    		save_artist
	    	else
	    		# create both
	    		save_artist
	    		save_customer
	    	end
	    end

	 

	   if params[:src] == "cms"

	    	save_employee

	    end
	    if params[:src] == "mis"
	    	save_employee

	    end
	end

	params.require(:user).permit(:email, :password, :password_confirmation,:role)
end

def account_update_params
    # params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password

    params.require(:user).permit(:email, :password, :password_confirmation,:role)
end



def save_artist

	if Artist.where(:email => @email).count == 0
		at = Artist.new
		at.email = @email
		at.name = @firstname 
		# at.surname =  @lastname
		at.phone = @telephone
		at.country = @country 
		at.city = @city
		at.address = @address
		at.description = @description
		at.save 
	end 
	
end


def save_customer
	if Customer.where(:email => @email).count == 0
		cus = Customer.new
		cus.email = @email
		cus.firstname = @firstname 
		cus.surname =  @lastname
		cus.phone = @telephone
		cus.country = @country 
		cus.city = @city
		cus.address = @address
		cus.description = @description
		cus.save  
	end
end

def newsletter
	if Newsletter.where(:email => @email).count == 0
		news = Newsletter.new
		news.email = @email
		news.status = 1
		news.save
	end
	
end


def save_employee



	if Employee.where(:email => @email).count == 0
	  e = Employee.new
	  e.added_by = current_user.email
	  e.email = @email
	  e.firstname = @firstname 
      e.surname =  @lastname
	  e.phone = @telephone
	  e.save
	end
	
end


end

