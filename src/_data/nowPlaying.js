// src/_data/nowPlaying.js

export default function() {
  return [
    {
      title: "Chitose is in the Ramune Bottle",
      type: "light novel", 
      status: "READING",
      current: 5,
      total: "ongoing",
      meta: "Volume 5, Chapter 3",
      coverImage: "",
      accentColor: "var(--media-novel)"
    },
    {
      title: "Demon x Angel",
      type: "manga", 
      status: "READING",
      current: 62,
      total: "ongoing",
      meta: "Chapter 62",
      coverImage: "",
      accentColor: "var(--media-manga)"
    },
    {
      title: "Love After World Domination",
      type: "anime", 
      status: "WATCHING",
      current: 3,
      total: 13,
      meta: "Episode 3 / 13",
      coverImage: "",
      accentColor: "var(--media-anime)"
    },
    {
      title: "Persona 5 Royal",
      type: "gaming", 
      status: "PLAYING",
      current: 70,
      total: 100,
      meta: "On Casino Palace",
      coverImage: "",
      accentColor: "var(--media-gaming)"
    }
  ];
}
