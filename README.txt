Parallel Overhead Web Edition ReadMe
------------------------
Copyright © 2020 Linus Vanas <linus@vanas.fi>
SPDX-License-Identifier: MIT

WARNING: This game features rapidly changing colors.

Parallel Overhead is an endless runner game where you take control of the
ships Truth and Beauty on a groundbreaking trip through hyperspace. A stable
hyperspace tunnel is finally being achieved with two ships locked to the
opposite walls of the tunnel. Well, almost stable...

https://huitsi.net/games/parallel-overhead/

Playing the game
----------------
Parallel Overhead Web Edition can be played at
https://huitsi.net/games/parallel-overhead/play/

Keep the ships from falling through the holes! The ships can be rotated
clockwise with the left arrow key and anticlockwise with the right arrow key.
The game can be paused/unpaused with space or enter, restarted with backspace
and exited with escape.

The game starts paused so that you can resize the window and adjusts the volume.

Building from source
--------------------
The Parallel Overhead Web Edition source code can be found at:
https://huitsi.net:61734/Huitsi/WebParallelOverhead
https://github.com/Huitsi/WebParallelOverhead

When cloning with git, use '--recurse-submodules'. Additionally, git-lfs is
needed to get the audio assets. Make sure you have initialized it with
'git lfs install' before cloning.

To make the source code playable, the JS-files int src/ need to be concatenated
into parallel_overhead.js. This can be done with 'make'.
