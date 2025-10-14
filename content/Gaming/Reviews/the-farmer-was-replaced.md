---
title: "The Farmer was Replaced: a cerebral coding incremental"
created: 2025-10-15T03:24
modified: 2025-10-15T06:13
tags:
  - gaming
  - post
  - rss
  - review
  - farmer-was-replaced
  - opinion
description: Carlos's review for The Farmer was Replaced.
recommended: y
steam: https://store.steampowered.com/app/2060160/The_Farmer_Was_Replaced/
---
> [!info] No numbers here!
> I don't review using a $k/n$ system, or out of five stars. See my [[numerical-ratings|thoughts on numerical ratings]], if you're wondering why.

![[Pasted image 20251015052947.png]] 

I bought and played this game early October of 2025, during its [[1.0 release]]. I've *seen* it while casually browsing the Steam store but never really picked it up until now.
# Premise

![[Pasted image 20251015053228.png]]

Essentially, you control a farming drone through (a partial version of) Python. In the beginning, the drone can only `harvest()` or `move()`, but later on you could `get_ground_type()` and even `spawn_drone(function)`. The built-in drone functions stay primitive and does serve the game's purpose. **There are no shortcuts,** and you really need to code everything by yourself.

Said built-in functions, the size of your farm, the speed of your drone, and even some Python concepts are locked behind upgrades. You need to harvest certain plants for these upgrades, and that's where *you* come in, as the drone programmer.

The plants themselves also have increasingly complex needs. At the start, you only need to harvest naturally-growing grass for hay. Next, you need to actually *plant* bushes for wood. But bushes give only a meagre yield of wood, so you choose to plant trees, *which hate being next to each other*, lest they grow at a glacial pace.

![[Pasted image 20251015053206.png]]

Later on, you need to plant cacti where its adjacent plant's height should be shorter than...

You get where I'm going. The gameplay loop is pretty robust and dopaminergic.
# Game length and value

Steam logged my hours at the time of writing at **35 hours**. That includes just running it in the background while I do something else. Theoretically, I've proven that the game can be done **in five hours**, sans the time you need to code. How? There's a leaderboard for that, and I submitted my own solution:

![[Pasted image 20251015052558.png]]

As you can see, someone has a sub-1-hour solution for the *entire game*. It's completely possible to breeze through this game if you'd like, and if you *can*.
## Content and replayability

There's around nine plants with completely unique mechanics to do. I won't spoil you much for now, I do think learning what the plants do as you unlock them is part of the experience.

