# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


size = ["Small", "Medium", "Large","Huge", "unknown"]
color = ["white","black","red", "yellow", "brown", "grey"]
frame = ["Framed Limited Editions","Framed Mount","Framed Canvas","Framed Art Prints","unkown" ]
cat = ["animals","people","flies"]



Size.delete_all
Category.delete_all
Color.delete_all
Frame.delete_all

i = 1

size.each do |s|

  Size.create(id: i, size: s)
  i += 1
end

i = 1
cat.each do |c|
  Category.create(id: i, name: c,path: 'gallary/' + c + '.png')
  i += 1
end


i = 1
color.each do |c|
  Color.create(id: i, art_color: c)
  i += 1
end

i = 1
frame.each do |f|
  Frame.create(id: i, name: f)
  i += 1
end


Art.delete_all
Art.create! id: 1, title:"seed",name: "Banana", price: 0.49, active: true
Art.create! id: 2, title:"seed", name: "Apple", price: 0.29, active: true
Art.create! id: 3, title:"seed", name: "plants", price: 1.99, active: true

OrderStatus.delete_all
OrderStatus.create! id: 1, name: "In Progress"
OrderStatus.create! id: 2, name: "Placed"
OrderStatus.create! id: 3, name: "Shipped"
OrderStatus.create! id: 4, name: "Cancelled"



