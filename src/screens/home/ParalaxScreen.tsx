import React from 'react';

import {StatusBar} from 'react-native';
import Album from 'src/components/paralax/Album';

import {Album as AlbumModel} from 'src/components/paralax/Model';

export default function ParalaxScreen() {
  const album: AlbumModel = {
    name: 'Remote Control',
    artist: 'Jan Blomqvist',
    release: 2016,
    // eslint-disable-next-line global-require
    cover: require('src/assets/images/profileperson.png'),
    tracks: [
      {name: 'Stories Over'},
      {name: 'More', artist: 'Jan Blomqvist, Elena Pitoulis'},
      {name: 'Empty Floor'},
      {name: 'Her Great Escape'},
      {name: 'Dark Noise'},
      {name: 'Drift', artist: 'Jan Blomqvist, Aparde'},
      {name: 'Same Mistake'},
      {
        name: 'Dancing People Are Never Wrong',
        artist: 'Jan Blomqvist, The Bianca Story',
      },
      {name: 'Back in the Taxi'},
      {name: 'Ghosttrack'},
      {name: 'Just OK'},
      {name: 'The End'},
    ],
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Album {...{album}} />
    </>
  );
}
