json.song do
  json.extract! @song, :id, :title, :description, :uploader_id, :created_at
  json.songFileUrl url_for(@song.song_file)

  if @song.picture_file.attached?
    json.pictureFileUrl url_for(@song.picture_file)
  else
    json.pictureFileUrl ""
  end
end

json.comments do 
  if @comments
    @comments.each do |comment|
      json.set! comment.id do 
        json.extract! comment, :id, :body, :user_id, :created_at
      end
    end
  end
end

json.users do
  if @commenters
    @commenters.each do |commenter|
      json.set! commenter.id do
        json.extract! commenter, :id, :username

        if commenter.profile_picture.attached?
          json.profilePictureUrl = url_for(commenter.profile_picture)
        else
          json.profilePictureUrl ""
        end
      end
    end
  end
  
  json.extract! @uploader, :id, :username

  if @uploader.profile_picture.attached?
   json.profilePictureUrl url_for(@uploader.profile_picture)
  else
    json.profilePictureUrl ""
  end
end