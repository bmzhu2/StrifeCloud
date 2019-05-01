class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    errorsJson = {errors: []}

    unless parse_type(@user.email) == "email"
      errorsJson[:errors] << "Invalid email address"
    end
    unless parse_type(@user.username) != "name" 
      errorsJson[:errors] << "Invalid username"
    end

    if errorsJson[:errors].length == 0 && @user.save
      login!(@user)
      render :create
    else
      errorsJson[:errors] += @user.errors.full_messages
      render json: errorsJson, status: 403
    end

  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
      render :show
    else
      render json: {:errors => ["User not found"]}, status: 404
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
