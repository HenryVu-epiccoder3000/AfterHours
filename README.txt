# AfterHours — personal MP3 player

A small installable web-app starter for iPhone with:
- Multiple MP3 imports in a local library
- Play-now and add-to-queue controls
- Loop enabled by default
- Timeline seeking and track switching
- Playback speed from 0.50× to 2.00× in 0.01× steps
- Low-shelf bass boost, convolution reverb mix/room size, and output gain in dB
- Service-worker app-shell caching for offline launches

## Run it
This is a Progressive Web App starter. Service workers require HTTPS (or localhost).
1. Upload the contents of this folder to a static HTTPS host you control.
2. Open the site in Safari on your iPhone while online.
3. Import MP3s. The selected files are held in the page session in this starter.
4. Use Safari Share → Add to Home Screen.

## Important iPhone limitations
- This starter does **not** permanently save imported MP3s between browser sessions. The library is in memory; persistent IndexedDB storage is a sensible next upgrade.
- The service worker caches the app shell; imported audio is stored separately in IndexedDB.
- iOS background audio is controlled by Safari/iOS and can vary by iOS version, install mode, audio routing, and whether the page is suspended. Media Session controls are included, but a web page cannot guarantee uninterrupted background playback in every iPhone state.
- Web Audio effects (bass, reverb, gain) are browser-rendered. Background playback with an active Web Audio graph should be tested on the target iPhone; iOS may suspend or alter processing in some situations.
- This is a functional prototype, not a native iOS app. A native app is the most reliable route if guaranteed background playback and persistent audio-library management are essential.

## Notes
The gain slider is a digital output gain control. Raising it above 0 dB can clip audio; it does not restore detail lost in the original MP3.
