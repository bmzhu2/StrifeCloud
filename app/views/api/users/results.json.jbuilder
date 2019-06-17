@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :recently_played

    json.numSongs user.songs.count

    if user.profile_picture.attached?
      json.profilePictureUrl url_for(user.profile_picture)
    else
      json.profilePictureUrl ""
    end
  end
end
