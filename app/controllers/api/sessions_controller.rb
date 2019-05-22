class Api::SessionsController < ApplicationController
  def create
    email, pw = params[:user][:email], params[:user][:password]
    unless parse_type(email) == "email"
      render json: ["Enter a valid email address."], status: 400
      return
    end
    unless User.find_by(email: email)
      render json: ["This email is not registered. Did you mean to sign up?"], status: 400
      return
    end
    if pw.length < 7
      render json: ["Use at least 7 characters."], status: 400
      return
    end

    @user = User.find_by_credentials(email, pw)

    if @user 
      login!(@user)
      redirect_to "/api/users/#{@user.id}"
      return
    else
      render json: ["This password is incorrect."], status: 400
      return
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ["Not logged in"], status: 400
    end
  end

  private
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
