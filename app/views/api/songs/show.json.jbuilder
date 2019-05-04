json.extract! @song, :id, :title, :description, :uploader_id
json.pictureFileUrl url_for(@song.picture_file)
json.songFileUrl url_for(@song.song_file)