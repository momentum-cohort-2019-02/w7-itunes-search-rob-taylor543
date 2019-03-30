
const itunesURL = "https://itunes-api-proxy.glitch.me/search?media=music&attribute=artistTerm&term="


function searchMusic(){

    let queryString = generateURL()
    console.log(queryString)
    let searchResults = document.querySelector('#search-results')
    searchResults.innerHTML = ''

    fetch(queryString)
        .then(response => response.json())
        .then(function(myJson){
            console.log(myJson)

            let trackCount = myJson.resultCount
            for (let trackIndex = 0; trackIndex<trackCount; trackIndex++) {

                let songDiv = document.createElement('div')
                addCSSClasses(songDiv, ['w-25', 'flex', 'flex-column', 'items-center', 'pv5'])
                songDiv.setAttribute('data-src', myJson.results[trackIndex]['previewUrl'])

                let songIMG = document.createElement('img')
                let songArtistDiv = document.createElement('div')
                let songNameDiv = document.createElement('div')
                songIMG.src = myJson.results[trackIndex]['artworkUrl100']
                songArtistDiv.innerText = myJson.results[trackIndex]['artistName']
                songNameDiv.innerText = myJson.results[trackIndex]['trackName']

                songDiv.appendChild(songIMG)
                songDiv.appendChild(songArtistDiv)
                songDiv.appendChild(songNameDiv)
                searchResults.appendChild(songDiv)
            }
        })

    searchResults.addEventListener('click', playSong)
}

function playSong(event) {
    const songPlayer = document.querySelector('#song-player')
    console.log(event.target.nodeName)
    console.log(event.target.dataset.src)
    songPlayer.src=event.target.dataset.src
}

function generateURL() {
    let searchParams = encodeURIComponent(inputField.value)
    return itunesURL + searchParams
}

function addCSSClasses(div, classArray) {
    for (let cssClass of classArray) {
        div.classList.add(cssClass)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    searchButton = document.querySelector('#search-button')
    searchButton.addEventListener('click', searchMusic)
    inputField = document.querySelector('input')
})

