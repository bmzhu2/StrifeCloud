json.extract! @song, :id, :title, :description, :uploader_id, :created_at
json.songFileUrl url_for(@song.song_file)

if @song.picture_file.attached?
  json.pictureFileUrl url_for(@song.picture_file)
else
  json.pictureFileUrl ""
end