And wow, the game is really, really replayable. It definitely caters to the whole *spectrum* of programmers. For reference, I was even looking into a $k$-hop minimum [dominating set](https://en.wikipedia.org/wiki/Dominating_set) solution (which is $NP$-hard).
## Idle time

Honestly, even if the game has its idle/incremental idiosyncrasies, I found little idle time for myself. While the farm is running, I continue to refine my solutions to get a better yield. If anything, idle time where the game just runs in the background happens when I'm doing *actual* life stuff: e.g. sleeping, or hanging out with my friends.

And I do consider myself a software engineer on the *faster* end of things[^1]. I do recommend **running a working program in parallel while you code up a solution**, so your farm earns while you're writing. Otherwise the drone would just be idle.

# The game in the AI/LLM/Cursor-dominated world

My recommendation: **DO NOT** play this game with an LLM-assisted IDE. Or asking LLMs for solutions. Unless you want to[^2] trivialize it for some reason.

While I regularly *do* use said tools professionally, the game definitely rewards the journey more than the destination (where the reverse applies to work, monetarily).

![[Pasted image 20251015060841.png]]

However, what I do recommend (even for use *outside* this game's context) is to **ask for directions**. In other words, use an LLM when your search engine fails to answer your question. E.g. "is there an algorithm for sorting a list using two workers?"[^3]

# Pros and cons
## The positives
- I finished the game all using the in-game editor! The experience was pretty tolerable, and I'm already pretty finnicky with my own coding environment.
- There's a visual, instant feedback of what you're doing. Compared to BitBurner, a similar game, I 100% honest-to-goodness would prefer *seeing* my stuff in action.
- It's an open game. I watched my friend play the game and he totally played differently than I did! I made a scheduler/planner to reserve *the whole field* for planting crops—meanwhile he *segmented* the field to his needs (e.g. 1/4 hay, 1/4 wood, etc.).
- There are debug breakpoints in the in-game editor! A programming game truly made by a programmer.
- For the [[sweat|sweats]], there's also a leaderboard.
## The negatives
- It's... just not Python. I use Python professionally and I severely miss some nuances. E.g. (kw)arg unpacking, and list comprehensions to name a few.
- Don't expect independent inter-drone communication. You'll have to figure out a solution if you need them to talk to each other.
- Standard libraries used in a professional setting, e.g. `functools` or even the `sort` function are unavailable. Most certainly to present a challenge to the player, but just a minor setback where I had to implement `map`, or `reduce` by myself, *without arg unpacking* so I have to resort to using loosely-typed tuples.

The negatives above are definitely distant from deal-breaking. If you're *not* a professional, then it genuinely matters little for you. But if you are, expect to code in Python like you're coding in C without any standard libraries. 

One for the record: before this game, I have never implemented graph algorithms primitively (e.g. [A*](https://en.wikipedia.org/wiki/A*_search_algorithm), [BFS](https://en.wikipedia.org/wiki/Breadth-first_search)) in Python! I used to do all of them for competitions (reserving Python use for string problems, for example) in C++ vectors and arrays, so this is also a first for me!

For the most part you only have loops, conditionals, higher-order functions, tuples, lists, and dictionaries, which are already enough to *crudely* implement familiar Python functions.

# Conclusion

Overall, I think it's a great game! I particularly recommend it to the following:
- **Professionals in the software engineering space.** Being one myself, it's nice to code leisurely, and have instant feedback on your code. Have a little break from designing UIs for webapps, or figuring out why that DB query is running so slow.
- **Novice aspirants or students in the space above.** Whether you're in elementary school, or in your freshman year of undergrad; it's a good little game to learn and get used to programmatic thinking. I'm not kidding when I say that **this game gets harder than a junior job interview or a machine project back in my uni.**
- **The curious.** If you've ever wondered what it feels like to be a software engineer, the game captures that essence decently. Sans the standups, the manager 1-1s, the production environment mishaps, of course.

However, I can't recommend it to:
- **People who can't stand maths, or numbers in general.** You're going to hate this game. Instead of feeling satisfaction after having 100 tabs of your browser open, with the StackOverflow logo plastered across the bar, you *may* feel that it's all for naught. It may feel like you're banging your head against the wall. However, if you're up to changing that mindset and learning about code, do feel free to count yourself among **the curious** above!
- **Those who suffer from traumatic events from their CS/IT classes.** Don't blame me for resurfacing those, you *bought* this game, against my advice.
- **Pedants**. I don't think I can recommend you guys anything!

Again, fantastic game! Pretty cerebral and open-ended; and also educational even for myself (where I started to read some academic papers)!

[^1]: For reference, I used to do competitive programming in my undergraduate years. A four-hour exam back in UP starts at 14:00 and I'd leave the room at 14:10 (only to see a teammate already outside, finishing the exam half the time I did). Definitely bragging here, but I'd like to say that I was literally *drilled* and *trained* to code fast, code correctly, and spot bugs in an instant. It used to be my life; but I no longer crave for that sort of competition. Great experience though.

[^2]: At the end of the day, it's *your* money, *your* game. Play it how you want.

[^3]: I intentionally used novice wording here, to prove a point that you don't need to know jargon to ask an LLM. You need it to ask a search engine, though. But you can also ask an LLM to *teach* you the jargon!
