document.getElementById('computer-info').onclick = async (event) => {
    const cpus = await window.computerCheck.startCheck()
    document.getElementById('cpu-info').textContent = cpus[0].model.toString()
}

document.getElementById('upload-button').onclick = async (event) => {
    event.preventDefault()
    const filePaths = await window.fileManage.openFile()
    if(filePaths.length > 0){
        const filePath = filePaths[0];
        console.log('[+] Selected File Path: ', filePath)
        document.getElementById('uploaded-image').src = filePath
    }
}