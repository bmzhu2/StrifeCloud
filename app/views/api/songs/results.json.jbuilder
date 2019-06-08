json.songs do 
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