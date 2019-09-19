# == Schema Information
#
# Table name: songs
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  title       :string           default("Untitled"), not null
#  uploader_id :integer          not null
#  description :string
#

class Song < ApplicationRecord
  validates :title, :uploader_id, presence: true

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :User

  has_many :comments,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :commenters,
    through: :comments,
    source: :user

  has_many :likes,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: :Like,
    dependent: :destroy

  has_one_attached :song_file
  has_one_attached :picture_file
end
