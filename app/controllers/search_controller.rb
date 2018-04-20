class SearchController < ApplicationController
	skip_before_action :verify_authenticity_token
	
  def search
    strng = params[:key_word]
    artists = params[:artists]
    filter = params[:filter]
    search_array = [strng, artists,filter]
  	if params[:src].to_i == 1
  		 @arts = Art.find_by_sql("select * from arts left join artists on arts.artist_id = arts.id WHERE (arts.name like '%#{strng}%' 
        OR arts.frame like '%#{strng}%' OR arts.title like '%#{strng}%' OR artists.name like '%#{strng}%' OR artists.category like '%#{strng}%') ") rescue nil    
  	else
      if filter.present?
        if filter.to_i == 2
          # raise "ddd".inspect
          @arts = Art.find_by_sql("select * from arts left join artists on arts.artist_id = arts.id WHERE (arts.name like '%#{strng}%' 
          OR arts.frame like '%#{strng}%' OR arts.title like '%#{strng}%' OR artists.name like '%#{strng}%' OR artists.category like '%#{strng}%'
          AND arts.promotion = 'no' ) ") rescue nil
        elsif filter.to_i == 1
          @arts = Art.find_by_sql("select * from arts left join artists on arts.artist_id = arts.id WHERE (arts.name like '%#{strng}%' 
          OR arts.frame like '%#{strng}%' OR arts.title like '%#{strng}%' OR artists.name like '%#{strng}%' OR artists.category like '%#{strng}%') ") rescue nil
        else
          @arts = Art.find_by_sql("select * from arts left join artists on arts.artist_id = arts.id WHERE (arts.name like '%#{strng}%' 
          OR arts.frame like '%#{strng}%' OR arts.title like '%#{strng}%' OR artists.name like '%#{strng}%' OR artists.category like '%#{strng}%') ORDER BY arts.update_at DESC limit 100") rescue nil    
        end
      else
         @arts = Art.find_by_sql("select * from arts left join artists on arts.artist_id = arts.id WHERE (arts.name like '%#{strng}%' 
        OR arts.frame like '%#{strng}%' OR arts.title like '%#{strng}%' OR artists.name like '%#{strng}%' OR artists.category like '%#{strng}%') ORDER BY arts.update_at DESC limit 100") rescue nil    
        
      end
    end
  end
end
