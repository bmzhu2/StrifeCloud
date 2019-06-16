json.users do
  json.extract! @user, :id, :username, :email, :recently_played
end