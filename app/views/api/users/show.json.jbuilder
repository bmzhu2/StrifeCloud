json.extract! @user, :id, :username

if @user.profile_picture.attached?
  json.profilePictureURL url_for(@user.profile_picture)
else
  json.profilePictureURL ""
end