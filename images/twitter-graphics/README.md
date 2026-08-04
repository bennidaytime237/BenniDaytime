# Twitter Graphics

Drop your Twitter/X graphic image files (jpg/png/webp) in this folder, then add
each filename to `manifest.json` as a string in the array, e.g.:

```json
[
  "launch-announcement.jpg",
  "meme-1.png",
  "stats-recap.webp"
]
```

The portfolio page (`/portfolio/index.html`) fetches this manifest and
renders every listed image in the "Twitter Graphics" grid, in the order
listed. No other code changes needed — just add the file and add its name
here.
