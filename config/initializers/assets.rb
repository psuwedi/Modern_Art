# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
Rails.application.config.assets.precompile += %w( jquery.min.js )
Rails.application.config.assets.precompile += %w( bootstrap.min.js )
Rails.application.config.assets.precompile += %w( metisMenu.min.js )
Rails.application.config.assets.precompile += %w(javascripts/*)
Rails.application.config.assets.precompile += %w(stylesheets/*)
Rails.application.config.assets.precompile += %w( bootstrap.min.css )
Rails.application.config.assets.precompile += %w( metisMenu.min.css )
Rails.application.config.assets.precompile += %w( sb-admin-2.css )
Rails.application.config.assets.precompile += %w( morris.css )
Rails.application.config.assets.precompile += %w( font-awesome.min.css )

Rails.application.config.assets.precompile += %w( raphael.min.js )
Rails.application.config.assets.precompile += %w( morris.min.js )
Rails.application.config.assets.precompile += %w( morris-data.js )
Rails.application.config.assets.precompile += %w( sb-admin-2.js )
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
