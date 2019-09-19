# == Schema Information
#
# Table name: likes
#
#  id      :bigint           not null, primary key
#  user_id :integer          not null
#  song_id :integer          not null
#

class Like < ApplicationRecord
  validates :user_id, :song_id, presence: true
  validates_uniqueness_of :user_id, :scope => [:song_id]

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :uploader,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: :Song
  
end
