class ArtController < ApplicationController

	def list
		@arts = Art.all
	end

	def show
		@art = Art.find(params[:id])
	end

	def new
		@arts = Art.new
		@artists = Artist.all

	end

	def create


		@art = Art.new(art_params)

		if @art.save
			redirect_to :action => 'list'
		else
			@arts = Art.all
			render :action => 'new'
		end

	end


	def show_art
		@artist = Artist.find(params[:id])
	end


	def edit
		@art = Art.find(params[:id])
		@artist = Artist.all
		# end
	end

	def update


		@art = Art.find(params[:id])
		if @art.update_attributes(art_param)
			redirect_to :action => 'show', :id => @art
		else
			@artists = Artist.all
			render :action => 'edit'
		end

	end

	def delete

		Art.find(params[:id]).destroy
		redirect_to :action => 'list'

	end



	def art_params
		params.require(:arts).permit(:title, :price, :artist_id, :description,:stock)
	end

	def art_param
		params.require(:art).permit(:title, :price, :artist_id, :description, :stock)
	end





end
