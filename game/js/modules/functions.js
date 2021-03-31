export function typingSound() {
  const audio = document.querySelector(`#softClick`);
  audio.volume = 0.5;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}

export function timeSound() {
  const audio = document.querySelector(`#hardClick`);
  audio.volume = 0.3;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}

export function updateSound() {
  const audio = document.querySelector(`#updateSound`);
  audio.volume = 1;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}

export function startSound() {
  const audio = document.querySelector(`#startSound`);
  audio.volume = 1;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}

export function endSound() {
  const audio = document.querySelector(`#endSound`);
  audio.volume = 0.5;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}
