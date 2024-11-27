import { dogsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal) 

getImageBtn.addEventListener('click', function(e) {

    renderDog()

    document.addEventListener('click', function(e) {

        if (e.target !== getImageBtn && !memeModal.contains(e.target)) {
            memeModal.style.display = 'none';
        }
    })
})

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderDog(){
    const dogObject = getSingleDogObject()
    memeModalInner.innerHTML =  `
        <img 
        class="dog-img" 
        src="./image/${dogObject.image}"
        alt="${dogObject.alt}">
        <embed id="embed_player" src="./sounds/suspicious.mp3" autostart="true" hidden="true"></embed>
        
        
        `
    memeModal.style.display = 'flex'
}

function getSingleDogObject(){
    const dogsArray = getMatchingDogArray()
    
    if(dogsArray.length === 1){
        return dogsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * dogsArray.length)
        return dogsArray[randomNumber]
    }
}

function getMatchingDogArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingDogsArray = dogsData.filter(function(dog){
            
            if(isGif){
                return dog.emotionTags.includes(selectedEmotion) && dog.isGif
            }
            else{
                return dog.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingDogsArray 
    }  
}

function getEmotionsArray(dogs){
    const emotionsArray = []    
    for (let dog of dogs){
        for (let emotion of dog.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(dogs){
        
    let radioItems = ``
    const emotions = getEmotionsArray(dogs)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}


renderEmotionsRadios(dogsData)





