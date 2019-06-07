class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    errorsJson = []

    if parse_type(@user.email) != "email"
      errorsJson << "Enter a valid email address."
    elsif User.find_by(email: @user.email) 
      errorsJson << "This email is already registered."
    end
    if parse_type(@user.username) != "username" 
      errorsJson << "Enter a valid username. (no symbols)"
    elsif User.find_by(username: @user.username)
      errorsJson << "This username is already taken."
    end
    if @user.password.length < 7
      errorsJson << "Use at least 7 characters."
    end

    if errorsJson.length == 0 && @user.save
      login!(@user)
      render :show
    else
      errorsJson += @user.errors.full_messages
      render json: errorsJson, status: 400
    end

  end

  def update
    @user = User.find_by(id: params[:id])

    if @user && @user.id == current_user.id && @user.update_attributes(user_params)
      @songs = @user.songs
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end

  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
      @songs = @user.songs
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def search

    if params[:query].present?
      username = "%" + params[:query].match(/\?query=([^&]*)/)[1] + "%"
      @users = User.where('LOWER(username) LIKE ?', username.downcase)
    else
      @users = User.none
    end

      render json: @users
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password, :profile_picture)
  end

  def parse_type(input)
    temp_input = input
    type = "none"

    if input.length == 0
      return type
    end

    unless input =~ /\W/
      type="username"
    else
      temp_input = input.split("@")
      if temp_input.length == 2 && temp_input[1].split(".").length == 2
        address = temp_input[0].split(".").join("")
        domain = temp_input[1].split(".").join()
        type = "email" unless (address =~ /\W/ || domain =~ /\W/)
      end
    end

    type
  end
end
