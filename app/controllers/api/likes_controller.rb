class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)

    if @like.save
      render :show
    else
      render json: @like.errors.full_messages, status: 400
    end
  end

  def destroy
    @like = Like.find_by(user_id: params[:user_id], song_id: params[:song_id])

    if @like
      @like.destroy
      render json: params[:id]
    else
      render json: ["This song already did not have a like."], status: 404
    end
  end

  private
  def like_params
    params.require(:comment).permit(:user_id, :song_id)
  end
end
