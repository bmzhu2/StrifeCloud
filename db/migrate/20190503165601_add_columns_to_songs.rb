class AddColumnsToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :title, :string, null: false, default: "Untitled"
    add_column :songs, :uploader_id, :integer, null: false

    add_index :songs, :title
  end
end
