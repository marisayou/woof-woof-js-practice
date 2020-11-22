document.addEventListener("DOMContentLoaded", () => {
  getDogs()
  toggleFilterDogs()  
})

function getDogs(filter="off") {
    const dogBar = document.getElementById("dog-bar")
    dogBar.innerHTML = ""
    return fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogArr => {
        if (filter === "on") {
            for (const dog of dogArr) {
                if (dog.isGoodDog) {
                    addDogToBar(dog)
                }
            }
        } else {
            for (const dog of dogArr) {
                addDogToBar(dog)
            }
        }  
    })
}

function addDogToBar(dog) {
    const dogBar = document.getElementById("dog-bar")
    const span = document.createElement("span")
    span.textContent = dog.name
    dogBar.appendChild(span)
    span.addEventListener("click", () => showDogOnClick(dog))
}

function showDogOnClick(dog) {
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = ""
    const img = document.createElement("img")
    img.src = dog.image

    const h2 = document.createElement("h2")
    h2.textContent = dog.name

    const button = document.createElement("button")
    if (dog.isGoodDog) {
        button.textContent = "Good Dog!"
    } else {
        button.textContent = "Bad Dog!"
    }
    
    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)

    button.addEventListener("click", (e) => toggleGoodDog(e, dog.id))
}

function toggleGoodDog(e, id) {
    let isGood
    if (e.target.innerText === "Good Dog!") {
        isGood = false
        e.target.innerText = "Bad Dog!"
    } else {
        isGood = true
        e.target.innerText = "Good Dog!"
    }

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "isGoodDog": isGood
        })
    }

    return fetch(`http://localhost:3000/pups/${id}`, configObj)
}

function toggleFilterDogs() {
    const filterBtn = document.getElementById("good-dog-filter")
    filterBtn.addEventListener("click", () => {
        if (filterBtn.innerText === "Filter good dogs: OFF") {
            getDogs("on")
            filterBtn.innerText = "Filter good dogs: ON"
        } else {
            getDogs("off")
            filterBtn.innerText = "Filter good dogs: OFF"
        }
    })
    
}