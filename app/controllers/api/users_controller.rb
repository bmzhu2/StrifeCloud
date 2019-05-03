class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    errorsJson = []

    if parse_type(@user.email) != "email"
      errorsJson << "Enter a valid email address."
    elsif User.find_by(email: @user.email) 
      errorsJson << "This email is already registered."
    end
    if parse_type(@user.username) != "name" 
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
      debugger;
      render json: errorsJson, status: 403
    end

  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end

  def parse_type(input)
    temp_input = input
    type = "none"

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
