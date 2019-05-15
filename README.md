# [StrifeCloud](https://strife-cloud.herokuapp.com/ "StrifeCloud Live App")

StrifeCloud a Final Fantasy themed clone of SoundCloud, a music sharing application. Users can upload, listen to, and share music for free. Users can view each others' profiles to see their uploads and also comment on each others' songs.

This application was built in a two week timeframe.

## Features
* Account creation and authentication, using secure password storage with BCrypt
* Music player that continues to play while browing the site
* Users can upload, edit, delete, and listen to music
* Users have a profile that shows off their uploaded songs
* Users can comment on each others' (or their own!) songs

### Music Player

The music player's core functionality is its ability to continue to play music when switching pages on the app. In addition to playing music, it also contains the standard functions of a music player these days, including a seekable progress bar displaying current time and remaining time in the song, a slideable and toggleable volume bar, and a display with links to the song and its uploader.

![music player demo](strifeclouddemo.gif)

The continuous play music player was implemented by using React. The music player component is just mounted once when the app loads and the song is stored in its state, thus allowing it to continue to play music even when browsing the app and performing other actions.

The controls, progress bar, and volume slider were all built and styled from scratch in order to mimic SoundCloud's version.

An interesting challenge when building this feature was letting the music player interact with other components on the page, e.g. changing songs. This was accomplished by storing the current song and its play/pause status in the ui slice of the store, rather than in the music player's state. Thus, the play button on the body of the page could update the current song while the music player would be listening for a change in the current song to know when to load the song.

```  
componentDidUpdate(prevProps){
  //if there is a new song
  if (this.props.song && this.props.song !== prevProps.song) {
    //if a song is already playing, stop playing it
    if(this.state.song) {
      this.state.song.pause();
    }
    //load the new song
    this.setState({
      song: new Audio(this.props.song.songFileUrl),
    }, () => {
      this.state.song.play();
        this.props.unpause();
    });
  }
}
```


### Song Uploading

Uploading a song is simple and clean. The form lets you know your file was of the proper type and if you are missing a title. The form prevents double submission by replacing the save button while it is uploading. Once the song is uploaded, it can be edited if there were mistakes to the picture, title, or description, or it can be deleted if so desired. Other users (or the uploader themself) can comment on the song's page.

![upload_demo](upload_demo.gif)

In order to maintain DRY code, the upload form is the same one that appears in the edit form but in a modal. The modal used for the edit form is also the same as the one used for signing in and signing up. The modal was reused by giving it a "mode" which was stored in the ui slice of the store. "login", "signup", and "update" would each tell the modal to render a different component, while a null would make sure it doesn't appear at all. By clicking on certain buttons on the page, that mode is passed to the ui and thus the modal is displayed.

```
//summarized structure of the modal display logic
if (!this.props.modal) {
  return null;
}

let form;
switch(this.props.modal) {
  case 'login':
    form = <LoginFormContainer>;
    break;
  case 'signup':
    form = <SignupFormContainer>;
    break;
  case 'update':
    form = <UpdateFormContainer>;
    break;
  default:
    form = null;
}
```


## Technologies
* React/Redux for frontend rendering
* Ruby on Rails for backend MVC framework
* PostgresQL and AWS S3 for database

## Planned future features
* Basic search implementation
* Playlists
