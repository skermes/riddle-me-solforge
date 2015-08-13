# Riddle Me Solforge

A basic web app to create and share Solforge puzzles.

##  Setup

First, install [npm](https://www.npmjs.com/) and [gulp](http://gulpjs.com/).

Run `npm install` in the repository to install the dependencies.

Find your local Solforge installation (on my machine it's at `C:\Program Files (x86)\Steam\steamapps\common\SolForge\Game\compiled\assets\art`) and copy a bunch of the images into the `img` folder.  There are three subfolders:

* `img\art` contains everything from `card_art_small`.
* `img\frames` contains several of the files from `card_frames_small\.  In particular, everything named `lvl1_death_creature_small.png` and similar.  Level 1 to 4 (3 for spells), death/nature/elemental/mechanical and creature/spell.  You can include the other files in the folder if you want, but you don't need them.
* `img\misc` contains a variety of files.  All the keyword icons from `card_misc`.  `aiThinkingFrame` and `aiThinkingRotate` from `gamescreen`.  `avatar_GhoxAlt3` and `avatar_se036-3` from `mission_avatars`.  `FillerBG` from `assets\app default assets`. The xp bars, `player_avatar_frame`, `player_health_badge` and `player_level_badge` from `player_frames`.

Get a `cards.json` file and put it in `data`.  To get `cards.json` either build [my sf-data project](https://github.com/skermes/sf-data) and run it over the latest Solforge data files (as described in that project) or download [tk](tk/cards.json).

Run `gulp build`.  This will compile the css and javascript and copy the relevant static files into `public`.

Run `npm run dev-server`.  This will start up a simple development server that will serve the static assets from `public`.

Open your browser and point it to http://localhost:3000/.  You should have a fully functioning local puzzle builder!

## Development

To continuously compile the app as you edit it, run `gulp watch`.  Note that the watch task won't watch the `img` folder (`gulp.watch` takes a really long time to index it).

There are a handful of tests in the `spec` folder that you can run with `jasmine-node spec`.  They aren't particularly comprehensive or exciting.

## Production

Riddle Me Solforge doesn't store any data server-side, so you can deploy it anywhere that can serve static files.  Simply build the project and copy the `public` folder wherever you like.

Make sure you have Stoneblade Entertainment's permission before you deploy their art assets anywhere public.

## License

Solforge is owned by [Stoneblade Entertainment](http://solforgegame.com).

This code copyright 2015

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
