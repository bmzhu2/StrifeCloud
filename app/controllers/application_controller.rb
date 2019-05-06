class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?, :current_song
    
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!(current_user)
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
        # Is there something that we are missing here? Is there more to Login
        # than this??
    end

    def logout!
        session[:session_token] = nil
        current_user.reset_session_token! if @current_user
        @current_user = nil 
    end
end
