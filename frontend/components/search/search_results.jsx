import React from 'react';
import EmptyResult from './empty_result';
import SongResult from './song_result'
import UserResult from './user_result';

const SearchResults = (props) => {
  let results = null;
  let resultList = null;
  let songs = Object.values(props.songs).map(song => (
    <SongResult key={song.id} song={song}/>
  ))
  let users = Object.values(props.users).map(user => (
    <UserResult key={user.id} user={user}/>
  ))

  if(!props.searched) {
    return null;
  }

  switch (props.option) {
    case "everything":
      if(songs.length === 0 && users.length === 0) {
        resultList = <EmptyResult />
      } else {
        if(songs.length === 1 && users.length === 0) {
          results = <p>Found 1 song</p>
        } else if (songs.length > 1 && users.length === 0) {
          results = <p>Found {songs.length} songs</p>
        } else if (songs.length === 0 && users.length === 1) {
          results = <p>Found 1 person</p>
        } else if (songs.length === 0 && users.length > 1) {
          results = <p>Found {users.length} people</p>
        } else if (songs.length === 1 && users.length === 1) {
          results = <p>Found 1 song, 1 person</p>
        } else if (songs.length > 1 && users.length === 1) {
          results = <p>Found {songs.length}, 1 person</p>
        } else if (songs.length === 1 && users.length > 1) {
          results = <p>Found 1 song, {users.length} people</p>
        } else {
          results = <p>Found {songs.length} songs, {users.length} people</p>
        }
        resultList = (
          <ul>
            {users}
            {songs}
          </ul>
        )
      }
      break;
    case "songs":
      if(songs.length === 0) {
        resultList = <EmptyResult />
      } else {
        if (songs.length === 1) {
          results = <p>Found 1 song</p>
        } else {
          results = <p>Found {songs.length} songs</p>
        }
        resultList = (
          <ul>
            {songs}
          </ul>
        )
      }  
      break;
    case "users":
      if(users.length === 0) {
        resultList = <EmptyResult />
      } else {
        if (users.length === 1) {
          results = <p>Found 1 person</p>
        } else {
          results = <p>Found {users.length} people</p>
        }
        resultList = (
          <ul>
            {users}
          </ul>
        )
      }
      break
    default:
      break;
  }

  return (
    <div className="search-results">
      {results}
      {resultList}
    </div>
  )
}
  
export default SearchResults