export class WaveForm {
 constructor (audio) {
   console.log(audio.constructor.name);
   if (!audio) {
     throw new Error('WaveForm needs Audio object');
   }
   this.audio = audio;
 }

 draw ({ svgBoxId, pathGroupId }) {
   const waveFormBox = document.getElementById(svgBoxId);
   const pathGroup = document.getElementById(pathGroupId);
   const sampleRate = this.audio.sampleRate;

   waveFormBox.setAttribute('viewBox', `0 -1 ${sampleRate} 2`);

   const audioBuffer = this.audio.audioBuffer;
   const peaks = this.audio.peaks;
   if (audioBuffer) {
     const totalPeaks = peaks.length;

     let d = '';
     for(let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
       if (peakNumber % 2 === 0) {
         d += ` M${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
       }
       else {
         d += ` L${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
       }
     }

     const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
     path.setAttributeNS(null, 'd', d);

     pathGroup.appendChild(path);
   }
 }
}