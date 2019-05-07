# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {email: "aerith@strifecloud.com", username: "aerith", password: "password"},
  {email: "sephiroth@strifecloud.com", username: "jenovafan", password: "password"},
  {email: "DistantWorlds@strifecloud.com", username: "Distant Worlds", password: "password"},
  {email: "mia@strifecloud.com", username: "Mia", password: "password"},
  {email: "joshua@strifecloud.com", username: "Joshua", password: "password"},
  {email: "arimakousei@strifecloud.com", username: "Arima Kousei", password: "password"},
  {email: "zohar002@strifecloud.com", username: "zohar002", password: "password"},
  {email: "springfield@springfield.com", username: "springfield", password: "springfield"},
  {email: "verve@springfield.com", username: "Verve", password: "springfield"},
  {email: "eventide@springfield.com", username: "Eventide", password: "springfield"},
  {email: "certifiedfella@springfield.com", username: "Fern", password: "springfield"}
])