# == Schema Information
#
# Table name: songs
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  title       :string           default("Untitled"), not null
#  uploader_id :integer          not null
#

class Song < ApplicationRecord
  validates :title, :uploader_id, presence: true

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :User

  has_one_attached: :song_file
end
