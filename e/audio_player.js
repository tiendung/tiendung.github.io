const ap = document.getElementById("audioPlayer");
ap.innerHTML = `<source src="/${phapname}.ogg"/>`

var maxPlayTime = ap.duration;
ap.ontimeupdate = function() {
  let a = secondsToMinutesAndSecondsAndRemains(ap.currentTime);
  document.getElementById('playPauseBtn').innerHTML = 
    `${twoDigitsFmt(a[0])}:${twoDigitsFmt(a[1])}`;
  if (ap.currentTime > maxPlayTime) ap.pause();
};


async function playCurrSubIndex(delta = 0) {
  if (selectedText.length > 0) { ap.pause(); return; }
  var time = await loadTime(currSubIndex);
  if (isNaN(time)) return;
  if (time != 0 || currSubIndex == 0) {
    ap.currentTime = time + delta;
    maxPlayTime = time + await getCurrDelta('Whole sentence');
    await apPlay();
  }  
}

async function apPlay() {
  goingToPause = false;
  await ap.play();  
}

async function playCurrPos() {
  playCurrSubIndex(await getCurrDelta());
}
