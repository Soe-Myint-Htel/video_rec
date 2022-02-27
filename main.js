window.addEventListener("load", async ()=>{
    const parts = [];
    await navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(stream => {
        document.querySelector("#video").srcObject = stream;
        
        // start recording
        document.querySelector("#start").addEventListener("click", ()=>{
            mediaRec = new MediaRecorder(stream);
            mediaRec.start(1000);
            mediaRec.ondataavailable = function(e){
                parts.push(e.data);
            }
        })

        // stop recording
        document.querySelector("#stop").addEventListener("click", ()=>{
            mediaRec.stop();
            const blob = new Blob(parts,{
                type : "video/webm"
            })
            const url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.style.display = "none";
            a.download = "record.webm";
            a.click()
        })
    })
})