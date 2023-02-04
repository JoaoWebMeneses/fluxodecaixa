# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Compra.create(name: "freijaum gostasaum", data: "2023-02-04 09:13", price: 9.99)

#puts Compra.last
listadeCompras = [Faker::Food.fruits, Faker::Food.vegetables]


250.times do
    Compra.create(
        name: listadeCompras.sample,
        price: Faker::Number.decimal(l_digits: 2),
        data: Faker::Date.between(from: '2014-09-23', to: Time.now),
    )
end
Compra.all.each do |compra|
    puts "Compra: #{compra.name}"
    puts "Preço: #{compra.price}"
    puts "Data da compra: #{compra.data}"
end