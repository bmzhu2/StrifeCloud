class Api::SongsController < ApplicationController
  def create
    @song = Song.new(song_params)

    if @song.save
      @uploader = @song.uploader

      render :show
    else
      render json: @song.errors.full_messages, status: 400
    end
  end

  def update 
    @song = Song.find_by(id: params[:id])

    if(@song && current_user.id == @song.uploader_id && @song.update_attributes(song_params))
      @uploader = @song.uploader
      @comments = @song.comments
      @commenters = @song.commenters
      render :show
    else
      render json: @song.errors.full_messages, status: 400
    end
  end

  def show
    @song = Song.find_by(id: params[:id])

    if @song
      @uploader = @song.uploader
      @comments = @song.comments
      @commenters = @song.commenters
      render :show
    else
      render json: ["This song does not exist"], status: 404
    end
  end

  def destroy
    @song = Song.find_by(id: params[:id])

    if @song
      @song.destroy
      render json: params[:id]
    else
      render json: ["This song does not exist"], status: 404
    end
  end

  def search

    if params[:query].present?
      title = "%" + params[:query].match(/\?query=([^&]*)/)[1] + "%"
      @songs = Song.where('LOWER(title) LIKE ?', title.downcase)
    else
      @songs = Song.none
    end
      render :results
  end

  private
  def song_params
    params.require(:song).permit(:title, :picture_file, :song_file, :description, :uploader_id)
  end
end
