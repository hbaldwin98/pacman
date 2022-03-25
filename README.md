# Pac-ManJS
Pac-Man written in pure JavaScript. Contains generally replicated behavior from the arcade game, but only runs for a single level. 

Thanks to this great article for understanding the Ghost A.I. behavior: https://gameinternals.com/understanding-pac-man-ghost-behavior

**Live:** https://hbaldwin98.github.io/pacman/

## Assets Used 
- https://jack-studio.itch.io/pac-man-tiles
- https://www.sounds-resource.com/arcade/pacman/sound/10603/


### Issues/What I'd Do Different

- Ghosts movement behavior is not consistent due to pixel sizing issues
- Map all movement to an array, versus checking for collision against objects, and smoothing out the animations in-between. My current method has movement issues for the player and ghosts at times due to the way collision is determined by proximity to other objects (which usually is the best way for most games, but my implementation has issues and I believe that could be solved by fixing movement to grid). Determining collisions by checking whether a wall is in the grid in the desired direction would work better.
- Ghosts instantly teleport after being eaten and stay in their frightened state.
- Ghosts have no animations
- There are no fruit spawns
- No extra lives or scoreboard.
