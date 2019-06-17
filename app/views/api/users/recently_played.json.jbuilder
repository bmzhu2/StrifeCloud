json.currentUser do 
  json.extract! @user, :id, :username, :recently_played

  if @user.profile_picture.attached?
    json.profilePictureUrl url_for(@user.profile_picture)
  else
    json.profilePictureUrl ""
  end
end

json.users do
  @songs.each do |song|
    json.set! song.uploader.id do 
      json.extract! song.uploader, :id, :username

      json.numSongs song.uploader.songs.count

      if song.uploader.profile_picture.attached?
        json.profilePictureUrl url_for(song.uploader.profile_picture)
      else
        json.profilePictureUrl ""
      end
    end
  end
end

json.songs do 
  if @songs
    @songs.each do |song|
      json.set! song.id do
        json.extract! song, :id, :title, :description, :uploader_id, :created_at
        json.songFileUrl url_for(song.song_file)

        if song.picture_file.attached?
          json.pictureFileUrl url_for(song.picture_file)
        else
          json.pictureFileUrl ""
        end
      end
    end
  end
end