// console.log("hello")

// categories

// gettime
function getTimeString(time){
    const hour = parseInt(time/3600)
    let remaingsec = time%3600
    const min = parseInt(remaingsec/60)
    remaingsec = remaingsec%60

    return `${hour}hrs ${min}min ${remaingsec}sec ago`;
}

// category-btn
const removeActive = () => {
    const buttons = document.getElementsByClassName("category-btn")

    for(let btn of buttons){
        btn.classList.remove("active")
    }
}


// loadCategories
const loadCategories = () => {
    // console.log("loaded")

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error));

}



// loadVideo
const loadVideo = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch((error) => console.log(error));
}

// load category videos
const loadCategoryVideos = (id) => {
    alert(id)

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => { 
            // sobar red remove
            removeActive()

            // active red
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active")
            displayVideo(data.category)
        })
        .catch((error) => console.log(error));
}


// load Details
const loadDetails = async(videoId) => {
    console.log(videoId)

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video)
}

const displayDetails = (video) => {
    console.log(video)

    const detailsContainer = document.getElementById("modal-content");

    detailsContainer.innerHTML = 
    `
      <img src="${video.thumbnail}"/>
      <p class="mt-4"> ${video.description}</p>
    `


    // way 1
    // document.getElementById("showModalData").click();

    // way 2
    document.getElementById("customModal").showModal();


}

// /{category_id: '1001', category: 'Music'}


// displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {
        console.log(item)

        // create button
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML = 
        `
            <button id="btn-${item.category_id }" onClick="loadCategoryVideos(${item.category_id})" 
            class="btn category-btn"> ${item.category} </button>
        `

        categoryContainer.append(buttonContainer)


    })
}

const demo = {
    "category_id": "1003",
    "video_id": "aaae",
    "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
    "title": "Inside Amy Schumer",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
            "profile_name": "Amy Schumer",
            "verified": ""
        }
    ],
    "others": {
        "views": "3.6K",
        "posted_date": "15147"
    },
    "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
}

// displayVideos
const displayVideo = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = ""

    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = 
        `
            <div class="flex flex-col justify-center items-center gap-7"> 

                <img src="assets/Icon.png"/>
                <h2> No Content </h2> 
                
            </div>
        `
        return;
    }
    else{
        videoContainer.classList.add("grid")

    }

    videos.forEach((video) => {
        console.log(video)

        const card = document.createElement('div')
        card.classList = "card card-compact"

        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                    src="${video.thumbnail}"
                    class="h-full w-full object-cover"
                    alt="Shoes" />

                ${
                    video.others.posted_date?.length === 0 
                    ? "" : `<span class="absolute bg-black text-white text-sm right-2 bottom-2"> ${getTimeString(video.others.posted_date)} </span>`
                }

                
            </figure>
            <div class="px-0 py-4 flex gap-5">
                <div >
                    <img class="w-10 h-10 rounded-full object-cover"  
                    src="${video.authors[0].profile_picture}" />
                </div>

                <div>
                    <p class="text-xl font-bold"> ${video.title}</p>
                    <div class="flex gap-2 items-center">
                        <h2 class="text-gray-700 text-base"> ${video.authors[0].profile_name} </h2>

                        ${video.authors[0].verified===true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>': ''}
                        
                    </div>
                    <p class="text-gray-700 text-base"> ${video.others.views} views </p>

                    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error"> Details </button>
                </div>


                
            </div>
    `;

    videoContainer.append(card)

    }
    
    )

}

document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadVideo(e.target.value)
})
loadCategories();
loadVideo();