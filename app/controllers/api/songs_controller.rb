class Api::SongsController < ApplicationController
  def create

  end

  def update 

  end

  def show

  end

  def destroy

  end

  private
  def song_params
    params.require(:song).permit(:title, :uploader_id)
  end
end
