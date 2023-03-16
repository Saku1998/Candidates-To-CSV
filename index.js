const downBtn = document.getElementById("download")
downBtn.addEventListener('click', fetchCandidates)

function fetchCandidates(){
    fetch("https://api.teamtailor.com/v1/candidates", 
    {headers: 
        {Authorization: 'Token token=Yh3nRWUY9L4dfSk3l_2di1I5NgYebOmloC8I9es-', 'X-Api-Version': '20210218'}})
        .then(response => response.json())
        .then(data => useData(data))
}



function useData(info){
    const heading = ['candidate_id', 'first-name', 'last-name', 'email', 'job_application_created_at', 'job_application_id']
    const mainPart = info.data.map((item, index) => {
        return [index.toString(),item.attributes['first-name'], item.attributes['last-name'], item.attributes['email'], item.attributes['created-at'], item.id]
    }
    )
    const send = [heading, ...mainPart]
    const setToDownload = send.join('\n')
    Download(setToDownload)
}

function Download(file){

    const blob = new Blob([file], {type: 'text/csv'})
    const final = document.createElement('a')

    final.download = 'candidates.csv'
    final.href = URL.createObjectURL(blob)
    final.click()
    final.remove()
    URL.revokeObjectURL(URL.createObjectURL(blob))
}