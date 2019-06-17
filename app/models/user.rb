# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  recently_played :string           default("")
#

class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :username, :password_digest, presence: true
  validates :password, length: {minimum: 7, allow_nil: true}

  attr_reader :password

  after_initialize :ensure_session_token
  after_validation :ensure_recently_played

  has_many :songs,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :Song

  has_many :comments,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Comment

  has_one_attached :profile_picture

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def ensure_recently_played
    self.recently_played ||= ""
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end
end
