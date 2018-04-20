class CustomersController < ApplicationController

 # skip_before_action :verify_authenticity_token, :only =>
 #      [:current_customer, :create, :delete_me, :update_field,
 #      :recover_password, :my_profile]
  # before_action :authenticate_customer, :except => [:encypt_pass,:login,
  # :authenticate, :create, :recover_password]

  def new
      # raise params[:username].inspect
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


  def encypt_pass(pass)
     hashed_password = BCrypt::Password.create( pass, cost: 10 )
     return hashed_password
  end

  def save_auth_user(user, email,token)

     # raise user.inspect
    auth = Auth.new
    auth.email = email
    auth.username = user
    auth.password_digest = token
    auth.save 
  end

  def create
     
    available_customer = Customer.where(:username => params[:username]).first

    # available_artist = Artist.all.where(:username => params[:username], :email => params[:email])
    pass = encypt_pass(params[:password])
# raise available_customer.inspect
    if available_customer.blank?

          save_auth_user(params[:username], params[:email],pass)

          customer = Customer.new
          customer.username = params[:username]
          # customer.password = params[:password]
          customer.first_name = params[:f_name]
          customer.city= params[:city]
          customer.country = params[:country]
          customer.address = params[:address]
          customer.status = "false"
          customer.image = uploaded_file(params[:image])
          customer.description = params[:description]
          customer.phone = params[:phone]
          customer.auth_id = Auth.where(:email => params[:email] ).pluck(:id).first
          # customer.email = params[:email]

          customer.save

          # new artist
          # artist = Artist.new
          # artist.username = params[:username]
          # artist.password = params[:password]
          # artist.first_name = params[:f_name]
          # artist.city= params[:city]
          # artist.country = params[:country]
          # artist.address = params[:address]
          # artist.status = "false"
          # artist.image = uploaded_file(params[:image])
          # # customer.district = params[:district]
          # artist.phone = params[:phone]
          # artist.auth_token = generate_token
          # artist.email = params[:email]
          # if  params[:role] == "customer"

          #     customer.save
          # elsif params[:role] == "artist"
          #     artist.save
          # else
          #     artist.save
          #     customer.save
          # end


      if customer.save or artist.save
        session[:username] = params[:username]
        flash[:notice] = "Your customer account has been successfully created. Activation link has been sent to  #{params[:username]}."
        redirect_to('/') and return
      else
        flash[:error] = "There was an error creating your account"
        redirect_to('/') and return
      end

    else
      flash[:error] = "Unable to create your account. username or email already in use"
      redirect_to("/") and return
    end
  end

  # def generate_token
  #   SecureRandom.uuid.gsub(/\-/,'')
  # end
  def login
    #facility data for the popup sign up form
    # raise params.inspect
     @logged_customer = Customer.find_by_username(params[:username])
     # raise "am".inspect
    if @logged_customer
      # raise "am".inspect
      session[:username] = @logged_customer.username
      # return false if customer.password_hash.blank?
      # auth = Auth.find_by_username(params[:username])
      # if auth.password_digest ==  params[:password]
      # session[:username] = @logged_customer


      # raise session[:username] .inspect

        flash[:notice] = 'Welcome' + session[:username]
        # raise "am".inspect
        redirect_to customers_profile_path   :username => session[:username] and return
      # else

      # raise session[:username] .inspect
      #   # render :text => "wrong password", :status => :ok
      #   flash[:error] = "wrong password"
      #   redirect_to("/") and return
      # end


    else
      # raise "am".inspect
        # render :text => "wrong password/email", :status => :ok
        flash[:error] = "wrong password/email"
        redirect_to("/") and return

    end

  end

  #Validates customer password
  def valid_password(password,customer)
    return false if customer.password_hash.blank?
    if BCrypt::Password.new(customer.password_hash) == password
      true
    end
  end

  def logout
    session[:username] = nil
    customer.current_customer = nil
    flash[:notice] = 'You have been logged out.'
    redirect_to ('/') and return
  end

  def update_customer
      customer = Customer.find(params[:username])
     # normal customer can not set himself as admin

      customer.first_name = params[:first_name]
      customer.last_name = params[:last_name]
      customer.email = params[:email]
      # raise customer.save.inspect
      if customer.save
        flash[:notice] = "You have successfully updated customer account"
        redirect_to customers_account_path and return
      else
        flash[:error] = "Unable to update customer account."
        redirect_to customers_edit_customer_path, :username => params[:username] and return
      end

  end

  def profile
    
    @cutomer = Customer.where(:username => params[:username]).first rescue nil

    if @cutomer.blank?
      redirect_to ('/') and return
    end
    # raise  @cutomer.inspect
  end


  def edit_customer
    unless params[:customer_id].blank?
      @customer = Customer.find(params[:customer_id])
    end
    @active_customers = Customer.by_active.key(true)
  end

  def delete_customer
    @active_customers = Customer.by_active.key(true)
  end

  def delete_me
    customer = Customer.find(params[:username])
    customer.active = false
    customer.save
    render :text => true and return
  end

  def my_profile
    @customer = Customer.find(session[:current_customer_id])
  end

  def field_edit
    @customer = Customer.find(session[:current_customer_id])
  end


  def recover_password
    email = params[:email]
    customer = Customer.by_email.key(email).last
    first_name = Customer.first_name.capitalize rescue ''
    unless Customer.blank?
      o = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
      string = (0...5).map { o[rand(o.length)] }.join
      Customer.password_hash = string #new autogenerated password
      Customer.save
      RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
        "@api.mailgun.net/v3/samples.mailgun.org/messages",
        :from => "Disease Surveillance Dashboard <mangochiman@gmail.com>",
        :to => "#{email}",
        :subject => "PASSWORD RECOVERY",
        :html => "Dear <i>#{first_name},</i><br />Your password has been recovered. Your new password is now <b>#{string}</b><br />Disease Surveillance Team\
      <br /><br />*<span style='font-size:8pt; font-style:italic; font-weight:bold;'>Please do not respond to this auto-generated email</span>*"
    end
    render :text => 'true' and return
  end

end
