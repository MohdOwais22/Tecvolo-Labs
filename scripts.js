
// get all the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');




// build our function

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
//because method name is in string here
    video[method]();  
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    console.log(this.value);
    console.log(this.name);
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}


fullscreen.addEventListener('click', ()=> {
    video.requestFullscreen();
})

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
var keyCode = e.keyCode;
  if(keyCode==32) {
    e.preventDefault();
    togglePlay();
  }
}

// hook up the event listener
video.addEventListener('click', togglePlay); 
video.addEventListener('play', updateButton); 
video.addEventListener('pause', updateButton); 
video.addEventListener('progress', handleProgress); 

toggle.addEventListener('click', togglePlay); 

skipButtons.forEach(button => button.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = true);