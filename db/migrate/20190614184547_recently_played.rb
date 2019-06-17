class RecentlyPlayed < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :recently_played, :string, :default => ""
  end
end
