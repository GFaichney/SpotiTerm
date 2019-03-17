# TERM_SPOTIFY
### Terminal-based controller for Spotify

## Setup:
- npm i
- create 'secrets.json' in the root of the project
- edit 'secrets.json' to contain a JSON file in the following format:
      {
        "client_id": "spotifyclientid",
        "client_secret": "spotifyclientsecret"
      }
- replace the two values with the values created via. your Spotify developer dashboard (https://developer.spotify.com/dashboard).

## Done:
- Play and Pause ('p' key)
- Authorisation requesting and caching

## TODO:
- More controls (next, back etc)
- Use refresh_token to request new auth rather than starting the process again
- Make display items padded with spaces to avoid leftovers from previous longer strings
- Show playing/paused state
- Recognise and respond correctly to no Spotify player being active
- Help menu
- Search features
- Queue display & manipulation
- Feed screen size in to UI component renderers
- Remove cursor in app
- Stop redirect URL server when no longer needed
- Kill redirect URL server after timeout
- Choose pkayback device
- ...?
