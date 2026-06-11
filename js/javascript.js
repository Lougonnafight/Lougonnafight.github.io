document.addEventListener("DOMContentLoaded", () => {

  const players = document.querySelectorAll(".custom-player");

  players.forEach((player, index) => {

    const idNum = index + 1;

    const video = player.querySelector(`#portfolio-video-${idNum}`);
    const playPauseBtn = player.querySelector(`#play-pause-btn-${idNum}`);
    const muteBtn = player.querySelector(`#mute-btn-${idNum}`);
    const fullscreenBtn = player.querySelector(`#fullscreen-btn-${idNum}`);
    const progressFilled = player.querySelector(`#progress-filled-${idNum}`);
    const progressBar = player.querySelector(`#progress-bar-${idNum}`);
    const playIcon = player.querySelector(`#play-icon-${idNum}`);
    const volIcon = player.querySelector(`#vol-icon-${idNum}`);
    const fullscreenIcon = player.querySelector(`#fullscreen-icon-${idNum}`);

    if (!video || !playPauseBtn || !muteBtn || !fullscreenBtn || !progressFilled || !progressBar) {
      console.warn(`Custom Player ${idNum}: Einige Elemente wurden im HTML nicht gefunden.`);
      return;
    }

    function togglePlay() {
      if (video.paused) {
        video.play();
        if (playIcon) {
          playIcon.src = "/img/controls/pause.png";
          playIcon.alt = "Pause";
        }
      } else {
        video.pause();
        if (playIcon) {
          playIcon.src = "/img/controls/play.png";
          playIcon.alt = "Play";
        }
      }
    }

    function toggleMute() {
      if (video.muted) {
        video.muted = false;
        if (volIcon) {
          volIcon.src = "/img/controls/volume.png";
          volIcon.alt = "Mute";
        }
      } else {
        video.muted = true;
        if (volIcon) {
          volIcon.src = "/img/controls/mute.png";
          volIcon.alt = "Unmute";
        }
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        player.requestFullscreen().catch((err) => {
          console.error(`Fehler beim Aktivieren des Vollbildmodus: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }

    function updateProgress() {
      if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${percentage}%`;
      }
    }

    function scrub(e) {
      const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }

    playPauseBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    muteBtn.addEventListener("click", toggleMute);
    fullscreenBtn.addEventListener("click", toggleFullscreen);
    video.addEventListener("timeupdate", updateProgress);
    progressBar.addEventListener("click", scrub);

    video.addEventListener("dblclick", (e) => {
      e.preventDefault();
      toggleFullscreen();
    });

    document.addEventListener("fullscreenchange", () => {
      if (fullscreenIcon) {
        if (document.fullscreenElement === player) {

          fullscreenIcon.src = "/img/controls/fullout.png";
          fullscreenIcon.alt = "Vollbild beenden";
        } else if (!document.fullscreenElement) {

          fullscreenIcon.src = "/img/controls/full.png"; 
          fullscreenIcon.alt = "Vollbild";
        }
      }
    });
  });
});